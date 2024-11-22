'use client';

import { GamePlayType, GameRoomsType } from '@/model';
import React, { useEffect, useState } from 'react';
import { ColorButton } from '../Buttons';
import GameIcon from '../ui/icons/GameIcon';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import { calculateRoomMember } from '@/app/service/room';
import Modal from '../ui/Modal';
import CancelIcon from '../ui/icons/CancelIcon';
import { DropDown } from '../ui/DropDown';
import { blindList, timeList } from '@/lib/room';

export default function RoomsContainer() {
  const socket = useSocket();
  const router = useRouter();
  const [rooms, setRooms] = useState<GameRoomsType>();
  const [blind, setBlind] = useState<number>(0);
  const [bettingTime, setBettingTime] = useState<number>(0);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      socket.emit('getRooms');
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on('getRooms', ({ rooms }) => {
      const result = calculateRoomMember(rooms);
      setRooms(result);
    });

    socket.on('createRoom', ({ room }: { room: GamePlayType }) => {
      router.push(`/game/${room.roomId}`);
    });
    return () => {
      socket.off('getRooms');
      socket.off('createPublicRoom');
    };
  }, [socket]);

  if (!socket) {
    return (
      <div className="w-2/3 min-h-[75vh] border-4 border-deepdark bg-secondary rounded-md">
        <div className="w-full h-full flex flex-col justify-center items-center p-4">
          <p className="text-center text-4xl font-semibold">loading..</p>
        </div>
      </div>
    );
  }

  const createRoomHandler = () => {
    if (blind === 0 || bettingTime === 0) {
      alert('값을 입력해주세요.');
      return;
    }
    socket.emit('createPrivateRoom', { blind, bettingTime });
    setIsCreateRoomModalOpen(false);
  };

  const enterPublicGamehandler = (blind: 200 | 400 | 500) => {
    if (!rooms) {
      alert('방 정보를 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }
    if (blind === 200) {
      const room = rooms.blind200.rooms.find(room => room.playerNumber < 9);
      if (room) {
        router.push(`/game/${room.roomId}`);
      } else {
        socket.emit('createPublicRoom', { blind: 200 });
      }
    } else if (blind === 400) {
      const room = rooms.blind400.rooms.find(room => room.playerNumber < 9);
      if (room) {
        router.push(`/game/${room.roomId}`);
      } else {
        socket.emit('createPublicRoom', { blind: 400 });
      }
    } else if (blind === 500) {
      const room = rooms.blind500.rooms.find(room => room.playerNumber < 9);
      if (room) {
        router.push(`/game/${room.roomId}`);
      } else {
        socket.emit('createPublicRoom', { blind: 500 });
      }
    }
  };

  return (
    <div className="w-2/3 min-h-[75vh] border-4 border-deepdark bg-secondary rounded-md">
      <div className="w-full h-full flex flex-col p-4">
        <ColorButton onClick={() => setIsCreateRoomModalOpen(true)} filled className="w-fit self-end">
          방 생성
        </ColorButton>
        <div className="grid grid-cols-3 gap-8 p-4">
          <div
            onClick={() => enterPublicGamehandler(200)}
            className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-md bg-quaternary p-4 hover:cursor-pointer hover:scale-105"
          >
            <div className="w-[7rem] h-[5rem] rounded-3xl bg-slate-500 p-2">
              <GameIcon />
            </div>
            <div className="pt-4">
              {rooms ? <p>사용자 : {rooms.blind200.total}명</p> : <p>사용자 : 0명</p>}
              <p>Blind : 200</p>
            </div>
          </div>
          <div
            onClick={() => enterPublicGamehandler(400)}
            className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-md bg-quaternary p-4 hover:cursor-pointer hover:scale-105"
          >
            <div className="w-[7rem] h-[5rem] rounded-3xl bg-slate-500 p-2">
              <GameIcon />
            </div>
            <div className="pt-4">
              {rooms ? <p>사용자 : {rooms.blind400.total}명</p> : <p>사용자 : 0명</p>}
              <p>Blind : 400</p>
            </div>
          </div>
          <div
            onClick={() => enterPublicGamehandler(500)}
            className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-md bg-quaternary p-4 hover:cursor-pointer hover:scale-105"
          >
            <div className="w-[7rem] h-[5rem] rounded-3xl bg-slate-500 p-2">
              <GameIcon />
            </div>
            <div className="pt-4">
              {rooms ? <p>사용자 : {rooms.blind500.total}명</p> : <p>사용자 : 0명</p>}
              <p>Blind : 500</p>
            </div>
          </div>
        </div>
      </div>
      {isCreateRoomModalOpen && (
        <Modal size="lg">
          <div className="relative w-full h-full flex flex-col justify-between items-center p-[2rem]">
            <div className="absolute top-2 right-2" onClick={() => setIsCreateRoomModalOpen(false)}>
              <CancelIcon className="hover:cursor-pointer hover:scale-110" size={24} />
            </div>
            <div className="text-3xl font-semibold">방 생성하기</div>
            <div className="w-1/2 flex justify-between">
              <p className="text-2xl font-semibold">Big Blind</p>
              <DropDown
                placeholder="-"
                options={blindList}
                initialOption={0}
                selectedOption={blind}
                setSelectedOption={setBlind}
                renderOption={(option: number) => <p>{option}</p>}
              />
            </div>
            <div className="w-1/2 flex justify-between">
              <p className="text-2xl font-semibold">배팅 시간</p>
              <DropDown
                placeholder="-"
                options={timeList}
                initialOption={0}
                selectedOption={bettingTime}
                setSelectedOption={setBettingTime}
                renderOption={(option: number) => <p>{option}</p>}
              />
            </div>
            <ColorButton onClick={() => createRoomHandler()} filled className="self-end w-fit h-[3rem] text-xl">
              방 생성
            </ColorButton>
          </div>
        </Modal>
      )}
    </div>
  );
}