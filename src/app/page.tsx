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
      bgColor: '#E6F0FF', // lichtblauw
      borderColor: '#3B82F6', // blauw-500
      svg: '/themes/space-theme.svg',
    },
    {
      id: 'garden',
      name: 'Botanische Tuin',
      description: 'Laat je communicatie bloeien tussen de planten',
      bgColor: '#DCFCE7', // lichtgroen
      borderColor: '#22C55E', // groen-500
      svg: '/themes/garden-theme.svg',
    },
    {
      id: 'chess',
      name: 'Schaak Arena',
      description: 'Strategische communicatie op het schaakbord',
      bgColor: '#F3F4F6', // lichtgrijs
      borderColor: '#6B7280', // grijs-500
      svg: '/themes/chess-theme.svg',
    },
  ];

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1000px', 
      margin: '0 auto', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: '0.5rem' 
      }}>
        Pokegalg
      </h1>
      <h2 style={{ 
        fontSize: '1.8rem', 
        textAlign: 'center', 
        marginBottom: '2rem' 
      }}>
        Pokémon Galgje met Imre
      </h2>
      
      <div style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Welkom bij Pokegalg! Een vriendelijke versie van galgje met Pokémon-thema, 
          waarin Imre als trainer probeert te communiceren met Pikachu.
        </p>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', marginBottom: '1.5rem' }}>
        Kies een thema:
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {themes.map((theme) => (
          <div 
            key={theme.id}
            style={{ 
              border: `2px solid ${selectedTheme === theme.id ? theme.borderColor : '#E5E7EB'}`,
              borderRadius: '0.5rem',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              transform: selectedTheme === theme.id ? 'scale(1.03)' : 'scale(1)',
              boxShadow: selectedTheme === theme.id ? '0 10px 15px rgba(0,0,0,0.1)' : 'none'
            }}
            onClick={() => setSelectedTheme(theme.id)}
          >
            <div style={{ 
              backgroundColor: theme.bgColor,
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2,
                backgroundImage: `url(${theme.svg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 1
              }}></div>
              <span style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: '#1F2937', // grijs-800
                position: 'relative',
                zIndex: 2,
                textShadow: '0 1px 2px rgba(255,255,255,0.7)'
              }}>
                {theme.name}
              </span>
            </div>
            
            <div style={{ padding: '1rem' }}>
              <p style={{ color: '#4B5563' }}>{theme.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link 
          href={selectedTheme ? `/game/${selectedTheme}` : '#'} 
          onClick={(e) => !selectedTheme && e.preventDefault()}
          style={{ 
            display: 'inline-block',
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '500',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            backgroundColor: selectedTheme ? '#3B82F6' : '#D1D5DB',
            color: selectedTheme ? 'white' : '#6B7280',
            cursor: selectedTheme ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.15s ease-in-out'
          }}
        >
          Start het spel
        </Link>
      </div>
    </div>
  );
} 