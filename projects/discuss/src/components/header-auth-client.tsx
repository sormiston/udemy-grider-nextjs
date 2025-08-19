'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Button,
} from '@nextui-org/react';
import * as actions from '@/actions';

type Props = {
  user: {
    image?: string | null;
  };
};

export default function HeaderAuthClient({ user }: Props) {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar
          src={user?.image || ''}
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
}
