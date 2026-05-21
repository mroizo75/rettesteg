import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
  title: 'Registrer deg',
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Opprett konto</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Gratis — ingen kredittkort nødvendig
        </p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-muted-foreground mt-6">
        Har du allerede konto?{' '}
        <Link href="/logg-inn" className="text-primary font-medium hover:underline">
          Logg inn
        </Link>
      </p>
    </div>
  );
}
