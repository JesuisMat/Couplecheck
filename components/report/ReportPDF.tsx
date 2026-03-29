import React from 'react';
import path from 'path';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts — TTF required by @react-pdf/renderer
const fontsDir = path.join(process.cwd(), 'public', 'fonts');
Font.register({
  family: 'Inter',
  fonts: [
    { src: path.join(fontsDir, 'Inter-Regular.ttf'), fontWeight: 400 },
    { src: path.join(fontsDir, 'Inter-SemiBold.ttf'), fontWeight: 600 },
    { src: path.join(fontsDir, 'Inter-Bold.ttf'), fontWeight: 700 },
  ],
});

// Color palette
const C = {
  red: '#AA2C32',
  redDark: '#7A1F24',
  cream: '#F5F2EC',
  dark: '#1A1916',
  gray: '#5B5C59',
  lightGray: '#E0DDD6',
  white: '#FFFFFF',
  green: '#2A7A4A',
  orange: '#C45C1A',
  blue: '#1A4A7A',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    backgroundColor: C.white,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  // Cover
  cover: {
    flex: 1,
    backgroundColor: C.dark,
    padding: 48,
    justifyContent: 'space-between',
  },
  coverBadge: {
    backgroundColor: C.red,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  coverBadgeText: {
    color: C.white,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: 1.5,
  },
  coverTitle: {
    color: C.white,
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.2,
    marginTop: 24,
  },
  coverSubtitle: {
    color: '#A8A5A0',
    fontSize: 14,
    marginTop: 12,
    lineHeight: 1.5,
  },
  coverScoreBox: {
    backgroundColor: '#2A2825',
    borderRadius: 16,
    padding: 32,
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  coverScoreNumber: {
    color: C.red,
    fontSize: 64,
    fontWeight: 700,
  },
  coverScoreLabel: {
    color: C.white,
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 4,
  },
  coverScoreSub: {
    color: '#A8A5A0',
    fontSize: 12,
  },
  coverFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  coverBrand: {
    color: '#A8A5A0',
    fontSize: 12,
    fontWeight: 600,
  },
  coverDate: {
    color: '#6B6866',
    fontSize: 11,
  },
  // Content pages
  contentPage: {
    flex: 1,
    backgroundColor: C.white,
  },
  pageHeader: {
    backgroundColor: C.cream,
    paddingHorizontal: 48,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: C.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageHeaderBrand: {
    color: C.red,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
  },
  pageHeaderTitle: {
    color: C.gray,
    fontSize: 11,
  },
  pageBody: {
    padding: 48,
    flex: 1,
  },
  pageFooter: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: C.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageFooterText: {
    color: '#BCBAB6',
    fontSize: 10,
  },
  // Section titles
  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: C.dark,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: C.gray,
    marginBottom: 24,
    lineHeight: 1.5,
  },
  divider: {
    height: 3,
    backgroundColor: C.red,
    width: 40,
    marginBottom: 20,
    borderRadius: 2,
  },
  // Dimension bars
  dimRow: {
    marginBottom: 16,
  },
  dimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dimName: {
    fontSize: 12,
    fontWeight: 600,
    color: C.dark,
  },
  dimScore: {
    fontSize: 12,
    fontWeight: 700,
    color: C.red,
  },
  dimTrack: {
    height: 8,
    backgroundColor: C.lightGray,
    borderRadius: 4,
  },
  dimFill: {
    height: 8,
    borderRadius: 4,
  },
  // Strengths/risks cards
  cardsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 12,
  },
  cardItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  cardDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
    flexShrink: 0,
  },
  cardItemText: {
    fontSize: 11,
    color: C.dark,
    lineHeight: 1.5,
    flex: 1,
  },
  // Interpretation block
  interpretationBox: {
    backgroundColor: C.cream,
    borderRadius: 12,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: C.red,
    marginBottom: 24,
  },
  interpretationText: {
    fontSize: 12,
    color: C.dark,
    lineHeight: 1.7,
  },
  // Recommendations
  recCard: {
    backgroundColor: C.cream,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 14,
  },
  recNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: C.red,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  recNumberText: {
    color: C.white,
    fontSize: 12,
    fontWeight: 700,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: C.dark,
    marginBottom: 4,
  },
  recDesc: {
    fontSize: 11,
    color: C.gray,
    lineHeight: 1.5,
  },
  // Action plan
  weekBlock: {
    marginBottom: 20,
  },
  weekHeader: {
    backgroundColor: C.dark,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekTitle: {
    color: C.white,
    fontSize: 12,
    fontWeight: 700,
  },
  weekTheme: {
    color: '#A8A5A0',
    fontSize: 11,
  },
  actionItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
    paddingLeft: 8,
  },
  actionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.red,
    marginTop: 4,
    flexShrink: 0,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: C.dark,
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 10,
    color: C.gray,
    lineHeight: 1.4,
  },
  actionDuration: {
    fontSize: 9,
    color: C.red,
    fontWeight: 600,
    marginTop: 2,
  },
  // Resources
  resourceItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: C.lightGray,
    borderRadius: 8,
  },
  resourceType: {
    fontSize: 9,
    fontWeight: 700,
    color: C.white,
    backgroundColor: C.gray,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  resourceTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: C.dark,
    marginBottom: 3,
  },
  resourceDesc: {
    fontSize: 10,
    color: C.gray,
    lineHeight: 1.4,
  },
});

export interface ReportData {
  locale: 'fr' | 'en';
  firstName?: string;
  globalScore: number;
  scores: Record<string, number>;
  interpretation: string;
  recommendations: Array<{ title: string; description: string; dimension: string }>;
  actionPlan: Array<{ week: number; theme: string; actions: Array<{ title: string; description: string; duration: string }> }>;
  offerType: 'standard' | 'premium';
  generatedAt: string;
}

function getScoreColor(score: number): string {
  if (score >= 70) return C.green;
  if (score >= 45) return C.orange;
  return C.red;
}

function getScoreLabel(score: number, locale: 'fr' | 'en'): string {
  if (locale === 'fr') {
    if (score >= 80) return 'Excellent';
    if (score >= 65) return 'Bon';
    if (score >= 50) return 'Passable';
    if (score >= 35) return 'À travailler';
    return 'Critique';
  }
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 35) return 'Needs work';
  return 'Critical';
}

const DIMENSION_LABELS: Record<string, Record<string, string>> = {
  communication: { fr: 'Communication', en: 'Communication' },
  trust: { fr: 'Confiance', en: 'Trust' },
  intimacy: { fr: 'Intimité', en: 'Intimacy' },
  conflict: { fr: 'Gestion des conflits', en: 'Conflict Management' },
  forgiveness: { fr: 'Pardon & Résilience', en: 'Forgiveness & Resilience' },
  projects: { fr: 'Projets communs', en: 'Shared Goals' },
  balance: { fr: 'Équilibre individuel', en: 'Individual Balance' },
};

function PageHeader({ title, locale }: { title: string; locale: string }) {
  return (
    <View style={styles.pageHeader}>
      <Text style={styles.pageHeaderBrand}>COUPLECHECK</Text>
      <Text style={styles.pageHeaderTitle}>{title}</Text>
    </View>
  );
}

function PageFooter({ page, total, locale }: { page: number; total: number; locale: string }) {
  return (
    <View style={styles.pageFooter}>
      <Text style={styles.pageFooterText}>couplecheck.app</Text>
      <Text style={styles.pageFooterText}>{page} / {total}</Text>
      <Text style={styles.pageFooterText}>{locale === 'fr' ? 'Confidentiel' : 'Confidential'}</Text>
    </View>
  );
}

export function ReportPDF({ data }: { data: ReportData }) {
  const { locale, firstName, globalScore, scores, interpretation, recommendations, actionPlan } = data;
  const totalPages = 6;
  const scoreLabel = getScoreLabel(globalScore, locale);
  const date = new Date(data.generatedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const strengths = sortedScores.slice(0, 3);
  const risks = sortedScores.slice(-3).reverse();

  // Resources
  const resources = locale === 'fr'
    ? [
        { type: 'LIVRE', title: 'Les 5 langages de l\'amour', desc: 'Gary Chapman — Découvrez comment vous et votre partenaire exprimez l\'amour différemment.', color: C.blue },
        { type: 'LIVRE', title: 'L\'amour est un choix', desc: 'Henry Cloud & John Townsend — Établir des limites saines dans la relation.', color: C.blue },
        { type: 'APP', title: 'Gottman Card Decks', desc: 'Des questions et exercices basés sur la recherche du Dr John Gottman.', color: C.green },
        { type: 'EXERCICE', title: 'Le check-in hebdomadaire', desc: '30 minutes ensemble chaque semaine pour partager vos besoins, vos gratitudes et vos intentions.', color: C.orange },
      ]
    : [
        { type: 'BOOK', title: 'The 5 Love Languages', desc: 'Gary Chapman — Discover how you and your partner express love differently.', color: C.blue },
        { type: 'BOOK', title: 'Hold Me Tight', desc: 'Dr. Sue Johnson — The science of love and emotional bonding.', color: C.blue },
        { type: 'APP', title: 'Gottman Card Decks', desc: 'Questions and exercises based on Dr. John Gottman\'s research.', color: C.green },
        { type: 'EXERCISE', title: 'Weekly Check-In', desc: '30 minutes together each week to share your needs, gratitudes, and intentions.', color: C.orange },
      ];

  return (
    <Document title={`CoupleCheck Report — ${firstName || 'Anonymous'}`} author="CoupleCheck" subject="Relationship Analysis Report">
      {/* PAGE 1: COVER */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <View>
            <View style={styles.coverBadge}>
              <Text style={styles.coverBadgeText}>{locale === 'fr' ? 'RAPPORT PERSONNALISÉ' : 'PERSONALIZED REPORT'}</Text>
            </View>
            <Text style={styles.coverTitle}>
              {locale === 'fr'
                ? `${firstName ? `${firstName},\n` : ''}Votre relation\nanalysée en profondeur`
                : `${firstName ? `${firstName},\n` : ''}Your relationship\nanalyzed in depth`}
            </Text>
            <Text style={styles.coverSubtitle}>
              {locale === 'fr'
                ? '7 dimensions · Plan d\'action 30 jours · Recommandations personnalisées'
                : '7 dimensions · 30-day action plan · Personalized recommendations'}
            </Text>
          </View>

          <View style={styles.coverScoreBox}>
            <View>
              <Text style={styles.coverScoreNumber}>{globalScore}</Text>
            </View>
            <View>
              <Text style={styles.coverScoreLabel}>{scoreLabel}</Text>
              <Text style={styles.coverScoreSub}>
                {locale === 'fr' ? 'sur 100 points' : 'out of 100 points'}
              </Text>
              <Text style={{ ...styles.coverScoreSub, marginTop: 8 }}>
                {locale === 'fr' ? '7 dimensions analysées' : '7 dimensions analyzed'}
              </Text>
            </View>
          </View>

          <View style={styles.coverFooter}>
            <Text style={styles.coverBrand}>COUPLECHECK</Text>
            <Text style={styles.coverDate}>{date}</Text>
          </View>
        </View>
      </Page>

      {/* PAGE 2: SCORES BY DIMENSION */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <PageHeader title={locale === 'fr' ? 'Analyse des 7 dimensions' : '7 Dimensions Analysis'} locale={locale} />
          <View style={styles.pageBody}>
            <Text style={styles.sectionTitle}>{locale === 'fr' ? 'Analyse des 7 dimensions' : 'Analysis of 7 dimensions'}</Text>
            <View style={styles.divider} />
            <Text style={styles.sectionSubtitle}>
              {locale === 'fr'
                ? 'Chaque dimension a été évaluée sur 100 points. Ces scores reflètent votre perception de la relation.'
                : 'Each dimension was scored out of 100. These scores reflect your perception of the relationship.'}
            </Text>

            {Object.entries(scores).map(([key, score]) => (
              <View key={key} style={styles.dimRow}>
                <View style={styles.dimHeader}>
                  <Text style={styles.dimName}>{DIMENSION_LABELS[key]?.[locale] ?? key}</Text>
                  <Text style={{ ...styles.dimScore, color: getScoreColor(score) }}>{score}/100</Text>
                </View>
                <View style={styles.dimTrack}>
                  <View style={{ ...styles.dimFill, width: `${score}%`, backgroundColor: getScoreColor(score) }} />
                </View>
              </View>
            ))}

            {/* Strengths & Risks summary */}
            <View style={{ ...styles.cardsRow, marginTop: 24 }}>
              <View style={{ ...styles.card, backgroundColor: '#F0F7F3' }}>
                <Text style={{ ...styles.cardTitle, color: C.green }}>
                  {locale === 'fr' ? '✓ Points forts' : '✓ Strengths'}
                </Text>
                {strengths.map(([key, score]) => (
                  <View key={key} style={styles.cardItem}>
                    <View style={{ ...styles.cardDot, backgroundColor: C.green }} />
                    <Text style={styles.cardItemText}>
                      {DIMENSION_LABELS[key]?.[locale] ?? key} ({score}/100)
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ ...styles.card, backgroundColor: '#FDF0F0' }}>
                <Text style={{ ...styles.cardTitle, color: C.red }}>
                  {locale === 'fr' ? '⚠ Zones à travailler' : '⚠ Areas to work on'}
                </Text>
                {risks.map(([key, score]) => (
                  <View key={key} style={styles.cardItem}>
                    <View style={{ ...styles.cardDot, backgroundColor: C.red }} />
                    <Text style={styles.cardItemText}>
                      {DIMENSION_LABELS[key]?.[locale] ?? key} ({score}/100)
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <PageFooter page={2} total={totalPages} locale={locale} />
        </View>
      </Page>

      {/* PAGE 3: INTERPRETATION */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <PageHeader title={locale === 'fr' ? 'Interprétation personnalisée' : 'Personalized Interpretation'} locale={locale} />
          <View style={styles.pageBody}>
            <Text style={styles.sectionTitle}>{locale === 'fr' ? 'Ce que révèlent vos résultats' : 'What your results reveal'}</Text>
            <View style={styles.divider} />
            <Text style={styles.sectionSubtitle}>
              {locale === 'fr'
                ? 'Une analyse personnalisée basée sur l\'ensemble de vos réponses.'
                : 'A personalized analysis based on all your answers.'}
            </Text>
            <View style={styles.interpretationBox}>
              <Text style={styles.interpretationText}>{interpretation}</Text>
            </View>

            {/* Score context */}
            <Text style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>
              {locale === 'fr' ? 'Votre score en contexte' : 'Your score in context'}
            </Text>
            {[
              { range: '80-100', label: locale === 'fr' ? 'Relation épanouie' : 'Thriving relationship', desc: locale === 'fr' ? 'Vous avez de solides bases. Continuez à investir dans votre relation.' : 'You have strong foundations. Keep investing in your relationship.' },
              { range: '60-79', label: locale === 'fr' ? 'Relation stable' : 'Stable relationship', desc: locale === 'fr' ? 'De bonnes bases avec des points d\'amélioration identifiables.' : 'Good foundations with identifiable improvement areas.' },
              { range: '40-59', label: locale === 'fr' ? 'Points de friction' : 'Friction points', desc: locale === 'fr' ? 'Certains domaines nécessitent une attention particulière.' : 'Some areas require particular attention.' },
              { range: '0-39', label: locale === 'fr' ? 'À reconstruire' : 'Needs rebuilding', desc: locale === 'fr' ? 'Des changements significatifs sont nécessaires. L\'aide professionnelle peut être bénéfique.' : 'Significant changes are needed. Professional help may be beneficial.' },
            ].map((item) => {
              const [min, max] = item.range.split('-').map(Number);
              const isActive = globalScore >= min && globalScore <= max;
              return (
                <View
                  key={item.range}
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    padding: 12,
                    marginBottom: 6,
                    borderRadius: 8,
                    backgroundColor: isActive ? C.cream : 'transparent',
                    ...(isActive ? { borderWidth: 1, borderColor: C.red } : {}),
                  }}
                >
                  <Text style={{ fontSize: 11, fontWeight: 700, color: isActive ? C.red : C.gray, width: 50 }}>
                    {item.range}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 11, fontWeight: 700, color: isActive ? C.dark : C.gray }}>{item.label}</Text>
                    <Text style={{ fontSize: 10, color: C.gray, lineHeight: 1.4, marginTop: 2 }}>{item.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <PageFooter page={3} total={totalPages} locale={locale} />
        </View>
      </Page>

      {/* PAGE 4: RECOMMENDATIONS */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <PageHeader title={locale === 'fr' ? 'Recommandations' : 'Recommendations'} locale={locale} />
          <View style={styles.pageBody}>
            <Text style={styles.sectionTitle}>{locale === 'fr' ? '5 recommandations clés' : '5 key recommendations'}</Text>
            <View style={styles.divider} />
            <Text style={styles.sectionSubtitle}>
              {locale === 'fr'
                ? 'Des actions concrètes pour transformer les points identifiés en améliorations durables.'
                : 'Concrete actions to turn identified points into lasting improvements.'}
            </Text>
            {recommendations.map((rec, i) => (
              <View key={i} style={styles.recCard}>
                <View style={styles.recNumber}>
                  <Text style={styles.recNumberText}>{i + 1}</Text>
                </View>
                <View style={styles.recContent}>
                  <Text style={styles.recTitle}>{rec.title}</Text>
                  <Text style={styles.recDesc}>{rec.description}</Text>
                </View>
              </View>
            ))}
          </View>
          <PageFooter page={4} total={totalPages} locale={locale} />
        </View>
      </Page>

      {/* PAGE 5: ACTION PLAN */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <PageHeader title={locale === 'fr' ? 'Plan d\'action 30 jours' : '30-Day Action Plan'} locale={locale} />
          <View style={styles.pageBody}>
            <Text style={styles.sectionTitle}>{locale === 'fr' ? 'Votre plan d\'action 30 jours' : 'Your 30-day action plan'}</Text>
            <View style={styles.divider} />
            <Text style={styles.sectionSubtitle}>
              {locale === 'fr'
                ? 'Des actions concrètes, semaine par semaine, pour transformer votre relation.'
                : 'Concrete actions, week by week, to transform your relationship.'}
            </Text>
            {actionPlan.map((week) => (
              <View key={week.week} style={styles.weekBlock}>
                <View style={styles.weekHeader}>
                  <Text style={styles.weekTitle}>{locale === 'fr' ? `Semaine ${week.week}` : `Week ${week.week}`}</Text>
                  <Text style={styles.weekTheme}>{week.theme}</Text>
                </View>
                {week.actions.map((action, i) => (
                  <View key={i} style={styles.actionItem}>
                    <View style={styles.actionBullet} />
                    <View style={styles.actionContent}>
                      <Text style={styles.actionTitle}>{action.title}</Text>
                      <Text style={styles.actionDesc}>{action.description}</Text>
                      <Text style={styles.actionDuration}>{action.duration}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <PageFooter page={5} total={totalPages} locale={locale} />
        </View>
      </Page>

      {/* PAGE 6: RESOURCES + CLOSING */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contentPage}>
          <PageHeader title={locale === 'fr' ? 'Ressources recommandées' : 'Recommended Resources'} locale={locale} />
          <View style={styles.pageBody}>
            <Text style={styles.sectionTitle}>{locale === 'fr' ? 'Ressources recommandées' : 'Recommended resources'}</Text>
            <View style={styles.divider} />
            <Text style={styles.sectionSubtitle}>
              {locale === 'fr'
                ? 'Livres, outils et exercices sélectionnés pour approfondir votre travail.'
                : 'Books, tools and exercises selected to deepen your work.'}
            </Text>
            {resources.map((res, i) => (
              <View key={i} style={styles.resourceItem}>
                <View>
                  <Text style={{ ...styles.resourceType, backgroundColor: res.color }}>{res.type}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resourceTitle}>{res.title}</Text>
                  <Text style={styles.resourceDesc}>{res.desc}</Text>
                </View>
              </View>
            ))}

            {/* Closing message */}
            <View style={{ ...styles.interpretationBox, marginTop: 24, backgroundColor: C.dark }}>
              <Text style={{ ...styles.interpretationText, color: C.white }}>
                {locale === 'fr'
                  ? `Ce rapport est le point de départ de votre transformation. Chaque relation peut s'améliorer avec de l'attention, de la bienveillance et les bons outils. Vous avez fait le premier pas en prenant conscience de votre situation. Maintenant, passez à l'action.`
                  : `This report is the starting point of your transformation. Every relationship can improve with attention, kindness, and the right tools. You've taken the first step by becoming aware of your situation. Now, take action.`}
              </Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: 700, color: C.red }}>COUPLECHECK</Text>
              <Text style={{ fontSize: 10, color: C.gray, marginTop: 4 }}>couplecheck.app</Text>
              <Text style={{ fontSize: 9, color: C.lightGray, marginTop: 8 }}>
                {locale === 'fr' ? '© 2026 CoupleCheck. Rapport confidentiel.' : '© 2026 CoupleCheck. Confidential report.'}
              </Text>
            </View>
          </View>
          <PageFooter page={6} total={totalPages} locale={locale} />
        </View>
      </Page>
    </Document>
  );
}
