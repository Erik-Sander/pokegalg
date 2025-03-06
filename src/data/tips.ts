type TipType = 'success' | 'failure' | 'reflection';

interface TipCollection {
  success: string[];
  failure: string[];
  reflection: string[];
}

// Verzameling van tips en reflectievragen
const tips: TipCollection = {
  // Tips bij succes (wanneer het woord geraden is)
  success: [
    "Geweldig! Effectieve communicatie leidt tot succes, net zoals in je professionele leven.",
    "Uitstekend! Je hebt de verbinding met Pikachu versterkt door goed te communiceren.",
    "Fantastisch! Duidelijke communicatie is de sleutel tot begrip en verbinding.",
    "Bravo! Je hebt laten zien dat je goed kunt communiceren, zelfs met Pokémon!",
    "Indrukwekkend! Goede communicatie overbrugt alle verschillen, zelfs tussen mensen en Pokémon.",
    "Gefeliciteerd! Je communicatievaardigheden hebben geleid tot een sterke verbinding.",
    "Geweldig gedaan! Effectieve communicatie is een krachtig instrument voor succes.",
    "Uitstekend werk! Je hebt laten zien dat je de taal van verbinding spreekt.",
    "Fantastisch resultaat! Communicatie is de brug tussen jou en anderen.",
    "Bravo! Je hebt de kunst van het communiceren onder de knie!"
  ],
  
  // Tips bij falen (wanneer het woord niet geraden is)
  failure: [
    "Geen zorgen! Communicatie is een voortdurend leerproces. Probeer het opnieuw!",
    "De verbinding is verbroken, maar dat is oké. Elke miscommunicatie is een kans om te groeien.",
    "Niet getreurd! Zelfs de beste communicatoren maken fouten. Wat neem je hiervan mee?",
    "Communicatie kan soms mislukken, maar dat betekent niet dat je opgeeft. Probeer het opnieuw!",
    "Elke onderbroken verbinding is een kans om te leren hoe je het de volgende keer beter kunt doen.",
    "Soms is het moeilijk om de juiste woorden te vinden. Dat is deel van het leerproces.",
    "Communicatie is niet altijd gemakkelijk, maar oefening baart kunst!",
    "Zelfs als de verbinding verbroken is, kun je altijd opnieuw beginnen en het sterker maken.",
    "Leren communiceren is als leren fietsen - soms val je, maar je staat altijd weer op.",
    "Elke miscommunicatie is een stap dichter bij betere communicatie in de toekomst."
  ],
  
  // Reflectievragen (bij foute letters)
  reflection: [
    "Hoe zou je deze situatie anders kunnen benaderen?",
    "Welk patroon herken je in je communicatiestijl?",
    "Wat zou een andere manier kunnen zijn om je boodschap over te brengen?",
    "Hoe zou je kunnen controleren of je boodschap goed is overgekomen?",
    "Welke aannames maak je mogelijk in je communicatie?",
    "Hoe zou je kunnen luisteren om beter te begrijpen?",
    "Wat zou je kunnen doen om de verbinding te versterken?",
    "Hoe kun je je communicatie aanpassen aan verschillende situaties?",
    "Welke non-verbale signalen spelen een rol in je communicatie?",
    "Hoe kun je empathie tonen in je communicatie?",
    "Wat zou je kunnen doen om miscommunicatie te voorkomen?",
    "Hoe ga je om met feedback op je communicatiestijl?",
    "Welke rol speelt luisteren in effectieve communicatie?",
    "Hoe kun je je boodschap duidelijker maken?",
    "Wat is het verschil tussen horen en luisteren in communicatie?"
  ]
};

/**
 * Haalt een willekeurige tip op van het gegeven type
 * @param type Het type tip dat opgehaald moet worden
 * @returns Een willekeurige tip van het gegeven type
 */
export const getRandomTip = (type: TipType): string => {
  const tipList = tips[type];
  const randomIndex = Math.floor(Math.random() * tipList.length);
  return tipList[randomIndex];
}; 