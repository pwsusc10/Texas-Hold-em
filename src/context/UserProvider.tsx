'use client';

import { userAtom } from '@/lib/atom';
import { useAtom } from 'jotai';
import React, { PropsWithChildren } from 'react';
import useSWR from 'swr';

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useAtom(userAtom);

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_FRONT_SERVER_URL}/api/me`);
  setUser(data);
  if (!data) return <div className="mx-auto my-auto text-3xl">loading...</div>;
  return <>{children}</>;
}
