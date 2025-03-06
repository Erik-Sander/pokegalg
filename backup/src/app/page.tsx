'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const themes = [
    {
      id: 'space',
      name: 'Ruimte Academie',
      description: 'Ontdek de communicatie in de oneindige ruimte',
      image: '/themes/space-theme.svg',
      bgColor: 'bg-blue-100',
    },
    {
      id: 'garden',
      name: 'Botanische Tuin',
      description: 'Laat je communicatie bloeien tussen de planten',
      image: '/themes/garden-theme.svg',
      bgColor: 'bg-green-100',
    },
    {
      id: 'chess',
      name: 'Schaak Arena',
      description: 'Strategische communicatie op het schaakbord',
      image: '/themes/chess-theme.svg',
      bgColor: 'bg-gray-100',
    },
  ];

  return (
    <main className="container-game flex min-h-screen flex-col items-center justify-center py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-2">Pokegalg</h1>
      <h2 className="text-2xl text-center mb-8">Pokémon Galgje met Imre</h2>
      
      <div className="max-w-2xl mx-auto text-center mb-8">
        <p className="text-lg mb-4">
          Welkom bij Pokegalg! Een vriendelijke versie van galgje met Pokémon-thema, 
          waarin Imre als trainer probeert te communiceren met Pikachu.
        </p>
        <p>
          Bij foute letters raakt de verbinding verstoord - een subtiele verwijzing 
          naar het belang van effectieve communicatie in Imre's werk.
        </p>
      </div>

      <div className="w-full max-w-4xl mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Kies een thema:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <div 
              key={theme.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all shadow-sm hover:shadow-md ${
                selectedTheme === theme.id 
                  ? 'border-primary border-2 bg-primary bg-opacity-10' 
                  : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => setSelectedTheme(theme.id)}
            >
              <div className={`h-40 relative mb-3 rounded-md overflow-hidden ${theme.bgColor}`}>
                {/* Fallback voor als de SVG niet laadt */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-medium">{theme.name}</span>
                </div>
                <Image 
                  src={theme.image} 
                  alt={theme.name} 
                  fill 
                  className="object-contain p-4 z-10" 
                  onError={(e) => {
                    // Verberg de afbeelding als deze niet kan worden geladen
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <h4 className="font-semibold text-lg">{theme.name}</h4>
              <p className="text-sm text-gray-600">{theme.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link 
          href={selectedTheme ? `/game/${selectedTheme}` : '#'} 
          className={`btn ${selectedTheme ? 'btn-primary' : 'bg-gray-300 cursor-not-allowed'} px-8 py-3 text-lg`}
          onClick={(e) => !selectedTheme && e.preventDefault()}
        >
          Start het spel
        </Link>
      </div>
    </main>
  );
} 