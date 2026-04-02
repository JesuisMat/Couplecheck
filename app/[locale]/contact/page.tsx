import { LegalLayout } from "@/components/legal/LegalLayout";

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    title: "Contact",
    lastUpdated: "28 mars 2026",
    body: (
      <>
        <div className="info-box">
          Nous répondons à toutes les demandes dans un délai de 2 jours ouvrés.
        </div>

        <h2>Support client</h2>
        <p>Pour toute question concernant votre résultat, votre rapport ou votre commande :</p>
        <p><a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>Données personnelles & RGPD</h2>
        <p>Pour exercer vos droits (accès, rectification, suppression) ou toute question relative à vos données personnelles :</p>
        <p><a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>Presse & partenariats</h2>
        <p>Pour toute demande presse, collaboration ou partenariat :</p>
        <p><a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>Questions fréquentes</h2>
        <p>Avant de nous contacter, consultez nos <a href="/fr#faq">questions fréquentes</a> — vous y trouverez peut-être déjà la réponse.</p>

        <h2>Remboursement</h2>
        <p>Vous avez acheté un rapport et n'êtes pas satisfait ? Écrivez-nous à <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a> dans les 7 jours suivant l'achat en précisant votre numéro de commande. Nous examinerons votre demande au cas par cas.</p>
      </>
    ),
  },
  en: {
    title: "Contact",
    lastUpdated: "March 28, 2026",
    body: (
      <>
        <div className="info-box">
          We respond to all inquiries within 2 business days.
        </div>

        <h2>Customer Support</h2>
        <p>For any questions about your result, report, or order:</p>
        <p><a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>Personal Data & GDPR</h2>
        <p>To exercise your rights (access, rectification, deletion) or for any data-related question:</p>
        <p><a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>Press & Partnerships</h2>
        <p>For press inquiries, collaborations, or partnerships:</p>
        <p><a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>FAQ</h2>
        <p>Before reaching out, check our <a href="/en#faq">frequently asked questions</a> — you may find the answer there.</p>

        <h2>Refunds</h2>
        <p>Purchased a report and not satisfied? Email us at <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a> within 7 days of purchase, including your order number. We review each case individually.</p>
      </>
    ),
  },
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const c = content[lang];

  return (
    <LegalLayout locale={locale} title={c.title} lastUpdated={c.lastUpdated}>
      {c.body}
    </LegalLayout>
  );
}
