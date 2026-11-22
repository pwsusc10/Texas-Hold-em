'use client';

import React, { useEffect, useState } from 'react';
import GameTable from './GameTable';
import { useSocket } from '@/context/SocketContext';
import PlayTable from './PlayTable';
import { GamePlayType, SidePotType, UserType } from '@/model';
import RoomOutIcon from '../ui/icons/RoomOutIcon';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atom';

type Props = {
  roomId: string;
};

export default function RoomContainer({ roomId }: Props) {
  const user = useAtomValue(userAtom);
  const [room, setRoom] = useState<GamePlayType>();
  const socket = useSocket();
  const [seat, setSeat] = useState<number>(0);
  const [isSeat, setIsSeat] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      // socket이 초기화된 이후에만 실행
      socket.emit('joinRoom', { roomId, user });
    }
  }, [socket, user, roomId]);

  useEffect(() => {
    if (!socket) return;

    const handlers: Record<string, (payload: any) => void> = {
      error: ({ message }: { message: string }) => alert(message),
      joinRoom: ({ isPlaying, room, seat }: { isPlaying: boolean; room: GamePlayType; seat: number }) => {
        if (isPlaying) {
          setSeat(seat);
          setIsSeat(true);
        }
        setRoom(room);
      },
      byIn: ({ room, newPlayer }: { room: GamePlayType; newPlayer: UserType }) => {
        setRoom(room);
        if (newPlayer.id === user.id) setIsSeat(true);
      },
      smallBlind: ({ room }: { room: GamePlayType }) => {
        setRoom(room);
        if (room.position.sb.player.id === user.id) socket.emit('smallBlind', { roomId, amount: room.blind / 2 });
      },
      bigBlind: ({ room }: { room: GamePlayType }) => {
        setRoom(room);
        if (room.position.bb.player.id === user.id) socket.emit('bigBlind', { roomId, user, amount: room.blind });
      },
      bet: ({ room }: { room: GamePlayType }) => setRoom(room),
      playShowdown: ({ room }: { room: GamePlayType }) => setRoom(room),
      // TODO: board, card open, winner animation 처리
      showWinners: ({ room }: { room: GamePlayType; winners: SidePotType[] }) => setRoom(room),
      endGame: () => socket.emit('joinRoom', { roomId, user })
    };

    for (const [event, handler] of Object.entries(handlers)) socket.on(event, handler);
    return () => {
      for (const [event, handler] of Object.entries(handlers)) socket.off(event, handler);
    };
  }, [socket, roomId, user]);

  if (!room) {
    return <div className="mx-auto my-auto text-3xl">room not found loading... / in game</div>;
  } else if (!socket) {
    return <div className="mx-auto my-auto text-3xl">socket loading... / in game</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-end w-[2rem] m-[1rem] sm:m-[2rem] text-gray hover:scale-110 hover:cursor-pointer">
        <RoomOutIcon roomId={roomId} />
      </div>
      {isSeat ? (
        <PlayTable socket={socket} user={user} room={room} seat={seat} />
      ) : (
        <GameTable socket={socket} user={user} roomId={roomId} room={room} seat={seat} setSeat={setSeat} />
      )}
    </div>
  );
}
