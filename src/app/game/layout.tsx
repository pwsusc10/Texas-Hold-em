import { SocketProvider } from '@/context/SocketContext';
import React, { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return <SocketProvider>{children}</SocketProvider>;
}
