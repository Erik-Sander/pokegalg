import React from 'react';

interface GameBoardProps {
  word: string;
  guessedLetters: string[];
  gameStatus: 'playing' | 'won' | 'lost';
}

const GameBoard: React.FC<GameBoardProps> = ({ word, guessedLetters, gameStatus }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {word.split('').map((letter, index) => {
          const isGuessed = guessedLetters.includes(letter);
          const showLetter = isGuessed || gameStatus === 'lost';
          
          return (
            <div 
              key={`${letter}-${index}`}
              className={`
                w-12 h-12 md:w-16 md:h-16 
                flex items-center justify-center 
                border-b-4 border-secondary 
                text-2xl md:text-3xl font-bold
                ${showLetter ? 'text-black' : 'text-transparent'}
                ${gameStatus === 'won' ? 'bg-primary bg-opacity-20' : ''}
              `}
            >
              {showLetter ? letter : '_'}
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-lg">
          {gameStatus === 'playing' && `Raad het woord: ${word.length} letters`}
        </p>
      </div>
    </div>
  );
};

export default GameBoard; 