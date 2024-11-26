'use client';

import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | undefined>(undefined);

export function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_GAME_SERVER_URL as string, {
      reconnection: true, // 재연결을 시도하도록 설정
      reconnectionAttempts: 5, // 최대 재연결 시도 횟수
      reconnectionDelay: 1000 // 재연결 시도 간 지연 시간 (밀리초)
    });
    setSocket(newSocket);

    return () => {
      console.log('disconnect');
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
