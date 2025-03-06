import React from 'react';
import Image from 'next/image';

interface EnergyConnectionProps {
  wrongGuesses: number;
  maxWrongGuesses: number;
  gameStatus: 'playing' | 'won' | 'lost';
}

const EnergyConnection: React.FC<EnergyConnectionProps> = ({ 
  wrongGuesses, 
  maxWrongGuesses, 
  gameStatus 
}) => {
  // Bereken de sterkte van de verbinding (0-100%)
  const connectionStrength = Math.max(0, 100 - (wrongGuesses / maxWrongGuesses) * 100);
  
  // Bepaal de kleur van de verbinding op basis van de sterkte
  const getConnectionColor = () => {
    if (gameStatus === 'won') return 'bg-success';
    if (gameStatus === 'lost') return 'bg-error';
    
    if (connectionStrength > 70) return 'bg-success';
    if (connectionStrength > 40) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <div className="w-24 h-24 relative">
          {/* Placeholder voor Imre avatar */}
          <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-white">
            <span className="text-lg font-bold">Imre</span>
          </div>
        </div>
        
        <div className="flex-1 mx-4 relative h-8">
          {/* Energieverbinding */}
          <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
          <div 
            className={`absolute inset-0 ${getConnectionColor()} rounded-full transition-all duration-500`}
            style={{ width: `${connectionStrength}%` }}
          ></div>
          
          {/* Energiebolletjes */}
          <div className="absolute inset-0 flex justify-around items-center">
            {Array.from({ length: maxWrongGuesses }).map((_, index) => (
              <div 
                key={index}
                className={`
                  w-4 h-4 rounded-full 
                  ${index < wrongGuesses ? 'bg-gray-400' : 'bg-yellow-300'} 
                  transition-all duration-300
                  ${gameStatus === 'won' ? 'animate-pulse-slow' : ''}
                `}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="w-24 h-24 relative">
          {/* Placeholder voor Pikachu */}
          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
            <span className="text-lg font-bold">Pikachu</span>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium">
          {gameStatus === 'playing' && (
            connectionStrength > 70 
              ? "De verbinding is sterk!" 
              : connectionStrength > 40 
                ? "De verbinding verzwakt..." 
                : "De verbinding staat op het punt te breken!"
          )}
          {gameStatus === 'won' && "Perfecte communicatie bereikt!"}
          {gameStatus === 'lost' && "De verbinding is verbroken, maar kan hersteld worden!"}
        </p>
      </div>
    </div>
  );
};

export default EnergyConnection; 