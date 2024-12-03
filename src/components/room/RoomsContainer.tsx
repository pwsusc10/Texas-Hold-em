'use client';

import { GamePlayType, PublicRoomBlind } from '@/model';
import React, { useEffect, useState } from 'react';
import { ColorButton } from '../Buttons';
import GameIcon from '../ui/icons/GameIcon';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import Modal from '../ui/Modal';
import CancelIcon from '../ui/icons/CancelIcon';
import { DropDown } from '../ui/DropDown';
import { blindList, timeList } from '@/lib/room';
import { publicRoomsBlind } from '@/lib/util';
import { countTotalPlayers } from '@/app/service/room';

export default function RoomsContainer() {
  const socket = useSocket();
  const router = useRouter();
  const [rooms, setRooms] = useState<GamePlayType[]>([]);
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
    socket.on('getRooms', ({ rooms }: { rooms: GamePlayType[] }) => {
      setRooms(rooms);
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
          <p className="text-center text-4xl font-semibold">socket loading... / game rooms</p>
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

  const enterPublicRoom = (blind: PublicRoomBlind) => {
    if (!rooms) {
      alert('방 정보를 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }

    const room = rooms.find(room => room.blind === blind && room.playerList.length < 9);
    if (room) {
      router.push(`/game/${room.roomId}`);
    } else {
      socket.emit('createPublicRoom', { blind });
    }
  };

  return (
    <div className="w-2/3 border-4 border-deepdark bg-secondary rounded-md min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh]">
      <div className="w-full h-full max-h-[60vh] flex flex-col p-4 gap-4 overflow-y-auto">
        <ColorButton onClick={() => setIsCreateRoomModalOpen(true)} filled className="w-fit self-end">
          방 생성
        </ColorButton>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {publicRoomsBlind.map((blind, index) => (
            <div
              key={index}
              onClick={() => enterPublicRoom(blind)}
              className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-md bg-quaternary p-4 hover:cursor-pointer hover:scale-105"
            >
              <div className="w-[7rem] h-[5rem] rounded-3xl bg-slate-500 p-2">
                <GameIcon />
              </div>
              <div className="pt-4">
                {rooms ? <p>사용자 : {countTotalPlayers(rooms, blind)}명</p> : <p>사용자 : 0명</p>}
                <p>Blind : {blind}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isCreateRoomModalOpen && (
        <Modal size="lg">
          <div className="relative w-full h-full flex flex-col justify-between items-center p-[1rem] sm:p-[2rem] whitespace-nowrap">
            <div className="absolute top-2 right-2" onClick={() => setIsCreateRoomModalOpen(false)}>
              <CancelIcon className="hover:cursor-pointer hover:scale-110" size={24} />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold">방 생성하기</div>
            <div className="flex justify-between gap-2 sm:gap-4">
              <p className="text-base sm:text-xl md:text-2xl font-semibold ">Big Blind</p>
              <DropDown
                placeholder="-"
                options={blindList}
                initialOption={0}
                selectedOption={blind}
                setSelectedOption={setBlind}
                renderOption={(option: number) => <p>{option}</p>}
              />
            </div>
            <div className="flex justify-between gap-2 sm:gap-4">
              <p className="text-base sm:text-xl md:text-2xl font-semibold">배팅 시간</p>
              <DropDown
                placeholder="-"
                options={timeList}
                initialOption={0}
                selectedOption={bettingTime}
                setSelectedOption={setBettingTime}
                renderOption={(option: number) => <p>{option}</p>}
              />
            </div>
            <ColorButton onClick={() => createRoomHandler()} filled className="self-end w-fit h-[2rem] sm:h-[3rem] text-base sm:text-xl">
              방 생성
            </ColorButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
