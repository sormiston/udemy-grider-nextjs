'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term') || '';

  return (
    <form action={actions.searchFormRedirect}>
      <Input name="term" defaultValue={searchTerm} />
    </form>
  );
}
