'use client';

import React, { useEffect, useState } from 'react';
import GameTable from './GameTable';
import { useSocket } from '@/context/SocketContext';
import PlayTable from './PlayTable';
import { GamePlayType } from '@/model';

type Props = {
  roomId: string;
};

export default function RoomContainer({ roomId }: Props) {
  const [room, setRoom] = useState<GamePlayType>();
  const socket = useSocket();
  const [isSeat, setIsSeat] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) return;

    socket.on('byIn', ({ room }: { room: GamePlayType }) => {
      setRoom(room);
      setIsSeat(true);
    });

    socket.on('joinRoom', ({ room }) => {
      setRoom(room);
    });

    // Clean up: 이벤트 리스너 제거
    return () => {
      socket.off('byIn');
      socket.off('joinRoom');
    };
  }, [socket, room]);

  useEffect(() => {
    if (socket) {
      // socket이 초기화된 이후에만 실행
      socket.emit('joinRoom', { roomId });
    }
  }, [socket]);

  if (!room || !socket) return <div className="mx-auto my-auto text-3xl">loading...</div>;

  return (
    <div className="mx-auto mt-[5rem]">{isSeat ? <PlayTable room={room} /> : <GameTable socket={socket} roomId={roomId} room={room} setRoom={setRoom} />}</div>
  );
}
