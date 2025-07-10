'use client';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  if (session?.user) {
    return <div>From Client: user is signed in </div>;
  }

  return <div>From Client: user is NOT signed in</div>;
}
