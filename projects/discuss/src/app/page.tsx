import { Button } from '@nextui-org/react';
import Profile from '@/components/profile';
import * as actions from '@/actions';
import * as auth from '@/auth';

export default async function Home() {
  const session = await auth.session();

  return (
    <div>
      {session?.user ? (
        <form action={actions.signOut} className="mr-2 md:mr-0">
          <Button type="submit">Sign out</Button>
        </form>
      ) : (
        <form action={actions.githubSignIn} className="mr-2 md:mr-0">
          <Button type="submit">Sign in</Button>
        </form>
      )}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Profile />
    </div>
  );
}
