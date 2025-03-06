interface ThemeDetails {
  id: string;
  name: string;
  description: string;
  bgClass: string;
  accentColor: string;
}

const themes: Record<string, ThemeDetails> = {
  space: {
    id: 'space',
    name: 'Ruimte Academie',
    description: 'Ontdek de communicatie in de oneindige ruimte',
    bgClass: 'bg-gradient-to-b from-blue-900 to-purple-900 text-white',
    accentColor: 'secondary'
  },
  garden: {
    id: 'garden',
    name: 'Botanische Tuin',
    description: 'Laat je communicatie bloeien tussen de planten',
    bgClass: 'bg-gradient-to-b from-green-100 to-green-300',
    accentColor: 'success'
  },
  chess: {
    id: 'chess',
    name: 'Schaak Arena',
    description: 'Strategische communicatie op het schaakbord',
    bgClass: 'bg-gradient-to-b from-gray-100 to-gray-300 bg-[url("/chess-pattern.png")]',
    accentColor: 'accent'
  }
};

/**
 * Haalt de details op voor een specifiek thema
 * @param themeId De ID van het thema
 * @returns De details van het thema
 */
export const getThemeDetails = (themeId: string): ThemeDetails => {
  // Controleer of het thema bestaat, anders gebruik het ruimte thema als fallback
  return themes[themeId] || themes.space;
}; 