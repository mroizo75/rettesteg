'use server';

import { redirect } from 'next/navigation';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export async function loginAction(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error || !authData.user) {
    return { error: 'Ugyldig e-post eller passord. Prøv igjen.' };
  }

  const admin = await createAdminClient();
  const { data: profile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();

  if (profile?.role === 'admin') redirect('/admin');
  redirect('/dashboard');
}

export async function registerAction(
  _prevState: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  if (!email || !password || !fullName) {
    return { error: 'Alle felt må fylles ut.' };
  }
  if (password.length < 8) {
    return { error: 'Passordet må være minst 8 tegn.' };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    if (error.code === 'user_already_exists') {
      return { error: 'En konto med denne e-posten finnes allerede.' };
    }
    return { error: 'Registrering feilet. Prøv igjen.' };
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
