import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokegalg - Pokémon Galgje met Imre',
  description: 'Een interactief galgje-spel met Pokémon-thema dat het belang van effectieve communicatie benadrukt.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        margin: 0,
        padding: '2rem 1rem'
      }}>
        {children}
      </body>
    </html>
  );
} 