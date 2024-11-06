'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | undefined>(undefined);

export function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_GAME_SERVER_URL as string);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
