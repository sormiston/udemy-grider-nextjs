'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term') || '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    actions.searchFormRedirect(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="term" defaultValue={searchTerm} />
    </form>
  );
}
