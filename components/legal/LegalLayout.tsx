import Link from "next/link";

interface LegalLayoutProps {
  locale: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ locale, title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F2EC]">
      {/* Header */}
      <header className="header-flat border-b border-[#E0DDD6]">
        <div className="max-w-3xl mx-auto px-5 h-[62px] flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="font-display font-normal italic text-[19px] text-[#1A1916] tracking-tight"
          >
            CoupleCheck
          </Link>
          <div className="flex items-center gap-0 text-[12px] font-medium text-[#8A8880]">
            <Link href="/fr" className={`px-2 py-1 transition-colors ${locale === "fr" ? "text-[#1A1916] font-semibold" : "hover:text-[#5A5854]"}`}>FR</Link>
            <span className="text-[#D0CEC8]">|</span>
            <Link href="/en" className={`px-2 py-1 transition-colors ${locale === "en" ? "text-[#1A1916] font-semibold" : "hover:text-[#5A5854]"}`}>EN</Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-5 py-14">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-[#8A8880] hover:text-[#5A5854] transition-colors mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
        </Link>

        <div className="mb-10">
          <h1 className="font-display font-normal text-[32px] md:text-[40px] text-[#1A1916] tracking-[-0.02em] leading-[1.1] mb-3">
            {title}
          </h1>
          <p className="text-[12px] text-[#8A8880]">
            {locale === "fr" ? `Dernière mise à jour : ${lastUpdated}` : `Last updated: ${lastUpdated}`}
          </p>
        </div>

        <div className="prose-legal">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E0DDD6] bg-[#EEEADF] px-5 py-8 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <span className="font-display font-normal italic text-[15px] text-[#8A8880]">CoupleCheck</span>
          <nav className="flex items-center gap-5 flex-wrap text-[12px] text-[#8A8880]">
            <Link href={`/${locale}/cgv`} className="hover:text-[#5A5854] transition-colors">{locale === "fr" ? "CGV" : "Terms"}</Link>
            <Link href={`/${locale}/privacy`} className="hover:text-[#5A5854] transition-colors">{locale === "fr" ? "Confidentialité" : "Privacy"}</Link>
            <Link href={`/${locale}/legal`} className="hover:text-[#5A5854] transition-colors">{locale === "fr" ? "Mentions légales" : "Legal"}</Link>
            <Link href={`/${locale}/contact`} className="hover:text-[#5A5854] transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
