import { NextResponse } from "next/server";

const CONTENT = `# CoupleCheck

> Diagnostic relationnel par IA — quiz en 3 minutes, rapport PDF personnalisé sur 7 dimensions clés du couple.

CoupleCheck aide les couples à mesurer la santé de leur relation à travers un quiz de 30 questions couvrant 7 dimensions : communication, confiance, intimité physique, intimité émotionnelle, gestion des conflits, projets de vie et bien-être individuel. Un score global et un rapport PDF de 15 pages sont générés par IA.

## Pages principales

- [Accueil FR](https://couplecheck.app/fr): Landing page française
- [Accueil EN](https://couplecheck.app/en): English landing page
- [Quiz FR](https://couplecheck.app/fr/quiz): Quiz relationnel (30 questions, ~3 min)
- [Quiz EN](https://couplecheck.app/en/quiz): Relationship quiz (30 questions, ~3 min)
- [Contact](https://couplecheck.app/fr/contact): Support et contact

## Offres

- **Standard** : rapport PDF 15 pages + analyse des 7 dimensions + plan d'action personnalisé
- **Premium** : rapport PDF + agent IA Coach personnel (accès 1 mois)

## À propos

- Plus de 12 000 couples analysés
- Données anonymisées, stockées en Europe, conformes RGPD
- Garantie satisfait ou remboursé 7 jours
- Contact : hello@couplecheck.app
- Disponible en français et en anglais
`;

export function GET() {
  return new NextResponse(CONTENT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
