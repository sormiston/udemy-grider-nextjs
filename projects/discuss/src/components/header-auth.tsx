'use client';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Button,
  NavbarItem,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import * as actions from '@/actions';

export default function HeaderAuth() {
  const session = useSession();
  const { data: userSession, status: authStatus } = session;

  let authContent: React.ReactNode;
  if (authStatus === 'authenticated' && userSession?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar
            src={userSession.user.image || ''}
            isBordered
            isFocusable
            classNames={{ base: 'cursor-pointer' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else if (authStatus === 'unauthenticated') {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.githubSignIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.githubSignIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  } else {
    authContent = null;
  }

  return authContent;
}
