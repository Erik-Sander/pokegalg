'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GameBoard from '@/components/GameBoard';
import Keyboard from '@/components/Keyboard';
import EnergyConnection from '@/components/EnergyConnection';
import { getRandomWord } from '@/utils/wordUtils';
import { getThemeDetails } from '@/utils/themeUtils';
import { getRandomTip } from '@/data/tips';

interface GamePageProps {
  params: {
    theme: string;
  };
}

export default function GamePage({ params }: GamePageProps) {
  const router = useRouter();
  const { theme } = params;
  const themeDetails = getThemeDetails(theme);
  
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [tip, setTip] = useState('');
  
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
  const wordGuessed = word.split('').every(letter => guessedLetters.includes(letter));
  
  // Controleer of het spel verloren is
  const gameLost = wrongGuesses.length >= MAX_WRONG_GUESSES;
  
  // Update game status
  useEffect(() => {
    if (wordGuessed) {
      setGameStatus('won');
      setTip(getRandomTip('success'));
    } else if (gameLost) {
      setGameStatus('lost');
      setTip(getRandomTip('failure'));
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
      // Toon een reflectievraag bij een foute gok
      setTip(getRandomTip('reflection'));
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
    <div className={`min-h-screen ${themeDetails.bgClass}`}>
      <div className="container-game py-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{themeDetails.name}</h1>
          <Link href="/" className="btn btn-secondary">
            Terug naar thema's
          </Link>
        </header>
        
        <div className="mb-8">
          <EnergyConnection 
            wrongGuesses={wrongGuesses.length} 
            maxWrongGuesses={MAX_WRONG_GUESSES}
            gameStatus={gameStatus}
          />
        </div>
        
        <GameBoard 
          word={word} 
          guessedLetters={guessedLetters} 
          gameStatus={gameStatus}
        />
        
        <div className="my-8">
          <Keyboard 
            guessedLetters={guessedLetters} 
            wrongLetters={wrongGuesses}
            onLetterClick={handleGuess}
            disabled={gameStatus !== 'playing'}
          />
        </div>
        
        {tip && (
          <div className="my-6 p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
            <p className="text-lg font-medium text-center">{tip}</p>
          </div>
        )}
        
        {gameStatus !== 'playing' && (
          <div className="text-center mt-8">
            {gameStatus === 'won' ? (
              <h2 className="text-2xl font-bold text-success mb-4">Gefeliciteerd! Je hebt gewonnen!</h2>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-error mb-2">Helaas! Je hebt verloren.</h2>
                <p className="mb-4">Het woord was: <span className="font-bold">{word}</span></p>
              </div>
            )}
            
            <button 
              onClick={handleNewGame}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Speel opnieuw
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 