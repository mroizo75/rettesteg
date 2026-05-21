import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rettesteg — Ta det rette steget mot fremtiden din',
  description: 'Gratis karriereveiledning for norsk ungdom. Finn yrket og utdanningen som passer deg basert på vitenskapelige tester.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
