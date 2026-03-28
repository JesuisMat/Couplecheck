import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { PricingCards } from '@/components/result/PricingCards';
import { UnlockCountdown } from '@/components/result/UnlockCountdown';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, Check, Star,
  FileText, BarChart3, BrainCircuit, Lightbulb,
  AlertTriangle, Target, MessageCircle, ShieldCheck,
  HeartHandshake, Layers, Compass,
} from 'lucide-react';

interface Props {
  params: Promise<{ locale: string; sessionId: string }>;
}

type Locale = 'fr' | 'en';

// ─── Copy ────────────────────────────────────────────────────────────────────

const copy = {
  fr: {
    back: 'Retour aux résultats',
    badge: 'Rapport personnalisé généré',
    title: 'Votre analyse\ncomplète est prête.',
    subtitle: '15 pages · Basé sur vos 20 réponses · 7 dimensions',
    pricingTitle: 'Choisissez votre accès',
    pricingSubtitle: 'Satisfait ou remboursé 7 jours — sans conditions',
    contentsTitle: 'Ce que contient votre rapport',
    contentsItems: [
      { text: 'Score détaillé sur chacune des 7 dimensions relationnelles' },
      { text: 'Analyse de vos forces — ce qui fonctionne vraiment dans votre relation' },
      { text: 'Toutes vos zones à risque dévoilées, classées par priorité' },
      { text: 'Explication des mécanismes sous-jacents à chaque point fragile' },
      { text: 'Plan d\'action personnalisé en 5 étapes adapté à votre situation' },
      { text: 'Ressources et exercices concrets recommandés par dimension' },
      { text: 'Agent IA Coach inclus pour vous accompagner (offre Premium)' },
    ],
    previewLabel: 'Aperçu de votre rapport',
    previewCaption: 'Vos données personnelles sont masquées — déverrouillez pour accéder',
    discoverTitle: 'Ce que vous allez découvrir',
    benefitsTitle: 'Comment vous allez en bénéficier',
    benefitsItems: [
      'Comprendre pourquoi certaines tensions reviennent toujours',
      'Identifier ce que votre partenaire ressent probablement',
      'Gagner en clarté sur vos besoins relationnels réels',
      'Passer à l\'action avec un plan concret, pas vague',
    ],
    learningsTitle: 'Ce que vous allez apprendre',
    learningsItems: [
      'Vos schémas de communication inconscients',
      'La dynamique précise de votre relation en ce moment',
      'Les points de bascule avant un vrai conflit',
      'Comment renforcer durablement votre lien',
    ],
    testimonialsTitle: 'Ce qu\'ils ont découvert',
    testimonials: [
      {
        name: 'Sophie B.',
        location: 'Paris',
        stars: 5,
        text: 'Je savais qu\'il y avait quelque chose, mais je n\'arrivais pas à mettre le doigt dessus. Le rapport a tout nommé. Pour la première fois, j\'ai eu l\'impression d\'avoir une carte.',
      },
      {
        name: 'Thomas M.',
        location: 'Lyon',
        stars: 5,
        text: 'Beaucoup plus précis que ce à quoi je m\'attendais. Pas de généralités — des analyses qui correspondaient exactement à notre situation. Le plan d\'action est concret et applicable.',
      },
      {
        name: 'Camille L.',
        location: 'Bordeaux',
        stars: 5,
        text: 'On a fait le test séparément avec mon compagnon et on a comparé. Ça nous a ouvert une conversation qu\'on n\'aurait jamais eu autrement. Vraiment utile.',
      },
      {
        name: 'Marc D.',
        location: 'Nantes',
        stars: 5,
        text: 'Je pensais que tout allait bien. Le rapport m\'a montré trois points fragiles que j\'avais complètement sous-estimés. Un vrai réveil.',
      },
    ],
    finalTitle: 'Prêt(e) à voir\nla vérité en face ?',
    finalSub: 'Votre rapport est généré, personnalisé, et vous attend.',
    finalCta: 'Accéder à mon rapport',
    guarantee: 'Satisfait ou remboursé · 7 jours · Sans condition',
    methodology: 'Basé sur les travaux de Gottman, Sternberg et les recherches en psychologie relationnelle (APA)',
  },
  en: {
    back: 'Back to results',
    badge: 'Personalized report generated',
    title: 'Your complete\nanalysis is ready.',
    subtitle: '15 pages · Based on your 20 answers · 7 dimensions',
    pricingTitle: 'Choose your access',
    pricingSubtitle: '7-day money-back guarantee — no questions asked',
    contentsTitle: "What's inside your report",
    contentsItems: [
      { text: 'Detailed score on each of the 7 relationship dimensions' },
      { text: "Analysis of your strengths — what's genuinely working in your relationship" },
      { text: 'All your risk areas revealed, ranked by priority' },
      { text: 'Explanation of the underlying mechanisms behind each weak point' },
      { text: 'Personalized 5-step action plan tailored to your situation' },
      { text: 'Concrete resources and exercises recommended by dimension' },
      { text: 'AI Coach Agent included to guide you (Premium offer)' },
    ],
    previewLabel: 'Preview of your report',
    previewCaption: 'Your personal data is hidden — unlock to access',
    discoverTitle: "What you'll discover",
    benefitsTitle: 'How you\'ll benefit',
    benefitsItems: [
      'Understand why certain tensions keep coming back',
      'Identify what your partner is likely feeling',
      'Gain clarity on your actual relationship needs',
      'Take action with a concrete plan, not vague advice',
    ],
    learningsTitle: "What you'll learn",
    learningsItems: [
      'Your unconscious communication patterns',
      'The precise dynamic of your relationship right now',
      'The tipping points before a real conflict',
      'How to lastingly strengthen your bond',
    ],
    testimonialsTitle: 'What they discovered',
    testimonials: [
      {
        name: 'Sophie B.',
        location: 'Paris',
        stars: 5,
        text: "I knew something was off, but I couldn't put my finger on it. The report named everything. For the first time, I felt like I had a map.",
      },
      {
        name: 'Thomas M.',
        location: 'Lyon',
        stars: 5,
        text: "Far more precise than I expected. No generalities — analyses that matched exactly our situation. The action plan is concrete and actionable.",
      },
      {
        name: 'Camille L.',
        location: 'Bordeaux',
        stars: 5,
        text: "We each took the test separately and compared results. It opened a conversation we'd never have had otherwise. Really useful.",
      },
      {
        name: 'Marc D.',
        location: 'Nantes',
        stars: 5,
        text: "I thought everything was fine. The report showed me three weak points I'd completely underestimated. A real wake-up call.",
      },
    ],
    finalTitle: 'Ready to see\nthe truth clearly?',
    finalSub: 'Your report is generated, personalized, and waiting for you.',
    finalCta: 'Access my report',
    guarantee: 'Money-back guarantee · 7 days · No conditions',
    methodology: 'Based on Gottman, Sternberg, and relationship psychology research (APA)',
  },
};

// ─── Report mock pages ────────────────────────────────────────────────────────

function ReportMockup({ locale }: { locale: Locale }) {
  return (
    <div className="relative select-none pointer-events-none" aria-hidden>
      {/* Two-page spread */}
      <div className="flex gap-3 blur-[6px] scale-[0.97]">
        {/* Left page */}
        <div className="flex-1 bg-white rounded-[10px] p-5 border border-[#2E2B27]">
          <div className="h-3 w-24 bg-[#3A3734] rounded mb-4" />
          <div className="h-2 w-32 bg-[#2E2B27] rounded mb-6" />
          {[80, 65, 72, 55, 68, 78, 60].map((v, i) => (
            <div key={i} className="flex items-center gap-2 mb-2.5">
              <div className="w-16 h-1.5 bg-[#2E2B27] rounded-full" />
              <div className="flex-1 h-1.5 bg-[#3A3734] rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#6E6C67]" style={{ width: `${v}%` }} />
              </div>
              <div className="w-6 h-2 bg-[#2E2B27] rounded" />
            </div>
          ))}
          <div className="mt-5 space-y-1.5">
            {[90, 75, 60, 80].map((w, i) => (
              <div key={i} className="h-1.5 bg-[#2E2B27] rounded-full" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        {/* Right page */}
        <div className="flex-1 bg-white rounded-[10px] p-5 border border-[#2E2B27]">
          <div className="h-3 w-28 bg-[#3A3734] rounded mb-3" />
          <div className="space-y-1 mb-5">
            {[95, 80, 70, 85, 65].map((w, i) => (
              <div key={i} className="h-1.5 bg-[#2E2B27] rounded-full" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="h-2.5 w-20 bg-[#3A3734] rounded mb-3" />
          <div className="space-y-1 mb-5">
            {[90, 75, 85, 60, 80, 70].map((w, i) => (
              <div key={i} className="h-1.5 bg-[#2E2B27] rounded-full" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="h-2.5 w-24 bg-[#3A3734] rounded mb-3" />
          <div className="space-y-1">
            {[70, 85, 65, 90].map((w, i) => (
              <div key={i} className="h-1.5 bg-[#2E2B27] rounded-full" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            {[40, 65, 55, 80, 70, 60].map((h, i) => (
              <div key={i} className="flex-1 bg-[#2E2B27] rounded-t-sm" style={{ height: `${h * 0.6}px` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1916] via-[#1A1916]/60 to-transparent rounded-[10px]" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UnlockPage({ params }: Props) {
  const { locale, sessionId } = await params;

  const supabase = createAdminClient();
  const { data: session, error } = await supabase
    .from('quiz_sessions')
    .select('id')
    .eq('id', sessionId)
    .single();

  if (error || !session) notFound();

  const lang: Locale = locale === 'en' ? 'en' : 'fr';
  const c = copy[lang];

  const contentsIcons = [
    BarChart3, HeartHandshake, AlertTriangle, BrainCircuit,
    Target, Layers, Compass,
  ];

  return (
    <main className="min-h-screen bg-[#F5F2EC]">

      {/* ── Sticky header ─────────────────────────────────── */}
      <div className="glass sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-5 h-[58px] flex items-center justify-between gap-4">
          <Link
            href={`/${locale}/result/${sessionId}`}
            className="flex items-center gap-1.5 text-[13px] text-[#5A5854] hover:text-[#1A1916] transition-colors flex-shrink-0"
          >
            <ArrowLeft size={15} strokeWidth={1.75} />
            {c.back}
          </Link>
          <UnlockCountdown locale={locale} />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-5 pt-10 pb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D68] animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5A5854]">
            {c.badge}
          </span>
        </div>
        <h1 className="font-display font-normal text-[34px] md:text-[42px] text-[#1A1916] leading-[1.1] tracking-[-0.02em] whitespace-pre-line mb-3">
          {c.title}
        </h1>
        <p className="text-[13px] text-[#8A8880]">{c.subtitle}</p>
      </div>

      {/* ── Pricing ───────────────────────────────────────── */}
      <div id="pricing" className="max-w-2xl mx-auto pb-2">
        <div className="mb-5 text-center px-5">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-1">
            {c.pricingTitle}
          </p>
          <p className="text-[12px] text-[#A8A6A2]">{c.pricingSubtitle}</p>
        </div>
        <PricingCards sessionId={sessionId} />
      </div>

      {/* ── Methodology badge ─────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-5 pb-10">
        <p className="text-center text-[11px] text-[#A8A6A2] leading-[1.6] flex items-center justify-center gap-1.5">
          <ShieldCheck size={12} strokeWidth={1.75} className="text-[#8A8880] flex-shrink-0" />
          {c.methodology}
        </p>
      </div>

      {/* ── Report contents — dark section (full width) ───── */}
      <div className="w-full bg-[#1A1916]">
        <div className="max-w-2xl mx-auto px-5 py-12">
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#6E6C67] mb-3">
              {lang === 'fr' ? 'Contenu' : 'Contents'}
            </p>
            <h2 className="font-display font-normal text-[26px] md:text-[32px] text-white leading-[1.15] tracking-[-0.02em]">
              {c.contentsTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border-t border-[#2E2B27]">
            {c.contentsItems.map((item, i) => {
              const Icon = contentsIcons[i] ?? FileText;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5 border-b border-[#2E2B27] md:even:border-l md:even:pl-6 md:even:border-[#2E2B27]"
                >
                  <div className="w-8 h-8 rounded-[8px] border border-[#3A3734] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={15} strokeWidth={1.75} className="text-[#AA2C32]" />
                  </div>
                  <p className="text-[13px] text-[#C8C5BF] leading-[1.6]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Blurred preview (full width) ──────────────────── */}
      <div className="w-full bg-[#1A1916]">
        <div className="max-w-2xl mx-auto px-5 pb-12">
          <div className="relative">
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#6E6C67] mb-5">
              {c.previewLabel}
            </p>

            <ReportMockup locale={lang} />

            {/* CTA overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-2">
              <div className="flex items-center gap-2 border border-[#3A3734] rounded-[8px] px-3 py-1.5 mb-3">
                <ShieldCheck size={11} strokeWidth={1.75} className="text-[#AA2C32]" />
                <span className="text-[11px] text-[#C8C5BF]">{c.previewCaption}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Discover — two columns ────────────────────────── */}
      <div className="w-full bg-white border-t border-[#E0DDD6]">
        <div className="max-w-2xl mx-auto px-5 py-12">
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-3">
              {lang === 'fr' ? 'Dans votre rapport' : 'In your report'}
            </p>
            <h2 className="font-display font-normal text-[26px] md:text-[32px] text-[#1A1916] leading-[1.15] tracking-[-0.02em]">
              {c.discoverTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Column 1: Benefits */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#AA2C32] mb-4">
                {c.benefitsTitle}
              </p>
              <ul className="space-y-3.5">
                {c.benefitsItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F6EEEE] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} strokeWidth={2.5} className="text-[#AA2C32]" />
                    </div>
                    <span className="text-[13px] text-[#3E3B37] leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Learnings */}
            <div className="md:border-l md:border-[#E0DDD6] md:pl-8">
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#8A8880] mb-4">
                {c.learningsTitle}
              </p>
              <ul className="space-y-3.5">
                {c.learningsItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F0EDE7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lightbulb size={11} strokeWidth={2} className="text-[#8A8880]" />
                    </div>
                    <span className="text-[13px] text-[#3E3B37] leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonials ──────────────────────────────────── */}
      <div className="w-full bg-[#F5F2EC] border-t border-[#E0DDD6]">
        <div className="max-w-2xl mx-auto px-5 py-12">
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#8A8880] mb-3">
              {lang === 'fr' ? 'Témoignages' : 'Testimonials'}
            </p>
            <h2 className="font-display font-normal text-[26px] md:text-[32px] text-[#1A1916] leading-[1.15] tracking-[-0.02em]">
              {c.testimonialsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {c.testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-[#E0DDD6] rounded-[12px] p-5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={12} strokeWidth={0} fill="#E08A2A" className="text-[#E08A2A]" />
                  ))}
                </div>
                <p className="text-[13px] text-[#3E3B37] leading-[1.7] mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#EEEADF] flex items-center justify-center text-[11px] font-semibold text-[#8A8880]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#1A1916]">{t.name}</p>
                    <p className="text-[11px] text-[#A8A6A2]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mid-page repeated CTA */}
          <div className="mt-8 text-center">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2.5 bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[14px] py-3.5 px-7 rounded-[10px] transition-colors duration-150"
            >
              <FileText size={15} strokeWidth={1.75} />
              {c.finalCta}
              <ArrowRight size={15} strokeWidth={2} />
            </a>
            <p className="text-[11px] text-[#A8A6A2] mt-3">{c.guarantee}</p>
          </div>
        </div>
      </div>

      {/* ── Final CTA — dark (full width) ─────────────────── */}
      <div className="w-full bg-[#1A1916]">
        <div className="max-w-2xl mx-auto px-5 py-14 text-center">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#6E6C67] mb-5">
            {lang === 'fr' ? 'Dernière étape' : 'Last step'}
          </p>
          <h2 className="font-display font-normal text-[28px] md:text-[36px] text-white leading-[1.1] tracking-[-0.02em] whitespace-pre-line mb-4">
            {c.finalTitle}
          </h2>
          <p className="text-[14px] text-[#6E6C67] mb-8 max-w-sm mx-auto leading-[1.65]">
            {c.finalSub}
          </p>

          <a
            href="#pricing"
            className="inline-flex items-center gap-2.5 bg-white hover:bg-[#F5F2EC] text-[#1A1916] font-semibold text-[15px] py-3.5 px-8 rounded-[10px] transition-colors duration-150 mb-4"
          >
            <FileText size={15} strokeWidth={1.75} />
            {c.finalCta}
            <ArrowRight size={16} strokeWidth={2} />
          </a>

          <p className="text-[11px] text-[#3E3B37]">{c.guarantee}</p>
        </div>
      </div>

      {/* ── Footer (full width) ───────────────────────────── */}
      <div className="w-full bg-[#1A1916] border-t border-[#2E2B27]">
        <div className="max-w-2xl mx-auto px-5 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="font-display font-normal italic text-[15px] text-[#3E3B37]">CoupleCheck</span>
            <nav className="flex items-center gap-5 flex-wrap text-[11px] text-[#3E3B37]">
              <Link href={`/${locale}/cgv`} className="hover:text-[#6E6C67] transition-colors">
                {lang === 'fr' ? 'CGV' : 'Terms'}
              </Link>
              <Link href={`/${locale}/privacy`} className="hover:text-[#6E6C67] transition-colors">
                {lang === 'fr' ? 'Confidentialité' : 'Privacy'}
              </Link>
              <Link href={`/${locale}/contact`} className="hover:text-[#6E6C67] transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>

    </main>
  );
}
