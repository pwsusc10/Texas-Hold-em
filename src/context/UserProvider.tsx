'use client';

import { userAtom } from '@/lib/atom';
import { useSetAtom } from 'jotai';
import React, { PropsWithChildren, useEffect, memo } from 'react';
import useSWR from 'swr';

function UserProviderComponent({ children }: PropsWithChildren) {
  const setUser = useSetAtom(userAtom);
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_FRONT_SERVER_URL}/api/me`);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return <>{children}</>;
}

export default memo(UserProviderComponent);
