'use server';

import { redirect } from 'next/navigation';
import paths from '@/paths';

export async function searchFormRedirect(formData: FormData) {
  const term = formData.get('term');

  if (typeof term !== 'string' || !term) {
    redirect(paths.home());
  }

  redirect(paths.search(term));
}
