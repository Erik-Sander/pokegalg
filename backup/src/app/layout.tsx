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
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
} 