'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getRandomWord } from '@/utils/wordUtils';

// TypeScript interfaces voor componenten
interface KeyboardProps {
  guessedLetters: string[];
  wrongLetters: string[];
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

interface GameBoardProps {
  word: string;
  guessedLetters: string[];
  gameStatus: 'playing' | 'won' | 'lost';
}

interface EnergyConnectionProps {
  wrongGuesses: number;
  maxWrongGuesses: number;
  gameStatus: 'playing' | 'won' | 'lost';
}

interface GamePageProps {
  params: {
    theme: string;
  };
}

type TipType = 'success' | 'failure' | 'reflection';

// Eenvoudige component voor het toetsenbord
const Keyboard: React.FC<KeyboardProps> = ({ 
  guessedLetters, 
  wrongLetters, 
  onLetterClick, 
  disabled 
}) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '8px'
    }}>
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: 'flex', gap: '6px' }}>
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter);
            const isWrong = wrongLetters.includes(letter);
            
            // Bepaal stijl van de toets op basis van de status
            let bgColor = '#E5E7EB'; // default grijs
            let textColor = '#1F2937'; // default tekstkleur
            let cursor = 'pointer';
            let scale = '1';
            
            if (isGuessed) {
              if (isWrong) {
                bgColor = '#EF4444'; // rood voor foute letters
                textColor = 'white';
              } else {
                bgColor = '#10B981'; // groen voor goede letters
                textColor = 'white';
              }
              cursor = 'default';
            } else if (disabled) {
              cursor = 'default';
              bgColor = '#F3F4F6'; // lichter grijs als disabled
            } else {
              scale = 'scale(1)';
            }
            
            return (
              <button
                key={letter}
                style={{ 
                  width: '40px', 
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: bgColor,
                  color: textColor,
                  fontWeight: '600',
                  borderRadius: '6px',
                  cursor: cursor,
                  transition: 'all 0.15s ease',
                  border: 'none',
                  transform: scale,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onClick={() => !disabled && !isGuessed && onLetterClick(letter)}
                disabled={disabled || isGuessed}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Component voor het speelbord
const GameBoard: React.FC<GameBoardProps> = ({ 
  word, 
  guessedLetters, 
  gameStatus 
}) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        margin: '0 auto',
        marginBottom: '1.5rem'
      }}>
        {word.split('').map((letter, index) => {
          const isGuessed = guessedLetters.includes(letter);
          const showLetter = isGuessed || gameStatus === 'lost';
          
          return (
            <div 
              key={`${letter}-${index}`}
              style={{ 
                width: '50px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '4px solid #3B82F6',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: showLetter ? '#1F2937' : 'transparent',
                backgroundColor: gameStatus === 'won' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                transition: 'all 0.3s ease',
                transform: isGuessed ? 'translateY(-5px)' : 'translateY(0)',
              }}
            >
              {showLetter ? letter : '_'}
            </div>
          );
        })}
      </div>
      
      {gameStatus === 'playing' && (
        <p style={{ 
          fontSize: '1.1rem', 
          fontWeight: '500',
          color: '#4B5563'
        }}>
          Raad het woord: {word.length} letters
        </p>
      )}
    </div>
  );
};

// Component voor de energieverbinding tussen Imre en Pikachu
const EnergyConnection: React.FC<EnergyConnectionProps> = ({ 
  wrongGuesses, 
  maxWrongGuesses, 
  gameStatus 
}) => {
  const connectionStrength = Math.max(0, 100 - (wrongGuesses / maxWrongGuesses) * 100);
  
  const getStatusColor = (): string => {
    if (gameStatus === 'won') return '#10B981'; // groen
    if (gameStatus === 'lost') return '#EF4444'; // rood
    
    if (connectionStrength > 70) return '#10B981'; // groen
    if (connectionStrength > 40) return '#F59E0B'; // geel/oranje
    return '#EF4444'; // rood
  };

  // Maak energiebolletjes voor visualisatie van foute pogingen
  const renderEnergyDots = () => {
    const dots = [];
    for (let i = 0; i < maxWrongGuesses; i++) {
      const isActive = i >= wrongGuesses;
      dots.push(
        <div 
          key={i}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isActive ? '#FBBF24' : '#9CA3AF',
            transition: 'all 0.3s ease',
            animation: gameStatus === 'won' && isActive ? 'pulse 2s infinite' : 'none',
            zIndex: 2
          }}
        />
      );
    }
    return dots;
  };

  // Animatie style voor pulserend effect
  const pulseKeyframes = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '500px', 
      margin: '0 auto', 
      marginBottom: '2rem',
      position: 'relative'
    }}>
      <style>{pulseKeyframes}</style>
      
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        {/* Imre avatar */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#3B82F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          Imre
        </div>
        
        {/* Pikachu avatar */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#FFD700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          color: '#1F2937',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          Pikachu
        </div>
      </div>
      
      {/* Energiebalk */}
      <div style={{
        position: 'relative',
        height: '20px',
        backgroundColor: '#E5E7EB',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${connectionStrength}%`,
          backgroundColor: getStatusColor(),
          borderRadius: '10px',
          transition: 'width 0.5s ease, background-color 0.5s ease',
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
          backgroundSize: '200% 100%',
          animation: connectionStrength > 0 ? 'shimmer 2s infinite linear' : 'none'
        }}></div>
        
        {/* Energiebolletjes container */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '0 15px'
        }}>
          {renderEnergyDots()}
        </div>
      </div>
      
      {/* Verbindingsstatus tekst */}
      <div style={{
        textAlign: 'center',
        marginTop: '0.75rem',
        fontWeight: '500',
        color: getStatusColor()
      }}>
        {gameStatus === 'playing' && (
          connectionStrength > 70 
            ? "De verbinding is sterk!" 
            : connectionStrength > 40 
              ? "De verbinding verzwakt..." 
              : "De verbinding staat op het punt te breken!"
        )}
        {gameStatus === 'won' && "Perfecte communicatie bereikt!"}
        {gameStatus === 'lost' && "De verbinding is verbroken, maar kan hersteld worden!"}
      </div>
    </div>
  );
};

// Eenvoudige tips voor het spel
const getTip = (type: TipType): string => {
  const tips: Record<TipType, string[]> = {
    success: [
      "Geweldig! Effectieve communicatie leidt tot succes!",
      "Uitstekend! Je hebt de verbinding versterkt door goed te communiceren.",
      "Fantastisch! Je communicatie met Pikachu was perfect!",
      "Bravo! Je hebt bewezen dat je een meesterlijke communicator bent."
    ],
    failure: [
      "Geen zorgen! Communicatie is een voortdurend leerproces.",
      "De verbinding is verbroken, maar elke miscommunicatie is een kans om te groeien.",
      "Niet opgeven! Leren communiceren gaat met vallen en opstaan.",
      "Zelfs de beste trainers maken fouten. Probeer het nog eens!"
    ],
    reflection: [
      "Hoe zou je deze situatie anders kunnen benaderen?",
      "Wat zou een andere manier kunnen zijn om je boodschap over te brengen?",
      "Hoe kun je je communicatiestrategie aanpassen?",
      "Welke signalen heb je mogelijk over het hoofd gezien?",
      "Wat vertelt deze uitdaging je over effectieve communicatie?"
    ]
  };
  
  const tipList = tips[type];
  return tipList[Math.floor(Math.random() * tipList.length)];
};

// Thema details
interface ThemeDetails {
  id: string;
  name: string;
  bgColor: string;
  accentColor: string;
  svg: string;
}

const getThemeDetails = (themeId: string): ThemeDetails => {
  const themes: Record<string, ThemeDetails> = {
    space: {
      id: 'space',
      name: 'Ruimte Academie',
      bgColor: '#E6F0FF', // lichtblauw
      accentColor: '#3B82F6', // blauw-500
      svg: '/themes/space-theme.svg',
    },
    garden: {
      id: 'garden',
      name: 'Botanische Tuin',
      bgColor: '#DCFCE7', // lichtgroen 
      accentColor: '#10B981', // groen-500
      svg: '/themes/garden-theme.svg',
    },
    chess: {
      id: 'chess',
      name: 'Schaak Arena',
      bgColor: '#F3F4F6', // lichtgrijs
      accentColor: '#6B7280', // grijs-500
      svg: '/themes/chess-theme.svg',
    }
  };
  
  return themes[themeId] || themes.space;
};

// Shimmer animatie voor energiebalk
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// Fade-in animatie voor de achtergrond
const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// Game pagina component
export default function GamePage({ params }: GamePageProps): JSX.Element {
  const { theme } = params;
  const themeDetails = getThemeDetails(theme);
  
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [tip, setTip] = useState<string>('');
  
  // Bereken CSS classes en stijlen op basis van state
  const backgroundStyle = {
    backgroundImage: `url(${themeDetails.svg})`,
    backgroundSize: '60%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  // Maximum aantal fouten (6 voor een Pokémon team van 6)
  const MAX_WRONG_GUESSES = 6;
  
  // Initialiseer het spel
  useEffect(() => {
    const newWord = getRandomWord(theme);
    setWord(newWord.toUpperCase());
    setGuessedLetters([]);
    setWrongGuesses([]);
    setGameStatus('playing');
    setTip('');
  }, [theme]);
  
  // Controleer of het woord geraden is
  const wordGuessed = word && word.split('').every(letter => guessedLetters.includes(letter));
  
  // Controleer of het spel verloren is
  const gameLost = wrongGuesses.length >= MAX_WRONG_GUESSES;
  
  // Update game status
  useEffect(() => {
    if (wordGuessed) {
      setGameStatus('won');
      setTip(getTip('success'));
    } else if (gameLost) {
      setGameStatus('lost');
      setTip(getTip('failure'));
    }
  }, [wordGuessed, gameLost]);
  
  // Verwerk een letter die geraden wordt
  const handleGuess = useCallback((letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.includes(letter)) {
      return;
    }
    
    const upperLetter = letter.toUpperCase();
    setGuessedLetters(prev => [...prev, upperLetter]);
    
    if (!word.includes(upperLetter)) {
      setWrongGuesses(prev => [...prev, upperLetter]);
      setTip(getTip('reflection'));
    }
  }, [gameStatus, guessedLetters, word]);
  
  // Verwerk toetsenbordinvoer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.match(/^[a-zA-Z]$/)) {
        handleGuess(e.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess]);
  
  // Start een nieuw spel
  const handleNewGame = () => {
    const newWord = getRandomWord(theme);
    setWord(newWord.toUpperCase());
    setGuessedLetters([]);
    setWrongGuesses([]);
    setGameStatus('playing');
    setTip('');
  };
  
  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${themeDetails.svg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        ${shimmerKeyframes}
        ${fadeInKeyframes}
      `}} />
      
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        <header style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: themeDetails.accentColor
          }}>
            {themeDetails.name}
          </h1>
          
          <Link 
            href="/" 
            style={{ 
              display: 'inline-block',
              padding: '0.5rem 1rem',
              backgroundColor: themeDetails.accentColor,
              color: 'white',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.15s ease'
            }}
          >
            Terug naar thema's
          </Link>
        </header>
        
        <EnergyConnection 
          wrongGuesses={wrongGuesses.length} 
          maxWrongGuesses={MAX_WRONG_GUESSES}
          gameStatus={gameStatus}
        />
        
        <GameBoard 
          word={word} 
          guessedLetters={guessedLetters} 
          gameStatus={gameStatus}
        />
        
        <div style={{ marginBottom: '2rem' }}>
          <Keyboard 
            guessedLetters={guessedLetters} 
            wrongLetters={wrongGuesses}
            onLetterClick={handleGuess}
            disabled={gameStatus !== 'playing'}
          />
        </div>
        
        {tip && (
          <div style={{ 
            backgroundColor: 'rgba(249, 250, 251, 0.8)',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            border: '1px solid #E5E7EB'
          }}>
            <p style={{ 
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: '500',
              color: '#4B5563',
              fontStyle: 'italic'
            }}>
              {tip}
            </p>
          </div>
        )}
        
        {gameStatus !== 'playing' && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '8px'
          }}>
            {gameStatus === 'won' ? (
              <h2 style={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#10B981',
                marginBottom: '1rem'
              }}>
                Gefeliciteerd! Je hebt gewonnen!
              </h2>
            ) : (
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold',
                  color: '#EF4444',
                  marginBottom: '0.5rem'
                }}>
                  Helaas! Je hebt verloren.
                </h2>
                <p style={{ marginBottom: '1rem' }}>
                  Het woord was: <span style={{ fontWeight: 'bold' }}>{word}</span>
                </p>
              </div>
            )}
            
            <button 
              onClick={handleNewGame}
              style={{ 
                padding: '0.75rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '500',
                backgroundColor: themeDetails.accentColor,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'background-color 0.15s ease',
              }}
            >
              Speel opnieuw
            </button>
          </div>
        )}
      </div>
    </div>
  );
}