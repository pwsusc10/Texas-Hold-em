import { SocketProvider } from '@/context/SocketContext';
import UserProvider from '@/context/UserProvider';
import React, { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <UserProvider>
      <SocketProvider>{children}</SocketProvider>;
    </UserProvider>
  );
}
