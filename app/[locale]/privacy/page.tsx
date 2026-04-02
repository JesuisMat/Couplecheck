import { LegalLayout } from "@/components/legal/LegalLayout";

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    title: "Politique de confidentialité",
    lastUpdated: "28 mars 2026",
    body: (
      <>
        <div className="info-box">
          Chez CoupleCheck, nous prenons la protection de vos données personnelles très au sérieux. Ce document explique quelles données nous collectons, pourquoi, et comment vous pouvez exercer vos droits.
        </div>

        <h2>1. Responsable du traitement</h2>
        <p><strong>CoupleCheck</strong>, entreprise individuelle immatriculée en France.<br />Contact : <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>2. Données collectées</h2>
        <h3>2.1 Données du quiz</h3>
        <p>Vos réponses aux 20 questions, vos scores par dimension et votre score global. Ces données sont anonymes tant que vous n'avez pas fourni votre adresse e-mail.</p>

        <h3>2.2 Données de contact (optionnel)</h3>
        <p>Lorsque vous demandez à recevoir vos résultats : prénom, adresse e-mail, consentement newsletter.</p>

        <h3>2.3 Données techniques</h3>
        <p>Adresse IP, navigateur, pages visitées — collectées de manière agrégée via PostHog (analytics) pour améliorer le service.</p>

        <h2>3. Finalités et bases légales</h2>
        <ul>
          <li>Afficher vos résultats personnalisés — <strong>intérêt légitime</strong></li>
          <li>Vous envoyer votre rapport par e-mail — <strong>exécution du contrat</strong></li>
          <li>Newsletter — <strong>consentement explicite</strong></li>
          <li>Amélioration du service (analytics anonymes) — <strong>intérêt légitime</strong></li>
          <li>Traitement des paiements (Stripe) — <strong>exécution du contrat</strong></li>
        </ul>

        <h2>4. Durée de conservation</h2>
        <ul>
          <li>Résultats du quiz : 12 mois</li>
          <li>Données e-mail : jusqu'à désinscription ou 3 ans sans activité</li>
          <li>Données de paiement : 5 ans (obligation légale)</li>
        </ul>

        <h2>5. Sous-traitants</h2>
        <ul>
          <li><strong>Supabase</strong> (hébergement base de données — UE)</li>
          <li><strong>Stripe</strong> (paiement — certifié PCI-DSS)</li>
          <li><strong>SendGrid / Twilio</strong> (envoi d'e-mails)</li>
          <li><strong>PostHog</strong> (analytics — données anonymisées)</li>
        </ul>

        <h2>6. Vos droits (RGPD)</h2>
        <p>Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition. Exercez ces droits en écrivant à <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a>. En cas de litige, vous pouvez saisir la <a href="https://www.cnil.fr" target="_blank" rel="noopener">CNIL</a>.</p>

        <h2>7. Cookies</h2>
        <p>Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement du service. Aucun cookie publicitaire ou tracker tiers.</p>

        <h2>8. Modifications</h2>
        <p>Toute modification importante sera notifiée par e-mail aux utilisateurs inscrits. La version en vigueur est celle affichée sur cette page.</p>
      </>
    ),
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "March 28, 2026",
    body: (
      <>
        <div className="info-box">
          At CoupleCheck, we take the protection of your personal data seriously. This document explains what data we collect, why, and how you can exercise your rights.
        </div>

        <h2>1. Data Controller</h2>
        <p><strong>CoupleCheck</strong>, sole proprietorship registered in France.<br />Contact: <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>2. Data We Collect</h2>
        <h3>2.1 Quiz Data</h3>
        <p>Your answers to the 20 questions, your dimension scores, and your overall score. This data is anonymous until you provide your email address.</p>

        <h3>2.2 Contact Data (optional)</h3>
        <p>When you request your results: first name, email address, newsletter consent.</p>

        <h3>2.3 Technical Data</h3>
        <p>IP address, browser, pages visited — collected in aggregate via PostHog (analytics) to improve the service.</p>

        <h2>3. Purposes and Legal Bases</h2>
        <ul>
          <li>Display your personalized results — <strong>legitimate interest</strong></li>
          <li>Send your report by email — <strong>contract performance</strong></li>
          <li>Newsletter — <strong>explicit consent</strong></li>
          <li>Service improvement (anonymous analytics) — <strong>legitimate interest</strong></li>
          <li>Payment processing (Stripe) — <strong>contract performance</strong></li>
        </ul>

        <h2>4. Retention Periods</h2>
        <ul>
          <li>Quiz results: 12 months</li>
          <li>Email data: until unsubscription or 3 years of inactivity</li>
          <li>Payment data: 5 years (legal obligation)</li>
        </ul>

        <h2>5. Sub-Processors</h2>
        <ul>
          <li><strong>Supabase</strong> (database hosting — EU)</li>
          <li><strong>Stripe</strong> (payment — PCI-DSS certified)</li>
          <li><strong>SendGrid / Twilio</strong> (email delivery)</li>
          <li><strong>PostHog</strong> (analytics — anonymized data)</li>
        </ul>

        <h2>6. Your Rights (GDPR)</h2>
        <p>You have the right to access, rectify, erase, port, and object to your data. Exercise these rights by writing to <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a>. For complaints, you may contact your local data protection authority.</p>

        <h2>7. Cookies</h2>
        <p>We only use cookies strictly necessary for the service to function. No advertising cookies or third-party trackers.</p>

        <h2>8. Changes</h2>
        <p>Any material changes will be notified by email to registered users. The current version is the one displayed on this page.</p>
      </>
    ),
  },
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const c = content[lang];

  return (
    <LegalLayout locale={locale} title={c.title} lastUpdated={c.lastUpdated}>
      {c.body}
    </LegalLayout>
  );
}
