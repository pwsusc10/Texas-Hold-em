'use client';

import React, { useState } from 'react';
import SeatButton from './SeatButton';
import Modal from '../ui/Modal';
import { BasicButton } from '../Buttons';
import CancelIcon from '../ui/icons/CancelIcon';
import { GamePlayType, UserType } from '@/model';
import { Socket } from 'socket.io-client';
import GameUser from './GameUser';
import PokerTable from './PokerTable';

type Props = {
  socket: Socket;
  user: UserType;
  roomId: string;
  room: GamePlayType;
  seat: number;
  setSeat: (seat: number) => void;
};

export default function GameTable({ socket, user, roomId, room, seat, setSeat }: Props) {
  const [byIn, setByIn] = useState<number>(room.blind * 30);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
    <PokerTable
      room={room}
      renderSeat={({ seatNumber, positionIndex, player }) =>
        player ? (
          <GameUser player={player} user={user} positionIndex={positionIndex} seat={seat} game={room} />
        ) : (
          <SeatButton onClick={() => seatHandler(seatNumber)} className="hover:cursor-pointer hover:scale-105" />
        )
      }
    >
      {isModalOpen && (
        <Modal size="lg">
          <div className="relative w-full h-full flex flex-col justify-around items-center p-2 sm:p-4">
            <div className="absolute top-2 right-2" onClick={() => setIsModalOpen(false)}>
              <CancelIcon className="hover:cursor-pointer hover:scale-110" size={24} />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold">바이인</div>
            <div className="w-full flex justify-between text-xs sm:text-sm md:text-base">
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
              <div className="text-base sm:text-xl md:text-2xl mb-3 text-yellow">{Intl.NumberFormat().format(byIn)}C</div>
              <input
                type="range"
                min={room.blind * 30}
                max={room.blind * 150}
                value={byIn}
                onChange={e => setByIn(Number(e.target.value))}
                step={10}
                list="markers"
                className="w-full h-1 bg-white rounded-lg appearance-none accent-[#AD975F] hover:cursor-pointer"
              />
              <div className="flex justify-between w-full mt-3 text-xs sm:text-sm">
                <span>{Intl.NumberFormat().format(room.blind * 30)}C</span>
                <span>{Intl.NumberFormat().format(room.blind * 150)}C</span>
              </div>
            </div>
            <div className="text-center text-xs sm:text-sm md:text-base">
              <p>
                <span className="text-gray">보유코인</span> {Intl.NumberFormat().format(user.chips)}c <span className="text-gray">- 바이인 </span>
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
    </PokerTable>
  );
}
