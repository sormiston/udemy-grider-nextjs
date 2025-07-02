'use server';

import * as auth from '@/auth';
import type { OAuthProviderType } from 'next-auth/providers';

function signInWithProvider(provider: OAuthProviderType) {
  return auth.signIn(provider);
}

export async function githubSignIn() {
  return signInWithProvider('github');
}

export async function signOut() {
  return auth.signOut();
}
