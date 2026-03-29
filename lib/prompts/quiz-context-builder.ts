/**
 * Maps raw quiz answers (Q5-Q19) to human-readable text for LLM prompts.
 * Produces a structured narrative that the LLM can reason over concretely.
 */

interface AnswerMap {
  questionText: string;
  answerText: string;
  dimension: string;
}

// Question text + answer options, keyed by questionId
// Stored inline to avoid importing the full Next.js config in Node API routes
const QUESTIONS_FR: Record<string, { text: string; dimension: string; options: Record<string, string> }> = {
  Q5:  { text: "Quand quelque chose te tracasse, tu arrives à en parler à ton/ta partenaire ?",                           dimension: "Communication",      options: { always: "Oui, facilement et sans crainte", most: "La plupart du temps, oui", sometimes: "Ça dépend du sujet", rarely: "Non, je garde souvent pour moi" } },
  Q6:  { text: "Quand tu parles de tes émotions, tu te sens vraiment écouté(e) et compris(e) ?",                          dimension: "Communication",      options: { completely: "Oui, toujours", generally: "Généralement oui", not_really: "Pas toujours, ça dépend", no: "Rarement, j'ai l'impression de parler dans le vide" } },
  Q7:  { text: "Ton/ta partenaire et toi, vous parlez régulièrement de choses importantes pour vous ?",                   dimension: "Communication",      options: { regularly: "Oui, régulièrement et ouvertement", sometimes: "Parfois, mais pas assez", rarely: "Rarement — on reste en surface", never: "Non, on ne se parle presque que du quotidien pratique" } },
  Q8:  { text: "Tu fais confiance à ton/ta partenaire quand il/elle sort sans toi ?",                                     dimension: "Confiance",          options: { totally: "Oui, totalement", most: "Oui, la plupart du temps", doubts: "J'ai parfois des doutes ou des inquiétudes", stressed: "Non, ça me stresse ou me rend anxieux(se)" } },
  Q9:  { text: "Comment décrirais-tu la transparence entre vous ? (téléphone, réseaux, argent, sorties)",                 dimension: "Confiance",          options: { open: "Totale — on n'a rien à se cacher", generally: "Bonne — on partage l'essentiel", gray_areas: "Partielle — il y a des zones d'ombre", opaque: "Faible — beaucoup de choses restent floues" } },
  Q10: { text: "Te sens-tu émotionnellement proche de ton/ta partenaire ?",                                               dimension: "Intimité",           options: { all: "Oui, on partage tout — même nos vulnérabilités", mostly: "Globalement oui, on est connectés", somewhat: "Moyennement — on reste parfois en surface", distant: "Non, je me sens distant(e) ou déconnecté(e)" } },
  Q11: { text: "Es-tu satisfait(e) de votre intimité physique ? (tendresse, sexualité, contact)",                         dimension: "Intimité",           options: { very: "Très satisfait(e)", mostly: "Plutôt satisfait(e)", somewhat: "Moyennement — il y a des frustrations", not_at_all: "Pas du tout satisfait(e)" } },
  Q12: { text: "Quand vous n'êtes pas d'accord, comment ça se passe généralement ?",                                      dimension: "Gestion des conflits", options: { calm: "On discute calmement jusqu'à trouver un terrain d'entente", argue_makeup: "On se dispute mais on finit par se réconcilier", escalates: "Ça dégénère souvent — cris, mots blessants", avoid: "On évite le sujet — rien n'est jamais vraiment résolu" } },
  Q13: { text: "Après une dispute, vous arrivez à en reparler et à vous excuser ?",                                       dimension: "Gestion des conflits", options: { always: "Oui, toujours — on débriefe et on s'excuse sincèrement", most: "La plupart du temps", rarely: "Rarement — on fait comme si de rien n'était", never: "Jamais — les tensions s'accumulent" } },
  Q14: { text: "Quand ton/ta partenaire te blesse (même involontairement), tu arrives à lui pardonner ?",                 dimension: "Pardon & Résilience", options: { yes: "Oui, je pardonne et je passe à autre chose", time: "Oui, mais j'ai besoin de temps", grudge: "Difficilement — je garde rancune un moment", struggle: "Non, j'ai du mal à tourner la page" } },
  Q15: { text: "Y a-t-il des blessures ou des erreurs passées qui affectent encore votre relation aujourd'hui ?",         dimension: "Pardon & Résilience", options: { none: "Non, on a réussi à tout dépasser ensemble", working: "Un peu, mais on travaille dessus", some: "Oui, certains sujets restent douloureux", heavy: "Oui, ça pèse lourdement sur nous" } },
  Q16: { text: "Vous partagez une vision commune de l'avenir ? (enfants, lieu de vie, carrière, style de vie)",           dimension: "Projets communs",    options: { aligned: "Oui, on est totalement alignés", most: "Sur la plupart des sujets, oui", never_talked: "On n'en a jamais vraiment parlé", different: "Non, on veut des choses différentes" } },
  Q17: { text: "Avez-vous des projets concrets que vous construisez ensemble ? (voyages, logement, épargne, famille...)", dimension: "Projets communs",    options: { many: "Oui, plusieurs — on avance main dans la main", one: "Oui, au moins un projet important", not_really: "Pas vraiment — on vit au jour le jour", each_side: "Non, chacun fait ses plans de son côté" } },
  Q18: { text: "Tu as assez d'espace pour tes amis, tes hobbies, ton temps seul(e) ?",                                   dimension: "Équilibre individuel", options: { respect: "Oui, on respecte l'espace de chacun", generally: "Globalement oui", smothered: "Pas assez — je me sens un peu étouffé(e)", overwhelmed: "Non, ma relation prend toute la place" } },
  Q19: { text: "As-tu le sentiment de rester toi-même dans cette relation ?",                                             dimension: "Équilibre individuel", options: { totally: "Oui, totalement — je suis épanoui(e) ET en couple", mostly: "Oui, pour l'essentiel", lost: "Je me suis un peu perdu(e) en chemin", forgotten: "Non, j'ai l'impression de m'être oublié(e)" } },
};

const QUESTIONS_EN: Record<string, { text: string; dimension: string; options: Record<string, string> }> = {
  Q5:  { text: "When something bothers you, are you able to talk about it with your partner?",                            dimension: "Communication",      options: { always: "Yes, easily and without fear", most: "Most of the time, yes", sometimes: "It depends on the topic", rarely: "No, I often keep it to myself" } },
  Q6:  { text: "When you share your emotions, do you feel truly heard and understood?",                                   dimension: "Communication",      options: { completely: "Yes, always", generally: "Generally yes", not_really: "Not always, it depends", no: "Rarely, I feel like I'm talking to a wall" } },
  Q7:  { text: "Do you and your partner regularly talk about things that matter to you?",                                 dimension: "Communication",      options: { regularly: "Yes, regularly and openly", sometimes: "Sometimes, but not enough", rarely: "Rarely — we stay on the surface", never: "No, we mostly only talk about practical day-to-day things" } },
  Q8:  { text: "Do you trust your partner when they go out without you?",                                                 dimension: "Trust",              options: { totally: "Yes, completely", most: "Yes, most of the time", doubts: "I sometimes have doubts or worries", stressed: "No, it stresses me or makes me anxious" } },
  Q9:  { text: "How would you describe the transparency between you? (phone, social media, money, outings)",              dimension: "Trust",              options: { open: "Complete — we have nothing to hide", generally: "Good — we share the essentials", gray_areas: "Partial — there are some gray areas", opaque: "Low — many things remain unclear" } },
  Q10: { text: "Do you feel emotionally close to your partner?",                                                          dimension: "Intimacy",           options: { all: "Yes, we share everything — even our vulnerabilities", mostly: "Generally yes, we're connected", somewhat: "Somewhat — we sometimes stay on the surface", distant: "No, I feel distant or disconnected" } },
  Q11: { text: "Are you satisfied with your physical intimacy? (affection, sexuality, touch)",                            dimension: "Intimacy",           options: { very: "Very satisfied", mostly: "Mostly satisfied", somewhat: "Somewhat — there are some frustrations", not_at_all: "Not satisfied at all" } },
  Q12: { text: "When you disagree, how does it usually go?",                                                              dimension: "Conflict Management", options: { calm: "We discuss calmly until we find common ground", argue_makeup: "We argue but eventually make up", escalates: "It often escalates — yelling, hurtful words", avoid: "We avoid the topic — nothing ever gets resolved" } },
  Q13: { text: "After an argument, are you able to talk about it and apologize?",                                         dimension: "Conflict Management", options: { always: "Yes, always — we debrief and sincerely apologize", most: "Most of the time", rarely: "Rarely — we pretend nothing happened", never: "Never — tensions build up" } },
  Q14: { text: "When your partner hurts you (even unintentionally), are you able to forgive them?",                       dimension: "Forgiveness & Resilience", options: { yes: "Yes, I forgive and move on", time: "Yes, but I need time", grudge: "With difficulty — I hold a grudge for a while", struggle: "No, I struggle to let go" } },
  Q15: { text: "Are there past hurts or mistakes that still affect your relationship today?",                             dimension: "Forgiveness & Resilience", options: { none: "No, we've managed to move past everything together", working: "A little, but we're working on it", some: "Yes, some topics remain painful", heavy: "Yes, it weighs heavily on us" } },
  Q16: { text: "Do you share a common vision for the future? (children, living situation, career, lifestyle)",            dimension: "Shared Goals",       options: { aligned: "Yes, we're completely aligned", most: "On most topics, yes", never_talked: "We've never really talked about it", different: "No, we want different things" } },
  Q17: { text: "Do you have concrete projects you're building together? (travel, home, savings, family...)",              dimension: "Shared Goals",       options: { many: "Yes, several — we're moving forward hand in hand", one: "Yes, at least one important project", not_really: "Not really — we live day by day", each_side: "No, each of us makes our own plans" } },
  Q18: { text: "Do you have enough space for your friends, hobbies, and alone time?",                                     dimension: "Individual Balance",  options: { respect: "Yes, we respect each other's space", generally: "Generally yes", smothered: "Not enough — I feel a bit smothered", overwhelmed: "No, my relationship takes up everything" } },
  Q19: { text: "Do you feel like you remain yourself in this relationship?",                                              dimension: "Individual Balance",  options: { totally: "Yes, completely — I'm fulfilled AND in a relationship", mostly: "Yes, for the most part", lost: "I've lost myself a bit along the way", forgotten: "No, I feel like I've forgotten who I am" } },
};

const SEGMENTATION_LABELS_FR: Record<string, Record<string, string>> = {
  age_range:             { "18-24": "18-24 ans", "25-29": "25-29 ans", "30-35": "30-35 ans", "36+": "36 ans ou plus" },
  gender:                { woman: "une femme", man: "un homme", other: "non-binaire/autre" },
  relationship_duration: { "<6m": "moins de 6 mois", "6m-1y": "6 mois à 1 an", "1-2y": "1 à 2 ans", "2-5y": "2 à 5 ans", "5y+": "plus de 5 ans" },
  relationship_status:   { couple: "en couple", married: "marié(e)/pacsé(e)", engaged: "fiancé(e)", complicated: "situation compliquée" },
};

const SEGMENTATION_LABELS_EN: Record<string, Record<string, string>> = {
  age_range:             { "18-24": "18-24 years old", "25-29": "25-29 years old", "30-35": "30-35 years old", "36+": "36 or older" },
  gender:                { woman: "a woman", man: "a man", other: "non-binary/other" },
  relationship_duration: { "<6m": "less than 6 months", "6m-1y": "6 months to 1 year", "1-2y": "1 to 2 years", "2-5y": "2 to 5 years", "5y+": "more than 5 years" },
  relationship_status:   { couple: "in a relationship", married: "married/civil union", engaged: "engaged", complicated: "complicated situation" },
};

export function buildAnswersNarrative(
  rawAnswers: Record<string, unknown>,
  locale: 'fr' | 'en'
): string {
  const questions = locale === 'fr' ? QUESTIONS_FR : QUESTIONS_EN;
  const lines: string[] = [];

  for (const qId of ['Q5','Q6','Q7','Q8','Q9','Q10','Q11','Q12','Q13','Q14','Q15','Q16','Q17','Q18','Q19']) {
    const q = questions[qId];
    const rawAnswer = rawAnswers[qId];
    if (!q || rawAnswer === undefined || rawAnswer === null) continue;

    const answerValue = typeof rawAnswer === 'string' ? rawAnswer : String(rawAnswer);
    const answerText = q.options[answerValue] ?? answerValue;

    lines.push(`[${q.dimension}] ${q.text}\n→ ${answerText}`);
  }

  return lines.join('\n\n');
}

export function buildSegmentationNarrative(
  segmentation: {
    age_range?: string;
    gender?: string;
    relationship_duration?: string;
    relationship_status?: string;
  },
  locale: 'fr' | 'en'
): string {
  const labels = locale === 'fr' ? SEGMENTATION_LABELS_FR : SEGMENTATION_LABELS_EN;
  const parts: string[] = [];

  if (segmentation.gender) {
    const g = labels.gender[segmentation.gender] ?? segmentation.gender;
    parts.push(locale === 'fr' ? `Profil : ${g}` : `Profile: ${g}`);
  }
  if (segmentation.age_range) {
    const a = labels.age_range[segmentation.age_range] ?? segmentation.age_range;
    parts.push(locale === 'fr' ? `Âge : ${a}` : `Age: ${a}`);
  }
  if (segmentation.relationship_duration) {
    const d = labels.relationship_duration[segmentation.relationship_duration] ?? segmentation.relationship_duration;
    parts.push(locale === 'fr' ? `Durée de relation : ${d}` : `Relationship length: ${d}`);
  }
  if (segmentation.relationship_status) {
    const s = labels.relationship_status[segmentation.relationship_status] ?? segmentation.relationship_status;
    parts.push(locale === 'fr' ? `Statut : ${s}` : `Status: ${s}`);
  }

  return parts.join(' · ');
}
