'use client';
import { initialRoomValue } from '@/lib/initialValue';
import { BlindRoomsWithTotalType } from '@/model';
import React, { useEffect, useState } from 'react';
import { ColorButton } from '../Buttons';
import GameIcon from '../icons/GameIcon';
import { useRouter } from 'next/navigation';

export default function RoomContent() {
  const [publicRooms, setPublicRooms] = useState<BlindRoomsWithTotalType>(initialRoomValue);
  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FRONT_SERVER_URL}/api/game/room`, {
        method: 'GET'
      });

      const data = await res.json();
      setPublicRooms(data);
    };

    fetchRoom();
  }, []);

  const createRoomHandler = () => {
    // TODO: create room
  };

  const enterPublicGamehandler = (blind: 'blind200' | 'blind400' | 'blind500') => {
    if (blind === 'blind200') {
      const roomId = publicRooms.blind200.rooms.find(room => room.player_number < 9);
      if (roomId) {
        router.push(`/game/${roomId.id}`);
      } else {
        alert('방이 꽉 찼습니다.');
      }
    } else if (blind === 'blind400') {
      const roomId = publicRooms.blind400.rooms.find(room => room.player_number < 9);
      if (roomId) {
        router.push(`/game/${roomId.id}`);
      } else {
        alert('방이 꽉 찼습니다.');
      }
    } else if (blind === 'blind500') {
      const roomId = publicRooms.blind500.rooms.find(room => room.player_number < 9);
      if (roomId) {
        router.push(`/game/${roomId.id}`);
      } else {
        alert('방이 꽉 찼습니다.');
      }
    }
  };

  return (
    <div className="w-2/3 min-h-[75vh] border-4 border-deepdark bg-secondary rounded-md">
      <div className="w-full h-full flex flex-col p-4">
        <ColorButton onClick={createRoomHandler} filled className="w-fit self-end">
          방 생성
        </ColorButton>
        <div className="grid grid-cols-3 gap-8 p-4">
          <div
            onClick={() => enterPublicGamehandler('blind200')}
            className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-md bg-quaternary p-4 hover:cursor-pointer hover:scale-105"
          >
            <div className="w-[7rem] h-[5rem] rounded-3xl bg-slate-500 p-2">
              <GameIcon />
            </div>
            <div className="pt-4">
              <p>사용자 : {publicRooms.blind200.total}명</p>
              <p>Blind : 200</p>
            </div>
          </div>
          <div
            onClick={() => enterPublicGamehandler('blind400')}
            className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-md bg-quaternary p-4 hover:cursor-pointer hover:scale-105"
          >
            <div className="w-[7rem] h-[5rem] rounded-3xl bg-slate-500 p-2">
              <GameIcon />
            </div>
            <div className="pt-4">
              <p>사용자 : {publicRooms.blind400.total}명</p>
              <p>Blind : 400</p>
            </div>
          </div>
          <div
            onClick={() => enterPublicGamehandler('blind500')}
            className="flex flex-col justify-center items-center border-2 border-gray-400 rounded-md bg-quaternary p-4 hover:cursor-pointer hover:scale-105"
          >
            <div className="w-[7rem] h-[5rem] rounded-3xl bg-slate-500 p-2">
              <GameIcon />
            </div>
            <div className="pt-4">
              <p>사용자 : {publicRooms.blind500.total}명</p>
              <p>Blind : 500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
