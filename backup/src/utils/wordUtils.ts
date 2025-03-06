// Woordenlijsten per thema
const wordLists: Record<string, string[]> = {
  space: [
    'RAKET', 'PLANEET', 'ASTRONAUT', 'MELKWEG', 'KOMEET', 
    'TELESCOOP', 'SATELLIET', 'ZWAARTEKRACHT', 'RUIMTESTATION', 'STERRENSTELSEL',
    'PIKACHU', 'CHARIZARD', 'BULBASAUR', 'SQUIRTLE', 'EEVEE',
    'COMMUNICATIE', 'LUISTEREN', 'FEEDBACK', 'DIALOOG', 'BEGRIP'
  ],
  garden: [
    'BLOEM', 'PLANT', 'TUINIEREN', 'ZAAILING', 'COMPOST',
    'BIODIVERSITEIT', 'BESTUIVING', 'FOTOSYNTHESE', 'ECOSYSTEEM', 'DUURZAAMHEID',
    'JIGGLYPUFF', 'MEOWTH', 'SNORLAX', 'PSYDUCK', 'GENGAR',
    'EMPATHIE', 'VERBINDING', 'SAMENWERKING', 'REFLECTIE', 'GROEI'
  ],
  chess: [
    'KONING', 'KONINGIN', 'TOREN', 'LOPER', 'PAARD',
    'STRATEGIE', 'TACTIEK', 'SCHAAKMAT', 'OPENING', 'EINDSPEL',
    'MEWTWO', 'DRAGONITE', 'GYARADOS', 'ALAKAZAM', 'MACHAMP',
    'LEIDERSCHAP', 'VISIE', 'BESLUITVORMING', 'ANALYSE', 'PERSPECTIEF'
  ]
};

// Algemene woordenlijst (gebruikt als fallback)
const generalWords = [
  'PIKACHU', 'CHARIZARD', 'BULBASAUR', 'SQUIRTLE', 'JIGGLYPUFF',
  'MEOWTH', 'PSYDUCK', 'EEVEE', 'SNORLAX', 'GENGAR',
  'MEWTWO', 'DRAGONITE', 'GYARADOS', 'ALAKAZAM', 'MACHAMP',
  'COMMUNICATIE', 'LUISTEREN', 'FEEDBACK', 'DIALOOG', 'BEGRIP',
  'EMPATHIE', 'VERBINDING', 'SAMENWERKING', 'REFLECTIE', 'GROEI'
];

/**
 * Haalt een willekeurig woord op uit de woordenlijst voor het gegeven thema
 * @param theme Het thema waarvoor een woord moet worden opgehaald
 * @returns Een willekeurig woord uit de woordenlijst
 */
export const getRandomWord = (theme: string): string => {
  // Controleer of het thema bestaat in de woordenlijsten
  const words = wordLists[theme] || generalWords;
  
  // Kies een willekeurig woord uit de lijst
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}; 