'use client';

import { userAtom } from '@/lib/atom';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import useSWR from 'swr';

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useAtom(userAtom);

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_FRONT_SERVER_URL}/api/me`);
  setUser(data);
  return <>{children}</>;
}
