'use client';
import React, { useEffect, useState } from 'react';
import SeatButton from './SeatButton';
import { useSocket } from '@/context/SocketContext';
import { useSession } from 'next-auth/react';
import Modal from '../ui/Modal';
import { BasicButton } from '../Buttons';
import { useAtom } from 'jotai';
import { roomAtom, userAtom } from '@/lib/atom';
import CancelIcon from '../ui/icons/CancelIcon';
import { GamePlayerType, GamePlayType, GameRoomType } from '@/model';
import { Socket } from 'socket.io-client';
import GameUser from './GameUser';
// import { seatPosition } from '@/lib/seatPosition';

type Props = {
  socket: Socket;
  roomId: string;
  room: GamePlayType;
  setRoom: (room: GamePlayType) => void;
};

export default function GameTable({ socket, roomId, room, setRoom }: Props) {
  const [user, setUser] = useAtom(userAtom);
  // const [room, setRoom] = useAtom(roomAtom);
  const [byIn, setByIn] = useState<number>(room.blind * 30);
  const [seat, setSeat] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const seatPosition: string[] = [
    'top-full -translate-y-[1rem]',
    'top-1/2 right-full translate-x-[1rem] translate-y-[7rem]',
    'top-1/2 right-full translate-x-[1rem] -translate-y-[3rem]',
    'top-1/2 right-full translate-x-[1rem] -translate-y-[13rem]',
    'top-0 -translate-x-[6rem] -translate-y-[4rem]',
    'top-0 translate-x-[6rem] -translate-y-[4rem]',
    'top-1/2 left-full -translate-x-[1rem] -translate-y-[13rem]',
    'top-1/2 left-full -translate-x-[1rem] -translate-y-[3rem]',
    'top-1/2 left-full -translate-x-[1rem] translate-y-[7rem]'
  ];

  const seatHandler = (seat: number) => {
    setSeat(seat);
    setIsModalOpen(true);
  };

  const byInHandler = () => {
    if (user.chips - byIn < 0) {
      alert('보유 코인이 부족합니다.');
      return;
    }
    socket.emit('byIn', { roomId, user, seat, byIn });
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-[30rem] h-[40rem] flex justify-center items-center border-[2rem] border-[#322918] rounded-[12rem] bg-[#97814B]">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} id={String(i + 1)} className={`absolute  ${seatPosition[i]}`}>
          {room.seat[(i + 1) as keyof typeof room.seat] ? (
            <GameUser user={room.seat[(i + 1) as keyof typeof room.seat] as GamePlayerType} />
          ) : (
            <SeatButton onClick={() => seatHandler(i + 1)} className="hover:cursor-pointer hover:scale-105" />
          )}
        </div>
      ))}
      <section className="w-2/3 h-3/4 flex flex-col items-center border-2 border-white rounded-[8rem] bg-[#B99D55]">
        <div className=" flex flex-col items-center gap-2">
          {/* chips */}
          <div>chips animation</div>
          <div className="px-4 py-2 flex justify-center items-center rounded-3xl bg-black opacity-50">
            <p>{room.pot.current}C</p>
          </div>
          <div className="w-[9rem] h-[4rem] flex flex-col justify-center items-center rounded-xl bg-black opacity-50">
            <p>POT</p>
            <p>{room.pot.total}C</p>
          </div>
          <p>
            SB: {room.blind / 2}C / BB: {room.blind}C
          </p>
        </div>
        <div className="">board</div>
      </section>
      {isModalOpen && (
        <Modal size="lg">
          <div className="relative w-full h-full flex flex-col justify-around items-center p-4">
            <div className="absolute top-2 right-2" onClick={() => setIsModalOpen(false)}>
              <CancelIcon className="hover:cursor-pointer hover:scale-110" size={24} />
            </div>
            <div className="text-3xl font-semibold">바이인</div>
            <div className="w-full flex justify-between">
              <p className="flex gap-4">
                <span className="text-gray">MIN</span>
                <span>BB X 30</span>
              </p>
              <span className="flex gap-4">
                <span className="text-gray">MAX</span>
                <span>BB X 150</span>
              </span>
            </div>
            <div className="w-full flex flex-col items-center ">
              <div className="text-2xl mb-3 text-yellow">{Intl.NumberFormat().format(byIn)}C</div>
              <input
                type="range"
                min={room.blind * 30}
                max={room.blind * 150}
                value={byIn}
                onChange={e => setByIn(Number(e.target.value))}
                step={10}
                list="markers"
                className="w-full h-1 bg-white rounded-lg appearance-none text-2xl accent-[#AD975F] hover:cursor-pointer"
              />
              <div className="flex justify-between w-full mt-3 text-sm">
                <span>{Intl.NumberFormat().format(room.blind * 30)}C</span>
                <span>{Intl.NumberFormat().format(room.blind * 150)}C</span>
              </div>
            </div>
            <div className="text-center">
              <p>
                <span className="text-gray">보유코인</span> {Intl.NumberFormat().format(user.chips)}c <span className="text-gray">- 바이인</span>
                {Intl.NumberFormat().format(byIn)}c
              </p>
              <p>
                <span className="text-gray">= 밸런스</span> {Intl.NumberFormat().format(user.chips - byIn)}c
              </p>
            </div>
            <BasicButton className="w-full h-[3rem]" filled={false} onClick={() => byInHandler()}>
              바이인
            </BasicButton>
          </div>
        </Modal>
      )}
    </div>
  );
}
