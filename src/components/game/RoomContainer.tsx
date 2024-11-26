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

    socket.on('error', ({ message }: { message: string }) => {
      alert(message);
    });

    socket.on('byIn', ({ room, newPlayer }: { room: GamePlayType; newPlayer: UserType }) => {
      console.log('byIn', room);
      setRoom(room);
      if (newPlayer.id === user.id) {
        setIsSeat(true);
      }
    });

    socket.on('joinRoom', ({ isPlaying, room, seat }: { isPlaying: boolean; room: GamePlayType; seat: number }) => {
      console.log('isPlaying', isPlaying, 'seat', seat);
      console.log('joinRoom', room);
      if (isPlaying) {
        setSeat(seat);
        setIsSeat(true);
      }
      setRoom(room);
    });

    // Clean up: 이벤트 리스너 제거
    return () => {
      socket.off('byIn');
      socket.off('joinRoom');
      socket.off('error');
    };
  }, [socket, room]);

  useEffect(() => {
    if (!socket) {
      console.log('socket not found');
      return;
    }
    socket.on('smallBlind', ({ room }: { room: GamePlayType }) => {
      console.log('on smallBlind');
      setRoom(room);
      if (room.position.sb.player.id === user.id) {
        console.log('emit smallBlind userId : ', user.id, user.user_name);
        socket.emit('smallBlind', { roomId, amount: room.blind / 2 });
      }
    });
    socket.on('bigBlind', ({ room }: { room: GamePlayType }) => {
      console.log('on bigBlind, bigBlind : ', room.position.bb.player.user_name);
      setRoom(room);
      if (room.position.bb.player.id === user.id) {
        console.log('emit bigBlind userId : ', user.id, user.user_name);
        socket.emit('bigBlind', { roomId, user, amount: room.blind });
      }
    });
    socket.on('bet', ({ room }: { room: GamePlayType }) => {
      console.log('on bet', room);
      setRoom(room);
    });
    socket.on('endGame', ({ room }: { room: GamePlayType }) => {
      socket.emit('joinRoom', { roomId, user });
      // console.log('on endGame', room);
      // setRoom(room);
    });
    socket.on('playShowdown', ({ room }: { room: GamePlayType }) => {
      console.log('on playShowdown', room);
      setRoom(room);
    });
    // TODO: board, card open, winner animation 처리
    socket.on('showWinners', ({ room, winners }: { room: GamePlayType; winners: SidePotType[] }) => {
      console.log('on showdownWinners : ', winners, 'room : ', room);
      setRoom(room);
    });

    return () => {
      socket.off('smallBlind');
      socket.off('bigBlind');
      socket.off('bet');
      socket.off('endGame');
      socket.off('playShowdown');
      socket.off('showWinners');
    };
  }, []);

  if (!room) {
    return <div className="mx-auto my-auto text-3xl">room not found loading... / in game</div>;
  } else if (!socket) {
    return <div className="mx-auto my-auto text-3xl">socket loading... / in game</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="self-end w-[2rem] m-[2rem] text-gray hover:scale-110 hover:cursor-pointer">
        <RoomOutIcon roomId={roomId} />
      </div>
      {isSeat ? (
        <PlayTable socket={socket} user={user} roomId={roomId} room={room} seat={seat} />
      ) : (
        <GameTable socket={socket} user={user} roomId={roomId} room={room} seat={seat} setSeat={setSeat} />
      )}
    </div>
  );
}
