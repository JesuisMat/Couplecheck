import { LegalLayout } from "@/components/legal/LegalLayout";

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    title: "Mentions légales",
    lastUpdated: "28 mars 2026",
    body: (
      <>
        <h2>Éditeur du site</h2>
        <p>
          <strong>CoupleCheck</strong><br />
          Entreprise individuelle<br />
          France<br />
          E-mail : <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.fr</a>
        </p>

        <h2>Directeur de la publication</h2>
        <p>Le directeur de la publication est le représentant légal de CoupleCheck.</p>

        <h2>Hébergement</h2>
        <p>
          <strong>Vercel Inc.</strong><br />
          440 N Barranca Ave #4133<br />
          Covina, CA 91723, États-Unis<br />
          <a href="https://vercel.com" target="_blank" rel="noopener">vercel.com</a>
        </p>
        <p>
          <strong>Supabase Inc.</strong> (base de données)<br />
          970 Toa Payoh North, #07-04, Singapour
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble des contenus présents sur CoupleCheck (textes, questionnaires, algorithmes de scoring, design) sont protégés par le droit d'auteur. Toute reproduction sans autorisation expresse est interdite.</p>

        <h2>Données personnelles</h2>
        <p>Conformément au RGPD, vous disposez de droits sur vos données. Consultez notre <a href="/fr/privacy">Politique de confidentialité</a> pour plus d'informations.</p>

        <h2>Cookies</h2>
        <p>Ce site utilise uniquement des cookies fonctionnels nécessaires à son fonctionnement. Aucun cookie publicitaire n'est déposé.</p>

        <h2>Médiation</h2>
        <p>En cas de litige non résolu avec notre service client, vous pouvez recourir à la médiation de la consommation. En tant que consommateur européen, vous pouvez également utiliser la plateforme de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a></p>

        <h2>Limitation de responsabilité</h2>
        <p>CoupleCheck s'efforce d'assurer l'exactitude des informations présentes sur le site. Toutefois, les résultats fournis sont à titre indicatif et ne constituent pas un avis professionnel. En cas de difficultés psychologiques, consultez un professionnel de santé.</p>
      </>
    ),
  },
  en: {
    title: "Legal Notice",
    lastUpdated: "March 28, 2026",
    body: (
      <>
        <h2>Publisher</h2>
        <p>
          <strong>CoupleCheck</strong><br />
          Sole proprietorship registered in France<br />
          Email: <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.fr</a>
        </p>

        <h2>Publication Director</h2>
        <p>The publication director is the legal representative of CoupleCheck.</p>

        <h2>Hosting</h2>
        <p>
          <strong>Vercel Inc.</strong><br />
          440 N Barranca Ave #4133<br />
          Covina, CA 91723, United States<br />
          <a href="https://vercel.com" target="_blank" rel="noopener">vercel.com</a>
        </p>
        <p>
          <strong>Supabase Inc.</strong> (database)<br />
          970 Toa Payoh North, #07-04, Singapore
        </p>

        <h2>Intellectual Property</h2>
        <p>All content on CoupleCheck (texts, questionnaires, scoring algorithms, design) is protected by copyright. Any reproduction without express authorization is prohibited.</p>

        <h2>Personal Data</h2>
        <p>In accordance with GDPR, you have rights over your data. See our <a href="/en/privacy">Privacy Policy</a> for more information.</p>

        <h2>Cookies</h2>
        <p>This site uses only functional cookies necessary for its operation. No advertising cookies are used.</p>

        <h2>Dispute Resolution</h2>
        <p>If a dispute cannot be resolved with our customer service, EU consumers may use the Online Dispute Resolution platform: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a></p>

        <h2>Limitation of Liability</h2>
        <p>CoupleCheck strives to ensure the accuracy of information on the site. However, results are indicative and do not constitute professional advice. If you are experiencing psychological difficulties, please consult a healthcare professional.</p>
      </>
    ),
  },
};

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const c = content[lang];

  return (
    <LegalLayout locale={locale} title={c.title} lastUpdated={c.lastUpdated}>
      {c.body}
    </LegalLayout>
  );
}
