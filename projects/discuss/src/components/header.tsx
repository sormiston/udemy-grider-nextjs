import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react';
import { auth } from '@/auth';
import * as actions from '@/actions';
import HeaderAuthClient from '@/components/header-auth-client';
import SearchInput from '@/components/search-input';
import paths from '@/paths';

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={paths.home()} className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <SearchInput />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <HeaderAuthClient user={user} />
        ) : (
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
        )}
      </NavbarContent>
    </Navbar>
  );
}
