import sgMail from '@sendgrid/mail';
import { getScoreLabel } from '@/lib/scoring';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const FROM = {
  email: process.env.SENDGRID_FROM_EMAIL || 'hello@couplecheck.app',
  name: 'CoupleCheck',
};

const dimensionLabels: Record<'fr' | 'en', Record<string, string>> = {
  fr: {
    communication: 'Communication',
    trust: 'Confiance',
    intimacy: 'Intimité',
    conflict: 'Gestion des conflits',
    forgiveness: 'Pardon & Résilience',
    projects: 'Projets communs',
    balance: 'Équilibre individuel',
  },
  en: {
    communication: 'Communication',
    trust: 'Trust',
    intimacy: 'Intimacy',
    conflict: 'Conflict management',
    forgiveness: 'Forgiveness & Resilience',
    projects: 'Shared goals',
    balance: 'Individual balance',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Welcome email (J+0) — sent immediately after lead capture
// ─────────────────────────────────────────────────────────────────────────────

interface SendWelcomeEmailParams {
  to: string;
  firstName: string;
  locale: 'fr' | 'en';
  globalScore: number;
  scores: Record<string, number>;
  resultUrl: string;
  sessionId: string;
  leadId: string;
}

export async function sendWelcomeEmail(params: SendWelcomeEmailParams): Promise<void> {
  const { to, firstName, locale, globalScore, scores, resultUrl, sessionId, leadId } = params;

  // Derive strengths and risks from dimension scores
  const labels = dimensionLabels[locale];
  const strengths = Object.entries(scores)
    .filter(([, s]) => s >= 70)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([dim]) => labels[dim] || dim);
  const risksCount = Object.values(scores).filter((s) => s < 40).length;
  const scoreLabel = getScoreLabel(globalScore)[locale];

  // Use SendGrid dynamic template if configured
  const templateId = locale === 'fr'
    ? process.env.SENDGRID_TEMPLATE_RESULT_FR
    : process.env.SENDGRID_TEMPLATE_RESULT_EN;

  const customArgs = { leadId, emailType: 'welcome', locale };
  const trackingSettings = {
    clickTracking: { enable: true },
    openTracking: { enable: true },
  };

  if (templateId) {
    await sgMail.send({
      to,
      from: FROM,
      templateId,
      dynamicTemplateData: {
        firstName,
        globalScore,
        scoreLabel,
        strengths,
        risksCount,
        resultUrl,
      },
      customArgs,
      trackingSettings,
    } as sgMail.MailDataRequired);
    return;
  }

  // Fallback: inline HTML
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://couplecheck.app') || 'https://couplecheck.app';
  const unsubscribeUrl = `${appUrl}/unsubscribe?session=${sessionId}`;

  const l = locale === 'fr'
    ? {
        subject: `${firstName}, ton résultat CoupleCheck est prêt 📊`,
        greeting: `Salut ${firstName},`,
        intro: "Merci d'avoir pris 3 minutes pour faire le test CoupleCheck.",
        scoreTitle: 'TON SCORE GLOBAL',
        strengthsTitle: 'Tes points forts identifiés :',
        risksLine: (n: number) => `⚠️ Zones à surveiller : <strong>${n} alerte${n > 1 ? 's' : ''} détectée${n > 1 ? 's' : ''}</strong>`,
        risksHint: 'Détails disponibles dans ton rapport complet',
        cta: 'Voir mon résultat complet →',
        sign: "À très vite,<br>L'équipe CoupleCheck",
        unsubscribe: 'Se désabonner',
      }
    : {
        subject: `${firstName}, your CoupleCheck result is ready 📊`,
        greeting: `Hey ${firstName},`,
        intro: 'Thanks for taking 3 minutes to complete the CoupleCheck test.',
        scoreTitle: 'YOUR GLOBAL SCORE',
        strengthsTitle: 'Your identified strengths:',
        risksLine: (n: number) => `⚠️ Areas to watch: <strong>${n} alert${n !== 1 ? 's' : ''} detected</strong>`,
        risksHint: 'Details available in your full report',
        cta: 'View my complete result →',
        sign: 'Talk soon,<br>The CoupleCheck Team',
        unsubscribe: 'Unsubscribe',
      };

  const strengthsHtml = strengths.length > 0
    ? strengths.map((s) => `<li style="margin:6px 0;font-size:14px;color:#3B3A37;">✅ ${s}</li>`).join('')
    : `<li style="margin:6px 0;font-size:14px;color:#5B5C59;">${locale === 'fr' ? 'Analyse en cours...' : 'Analysis in progress...'}</li>`;

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${l.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F2EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F2EC;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background-color:#1A1916;padding:24px 40px;border-radius:12px 12px 0 0;text-align:center;">
              <span style="color:#AA2C32;font-size:18px;font-weight:700;letter-spacing:2px;">COUPLECHECK</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#FFFFFF;padding:40px;">
              <p style="margin:0 0 20px;font-size:16px;color:#3B3A37;">${l.greeting}</p>
              <p style="margin:0 0 24px;font-size:15px;color:#5B5C59;line-height:1.6;">${l.intro}</p>

              <!-- Score block -->
              <div style="background-color:#F5F2EC;border-radius:12px;padding:24px;margin:0 0 24px;text-align:center;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#8A8880;">${l.scoreTitle}</p>
                <p style="margin:0;font-size:52px;font-weight:700;color:#1A1916;line-height:1;">${globalScore}<span style="font-size:22px;color:#A8A6A2;font-weight:400;">/100</span></p>
                <span style="display:inline-block;margin-top:8px;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:600;background-color:#F6EEEE;color:#AA2C32;">${scoreLabel}</span>
              </div>

              <!-- Strengths -->
              <div style="margin:0 0 20px;">
                <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#1A1916;">${l.strengthsTitle}</p>
                <ul style="margin:0;padding:0 0 0 4px;list-style:none;">${strengthsHtml}</ul>
              </div>

              <!-- Risks teaser -->
              <div style="background-color:#FFF8F8;border-left:3px solid #AA2C32;border-radius:4px;padding:12px 16px;margin:0 0 32px;">
                <p style="margin:0 0 4px;font-size:14px;color:#5B5C59;">${l.risksLine(risksCount)}</p>
                <p style="margin:0;font-size:12px;color:#8A8880;">${l.risksHint}</p>
              </div>

              <!-- CTA -->
              <div style="text-align:center;margin:0 0 32px;">
                <a href="${resultUrl}" style="display:inline-block;background-color:#AA2C32;color:#FFFFFF;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:10px;">${l.cta}</a>
              </div>

              <p style="margin:0;font-size:13px;color:#8A8880;line-height:1.7;">${l.sign}</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#F5F2EC;padding:20px 40px;border-radius:0 0 12px 12px;text-align:center;">
              <a href="${unsubscribeUrl}" style="font-size:11px;color:#BCBAB6;text-decoration:underline;">${l.unsubscribe}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await sgMail.send({
    to,
    from: FROM,
    subject: l.subject,
    html,
    customArgs,
    trackingSettings,
  } as sgMail.MailDataRequired);
}

// ─────────────────────────────────────────────────────────────────────────────
// Report email (post-purchase) — sent after Stripe webhook
// ─────────────────────────────────────────────────────────────────────────────

export interface SendReportEmailParams {
  to: string;
  firstName?: string;
  locale: 'fr' | 'en';
  offerType: 'standard' | 'premium';
  reportUrl: string;
  pdfBuffer?: Buffer;
  sessionId: string;
}

export async function sendReportEmail(params: SendReportEmailParams): Promise<void> {
  const { to, firstName, locale, offerType, reportUrl, pdfBuffer, sessionId } = params;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace('http://localhost:3000', 'https://couplecheck.app') || 'https://couplecheck.app';

  const name = firstName || (locale === 'fr' ? 'toi' : 'you');

  const labels = {
    fr: {
      subject: `ton rapport est là${firstName ? `, ${firstName}` : ''}`,
      greeting: firstName ? `${firstName},` : 'Bonjour,',
      line1: 'Ton rapport CoupleCheck est prêt.',
      ctaLabel: '→ Télécharger mon rapport',
      body2: 'Ce que tu vas trouver dedans\u00a0: ton analyse sur 7 dimensions, tes points forts, les zones qui méritent ton attention, et un plan d\'action concret.',
      body3: 'Prends 15 minutes au calme pour le lire. Certaines choses méritent d\'être digérées tranquillement.',
      premiumIntro: 'Et ton accès à la plateforme CoupleCheck.',
      premiumBody: 'L\'agent IA connaît déjà tes scores, tes dimensions, ce que tu as décrit dans le quiz. Tu n\'as pas à tout réexpliquer.',
      premiumNote: 'Ton accès est valable 1\u00a0mois. À l\'issue, tu peux continuer à 7,99\u00a0€/mois si tu le souhaites\u00a0— ou t\'arrêter là, sans engagement.',
      trailLabel: 'ACCÈS PLATEFORME · 1 MOIS OFFERT',
      teaser: 'Une chose que je n\'ai pas encore annoncée publiquement\u00a0: on prépare la suite de CoupleCheck\u00a0— une plateforme où un agent IA part de ton rapport pour t\'accompagner dans la durée. Si ça t\'intéresse, réponds à cet email.',
      sign: 'Matthieu',
      ps: 'P.S.\u00a0Une question sur ton rapport\u00a0? Réponds directement ici, je lis tout.',
      unsubscribe: 'Se désinscrire',
      unsubscribePrefs: 'Préférences',
    },
    en: {
      subject: `your report is ready${firstName ? `, ${firstName}` : ''}`,
      greeting: firstName ? `${firstName},` : 'Hello,',
      line1: 'Your CoupleCheck report is ready.',
      ctaLabel: '→ Download my report',
      body2: 'What you\'ll find inside: your analysis across 7 dimensions, your strengths, the areas worth your attention, and a concrete action plan.',
      body3: 'Take 15 quiet minutes to read it. Some things are worth sitting with.',
      premiumIntro: 'And your access to the CoupleCheck platform.',
      premiumBody: 'The AI agent already knows your scores, your dimensions, what you described in the quiz. You don\'t have to explain everything from scratch.',
      premiumNote: 'Your access is valid for 1\u00a0month. After that, you can continue at €7.99/month if you\'d like\u00a0— or stop there, no commitment.',
      trailLabel: 'PLATFORM ACCESS · 1 MONTH FREE',
      teaser: 'Something I haven\'t announced publicly yet: we\'re building what comes next for CoupleCheck\u00a0— a platform where an AI agent starts from your report and stays with you over time. If that interests you, reply to this email.',
      sign: 'Matthieu',
      ps: 'P.S.\u00a0Questions about your report? Reply directly here, I read everything.',
      unsubscribe: 'Unsubscribe',
      unsubscribePrefs: 'Unsubscribe Preferences',
    },
  };

  const l = labels[locale];

  const premiumBlock = offerType === 'premium' ? `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#2C2C2C;font-weight:300;">${l.premiumIntro}</p>
    <div style="border-left:2px solid #AA2C32;padding:16px 20px;margin:0 0 20px;background-color:#FFFFFF;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#999;font-weight:500;margin-bottom:6px;">${l.trailLabel}</div>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#2C2C2C;font-weight:300;">${l.premiumBody}</p>
    </div>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#2C2C2C;font-weight:300;">${l.premiumNote}</p>` : `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#2C2C2C;font-weight:300;">${l.teaser}</p>`;

  const unsubscribeUrl = `${appUrl}/unsubscribe?session=${sessionId}`;

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${l.subject}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FAF8F5; font-family: 'DM Sans', Helvetica, Arial, sans-serif; color: #1A1A1A; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 48px 24px; }
    .logo { font-family: 'DM Serif Display', Georgia, serif; font-size: 18px; color: #AA2C32; letter-spacing: 0.02em; margin-bottom: 48px; display: block; }
    .body-text { font-size: 15px; line-height: 1.8; color: #2C2C2C; font-weight: 300; }
    .body-text p { margin-bottom: 20px; }
    .cta-link { display: inline-block; margin: 8px 0 32px; font-size: 14px; color: #AA2C32; text-decoration: none; border-bottom: 1px solid #AA2C32; padding-bottom: 2px; font-weight: 500; font-family: 'DM Sans', Helvetica, Arial, sans-serif; }
    .report-block { border: 1px solid #E8E4DF; background: #FFF; margin: 32px 0; padding: 20px 24px; }
    .report-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #999; font-weight: 500; margin-bottom: 6px; }
    .report-detail { font-size: 14px; color: #2C2C2C; font-weight: 300; line-height: 1.6; }
    .divider { border: none; border-top: 1px solid #E8E4DF; margin: 40px 0 24px; }
    .signature { margin-top: 40px; font-size: 15px; color: #2C2C2C; font-weight: 300; line-height: 1.8; }
    .ps { margin-top: 20px; font-size: 13px; color: #888; font-weight: 300; font-style: italic; }
    .footer { font-size: 12px; color: #AAA; line-height: 1.7; }
    .footer a { color: #AAA; text-decoration: underline; }
    @media (max-width: 600px) { .wrapper { padding: 32px 20px; } }
  </style>
</head>
<body>
  <div class="wrapper">

    <span class="logo">CoupleCheck</span>

    <div class="body-text">
      <p>${l.greeting}</p>
      <p>${l.line1}</p>
    </div>

    <div class="report-block">
      <div class="report-label">${locale === 'fr' ? 'TON RAPPORT' : 'YOUR REPORT'}</div>
      <div class="report-detail">${locale === 'fr' ? 'PDF · 15 pages · Plan d\'action personnalisé' : 'PDF · 15 pages · Personalized action plan'}</div>
    </div>

    <a href="${reportUrl}" class="cta-link">${l.ctaLabel}</a>

    <div class="body-text">
      <p>${l.body2}</p>
      <p>${l.body3}</p>
    </div>

    ${premiumBlock}

    <div class="signature">
      ${l.sign}
    </div>

    <div class="ps">${l.ps}</div>

    <hr class="divider" />

    <div class="footer">
      CoupleCheck<br/>
      <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#AAA;font-size:12px;line-height:20px;padding:0;text-align:left;">
        <p style="font-size:12px;line-height:20px;">
          <a href="${unsubscribeUrl}" target="_blank" style="font-family:sans-serif;text-decoration:none;color:#AAA;">${l.unsubscribe}</a>
        </p>
      </div>
    </div>

  </div>
</body>
</html>`;

  const msg: sgMail.MailDataRequired = {
    to,
    from: FROM,
    subject: l.subject,
    html,
    customArgs: { emailType: 'report', locale },
    trackingSettings: {
      clickTracking: { enable: true },
      openTracking: { enable: true },
    },
    attachments: pdfBuffer
      ? [
          {
            content: pdfBuffer.toString('base64'),
            filename: locale === 'fr' ? 'rapport-couplecheck.pdf' : 'couplecheck-report.pdf',
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ]
      : undefined,
  };

  await sgMail.send(msg);
}