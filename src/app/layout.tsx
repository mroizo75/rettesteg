import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rettesteg — Ta det rette steget mot fremtiden din',
  description: 'Gratis karriereveiledning for norsk ungdom. Finn yrket og utdanningen som passer deg basert på vitenskapelige tester.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
