import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Logg inn',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Logg inn</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Velkommen tilbake til Rettesteg
        </p>
      </div>
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground mt-6">
        Har du ikke konto?{' '}
        <Link href="/registrer" className="text-primary font-medium hover:underline">
          Registrer deg gratis
        </Link>
      </p>
    </div>
  );
}
