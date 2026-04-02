import { LegalLayout } from "@/components/legal/LegalLayout";

interface Props {
  params: Promise<{ locale: string }>;
}

const content = {
  fr: {
    title: "Conditions Générales de Vente",
    lastUpdated: "28 mars 2026",
    body: (
      <>
        <div className="info-box">
          Les présentes CGV régissent les relations entre CoupleCheck et ses clients dans le cadre de l'achat de rapports de couple numériques. En passant commande, vous acceptez les présentes conditions.
        </div>

        <h2>1. Vendeur</h2>
        <p><strong>CoupleCheck</strong>, entreprise individuelle.<br />Contact : <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>2. Produits proposés</h2>
        <p>CoupleCheck propose des rapports numériques personnalisés sur la santé relationnelle :</p>
        <ul>
          <li><strong>Rapport Standard</strong> — analyse complète des 7 dimensions, forces et zones à risque</li>
          <li><strong>Rapport Premium</strong> — rapport standard + plan d'action personnalisé + analyse approfondie</li>
        </ul>
        <p>Les produits sont des biens numériques délivrés immédiatement après paiement.</p>

        <h2>3. Prix</h2>
        <p>Les prix sont indiqués en euros TTC. CoupleCheck est en franchise de TVA (article 293 B du CGI) — aucune TVA applicable sous les seuils légaux. Les prix peuvent être modifiés à tout moment, sans effet sur les commandes déjà passées.</p>

        <h2>4. Commande et paiement</h2>
        <p>Le paiement est traité de manière sécurisée via <strong>Stripe</strong> (certifié PCI-DSS). Nous acceptons les cartes bancaires principales. La commande est confirmée par e-mail dès réception du paiement.</p>

        <h2>5. Livraison</h2>
        <p>Les rapports numériques sont accessibles immédiatement après paiement via un lien sécurisé envoyé à l'adresse e-mail fournie lors du quiz.</p>

        <h2>6. Droit de rétractation</h2>
        <p>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques dont l'exécution a commencé avec l'accord du consommateur. En acceptant l'accès immédiat au rapport, vous renoncez expressément à ce droit.</p>
        <p>Toutefois, si vous n'êtes pas satisfait, contactez-nous dans les 7 jours : <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a>. Nous examinerons chaque demande au cas par cas.</p>

        <h2>7. Propriété intellectuelle</h2>
        <p>Les rapports générés sont destinés à un usage personnel exclusivement. Toute reproduction, revente ou diffusion est interdite.</p>

        <h2>8. Responsabilité</h2>
        <p>Les rapports CoupleCheck sont des outils de réflexion personnelle. Ils ne constituent en aucun cas un avis médical, psychologique ou thérapeutique. En cas de difficultés relationnelles sérieuses, consultez un professionnel de santé mentale.</p>

        <h2>9. Loi applicable</h2>
        <p>Les présentes CGV sont soumises au droit français. En cas de litige, les parties rechercheront une solution amiable avant tout recours judiciaire. À défaut, les tribunaux compétents seront ceux du ressort du siège social de CoupleCheck.</p>
      </>
    ),
  },
  en: {
    title: "Terms of Service",
    lastUpdated: "March 28, 2026",
    body: (
      <>
        <div className="info-box">
          These Terms of Service govern the relationship between CoupleCheck and its customers in the context of purchasing digital couple reports. By placing an order, you accept these terms.
        </div>

        <h2>1. Seller</h2>
        <p><strong>CoupleCheck</strong>, sole proprietorship registered in France.<br />Contact: <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a></p>

        <h2>2. Products</h2>
        <p>CoupleCheck offers personalized digital reports on relationship health:</p>
        <ul>
          <li><strong>Standard Report</strong> — full analysis of 7 dimensions, strengths and risk areas</li>
          <li><strong>Premium Report</strong> — standard report + personalized action plan + in-depth analysis</li>
        </ul>
        <p>Products are digital goods delivered immediately after payment.</p>

        <h2>3. Pricing</h2>
        <p>Prices are listed in euros inclusive of all taxes. Prices may change at any time, with no effect on existing orders.</p>

        <h2>4. Order & Payment</h2>
        <p>Payment is processed securely via <strong>Stripe</strong> (PCI-DSS certified). We accept major credit and debit cards. Orders are confirmed by email upon receipt of payment.</p>

        <h2>5. Delivery</h2>
        <p>Digital reports are accessible immediately after payment via a secure link sent to the email address provided during the quiz.</p>

        <h2>6. Right of Withdrawal</h2>
        <p>By accepting immediate access to your report, you expressly waive your right of withdrawal for digital content, in accordance with applicable consumer protection law.</p>
        <p>If you are unsatisfied, contact us within 7 days: <a href="mailto:matthieu@couplecheck.app">matthieu@couplecheck.app</a>. We review each case individually.</p>

        <h2>7. Intellectual Property</h2>
        <p>Generated reports are for personal use only. Any reproduction, resale, or distribution is prohibited.</p>

        <h2>8. Liability</h2>
        <p>CoupleCheck reports are personal reflection tools. They do not constitute medical, psychological, or therapeutic advice. If you are experiencing serious relationship difficulties, please consult a mental health professional.</p>

        <h2>9. Governing Law</h2>
        <p>These Terms are governed by French law. The parties will seek an amicable resolution before any legal proceedings.</p>
      </>
    ),
  },
};

export default async function CGVPage({ params }: Props) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "fr") as "fr" | "en";
  const c = content[lang];

  return (
    <LegalLayout locale={locale} title={c.title} lastUpdated={c.lastUpdated}>
      {c.body}
    </LegalLayout>
  );
}
