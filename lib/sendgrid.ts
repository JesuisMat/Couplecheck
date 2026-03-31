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

  const labels = {
    fr: {
      subject: `Votre rapport CoupleCheck est prêt${firstName ? `, ${firstName}` : ''} !`,
      headline: `${firstName ? `${firstName}, votre` : 'Votre'} rapport est prêt !`,
      body: 'Nous avons analysé vos réponses et préparé un rapport complet et personnalisé pour vous.',
      cta: 'Télécharger mon rapport PDF',
      badge: 'RAPPORT DISPONIBLE',
      details: 'Rapport PDF · 15 pages · Plan d\'action 30 jours',
      premium: 'En tant que membre Premium, votre accès à l\'Agent IA Coach est activé.',
      footer: 'Rapport généré par CoupleCheck. Données confidentielles.',
      unsubscribe: 'Se désabonner',
    },
    en: {
      subject: `Your CoupleCheck report is ready${firstName ? `, ${firstName}` : ''}!`,
      headline: `${firstName ? `${firstName}, your` : 'Your'} report is ready!`,
      body: 'We\'ve analyzed your answers and prepared a complete, personalized report for you.',
      cta: 'Download my PDF report',
      badge: 'REPORT AVAILABLE',
      details: 'PDF Report · 15 pages · 30-day action plan',
      premium: 'As a Premium member, your AI Coach Agent access is activated.',
      footer: 'Report generated by CoupleCheck. Confidential data.',
      unsubscribe: 'Unsubscribe',
    },
  };

  const l = labels[locale];

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
            <td style="background-color:#1A1916;padding:28px 40px;border-radius:12px 12px 0 0;text-align:center;">
              <span style="color:#AA2C32;font-size:20px;font-weight:700;letter-spacing:1px;">COUPLECHECK</span>
            </td>
          </tr>
          <tr>
            <td style="background-color:#FFFFFF;padding:48px 40px;">
              <h1 style="margin:0 0 16px;font-size:28px;font-weight:700;color:#1A1916;line-height:1.2;">${l.headline}</h1>
              <p style="margin:0 0 24px;font-size:16px;color:#5B5C59;line-height:1.6;">${l.body}</p>
              <div style="background-color:#F5F2EC;border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
                <div style="font-size:13px;color:#5B5C59;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">${l.badge}</div>
                <div style="font-size:15px;font-weight:600;color:#1A1916;">${l.details}</div>
              </div>
              <div style="text-align:center;margin:32px 0;">
                <a href="${reportUrl}" style="display:inline-block;background-color:#AA2C32;color:#FFFFFF;font-size:16px;font-weight:600;text-decoration:none;padding:16px 32px;border-radius:10px;">${l.cta}</a>
              </div>
              ${offerType === 'premium' ? `<p style="margin:24px 0 0;padding:16px;background-color:#F0F7F3;border-radius:8px;font-size:14px;color:#2A7A4A;border-left:4px solid #2A7A4A;">${l.premium}</p>` : ''}
            </td>
          </tr>
          <tr>
            <td style="background-color:#F5F2EC;padding:24px 40px;border-radius:0 0 12px 12px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#9B9896;">${l.footer}</p>
              <a href="${appUrl}/unsubscribe?session=${sessionId}" style="font-size:12px;color:#BCBAB6;text-decoration:underline;">${l.unsubscribe}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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