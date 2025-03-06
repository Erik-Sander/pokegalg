import React from 'react';

interface KeyboardProps {
  guessedLetters: string[];
  wrongLetters: string[];
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

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

  const getKeyClass = (letter: string) => {
    if (guessedLetters.includes(letter)) {
      return wrongLetters.includes(letter) 
        ? 'bg-error text-white' 
        : 'bg-success text-white';
    }
    return 'bg-gray-200 hover:bg-gray-300';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-1">
          {row.map(letter => (
            <button
              key={letter}
              className={`
                w-8 h-10 md:w-10 md:h-12
                flex items-center justify-center
                rounded font-medium
                transition-colors
                ${getKeyClass(letter)}
                ${disabled || guessedLetters.includes(letter) ? 'cursor-default' : 'cursor-pointer'}
              `}
              onClick={() => !disabled && !guessedLetters.includes(letter) && onLetterClick(letter)}
              disabled={disabled || guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard; 