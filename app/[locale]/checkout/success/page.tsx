import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ quiz_session?: string; session_id?: string }>;
}

const labels = {
  fr: {
    badge: 'Paiement confirmé',
    title: 'Votre rapport est en cours de génération !',
    subtitle: 'Vous recevrez votre rapport PDF par email dans les prochaines minutes. Vérifiez votre boîte de réception (et vos spams).',
    steps: [
      { title: 'Paiement reçu', desc: 'Votre paiement a été traité avec succès par Stripe.' },
      { title: 'Analyse en cours', desc: 'Notre IA analyse vos réponses et personnalise votre rapport.' },
      { title: 'Email en route', desc: 'Votre rapport PDF arrivera dans votre boîte mail sous peu.' },
    ],
    cta: 'Retour à mes résultats',
    ctaSub: 'Consulter mon profil',
    premium: 'Votre accès Agent IA Coach est activé — vous recevrez un email de connexion séparé.',
    guarantee: '7 jours satisfait ou remboursé',
    support: 'Question ? Contactez-nous',
  },
  en: {
    badge: 'Payment confirmed',
    title: 'Your report is being generated!',
    subtitle: 'You\'ll receive your PDF report by email within the next few minutes. Check your inbox (and spam folder).',
    steps: [
      { title: 'Payment received', desc: 'Your payment was successfully processed by Stripe.' },
      { title: 'Analysis in progress', desc: 'Our AI is analyzing your answers and personalizing your report.' },
      { title: 'Email on the way', desc: 'Your PDF report will arrive in your mailbox shortly.' },
    ],
    cta: 'Back to my results',
    ctaSub: 'View my profile',
    premium: 'Your AI Coach Agent access is activated — you\'ll receive a separate login email.',
    guarantee: '7-day money-back guarantee',
    support: 'Questions? Contact us',
  },
};

export default async function CheckoutSuccessPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { quiz_session } = await searchParams;
  const l = labels[locale === 'en' ? 'en' : 'fr'];

  return (
    <div className="min-h-screen bg-[#F5F2EC] flex flex-col items-center justify-center px-5 py-12">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-[#2A7A4A] flex items-center justify-center mb-6 shadow-lg">
        <CheckCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F5EE] border border-[#A8D4B8] mb-4">
        <div className="w-2 h-2 rounded-full bg-[#2A7A4A]" />
        <span className="text-[12px] font-semibold text-[#2A7A4A] uppercase tracking-wider">{l.badge}</span>
      </div>

      {/* Title */}
      <h1 className="font-display text-[28px] font-bold text-[#1A1916] text-center leading-tight mb-3 max-w-sm">
        {l.title}
      </h1>
      <p className="text-[15px] text-[#5B5C59] text-center leading-relaxed max-w-[340px] mb-10">
        {l.subtitle}
      </p>

      {/* Steps */}
      <div className="w-full max-w-[380px] space-y-3 mb-8">
        {l.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-[12px] p-4 border border-[#E0DDD6]">
            <div className="w-8 h-8 rounded-full bg-[#AA2C32] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[12px] font-bold">{i + 1}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#1A1916] mb-0.5">{step.title}</p>
              <p className="text-[12px] text-[#5B5C59] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Premium notice */}
      <div className="w-full max-w-[380px] bg-[#F0F7F3] border border-[#A8D4B8] rounded-[12px] p-4 mb-8 flex gap-2">
        <Sparkles className="w-5 h-5 text-[#2A7A4A] flex-shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#2A7A4A] leading-relaxed">{l.premium}</p>
      </div>

      {/* CTA */}
      {quiz_session && (
        <Link
          href={`/${locale}/result/${quiz_session}`}
          className="w-full max-w-[380px] flex items-center justify-center gap-2 bg-[#AA2C32] hover:bg-[#922226] text-white font-semibold text-[15px] py-4 rounded-[12px] transition-colors mb-3"
        >
          <Download className="w-5 h-5" />
          {l.cta}
          <ArrowRight className="w-5 h-5" />
        </Link>
      )}

      {/* Trust row */}
      <div className="flex items-center gap-4 mt-4">
        <span className="text-[12px] text-[#9B9896]">✓ {l.guarantee}</span>
        <span className="text-[#E0DDD6]">·</span>
        <a href={`mailto:hello@couplecheck.app`} className="text-[12px] text-[#9B9896] underline">
          {l.support}
        </a>
      </div>
    </div>
  );
}
