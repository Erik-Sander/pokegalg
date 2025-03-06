// Woordenlijsten per thema
const wordLists: Record<string, string[]> = {
  space: [
    'RAKET', 'PLANEET', 'ASTRONAUT', 'MELKWEG', 'KOMEET', 
    'PIKACHU', 'EEVEE', 'MAAN', 'MARS', 'JUPITER'
  ],
  garden: [
    'BLOEM', 'PLANT', 'TUIN', 'BOOM', 'BLAD',
    'JIGGLYPUFF', 'BULBASAUR', 'GRAS', 'ZAAD', 'BIJ'
  ],
  chess: [
    'KONING', 'DAME', 'TOREN', 'LOPER', 'PAARD',
    'MEWTWO', 'PION', 'SCHAAK', 'MAT', 'ZETTEN'
  ]
};

// Algemene woordenlijst (gebruikt als fallback)
const generalWords = [
  'PIKACHU', 'CHARIZARD', 'BULBASAUR', 'SQUIRTLE', 'JIGGLYPUFF',
  'MEOWTH', 'EEVEE', 'MEWTWO', 'POKEMON', 'TRAINER'
];

/**
 * Haalt een willekeurig woord op uit de woordenlijst voor het gegeven thema
 * @param theme Het thema waarvoor een woord moet worden opgehaald
 * @returns Een willekeurig woord uit de woordenlijst
 */
export const getRandomWord = (theme: string): string => {
  // Zorg ervoor dat de functie niet crasht als thema niet bestaat
  if (!theme || !wordLists[theme]) {
    const randomIndex = Math.floor(Math.random() * generalWords.length);
    return generalWords[randomIndex];
  }
  
  // Kies een willekeurig woord uit de lijst
  const words = wordLists[theme];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}; 