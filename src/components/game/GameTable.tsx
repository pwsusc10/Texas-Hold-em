'use client';

import React, { useState } from 'react';
import SeatButton from './SeatButton';
import Modal from '../ui/Modal';
import { BasicButton } from '../Buttons';
import CancelIcon from '../ui/icons/CancelIcon';
import { GamePlayerType, GamePlayType, PlayerNodeType, UserType } from '@/model';
import { Socket } from 'socket.io-client';
import GameUser from './GameUser';
import Chips from '../ui/Chips';
import Card from '../ui/card';
import { getBoardOpen } from '@/lib/util';

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
  const seatPosition: string[] = [
    'top-full -translate-y-[1rem]',
    'bottom-0 right-full translate-x-1/4 -translate-y-1/2',
    'top-1/2 right-full translate-x-1/4 -translate-y-1/2',
    'top-0 right-full translate-x-1/4 translate-y-1/2',
    'top-0 left-1/2 translate-x-1/4 sm:translate-x-1/2 md:translate-x-full -translate-y-3/4',
    'top-0 right-1/2 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-x-full -translate-y-3/4',
    'top-0 left-full -translate-x-1/4 translate-y-1/2',
    'top-1/2 left-full -translate-x-1/4 -translate-y-1/2',
    'bottom-0 left-full -translate-x-1/4 -translate-y-1/2'
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
    <div className="relative w-2/3 mx-auto h-[60vh] flex justify-center items-center border-[0.5rem] sm:border-[1rem] border-[#322918] rounded-[5rem] sm:rounded-[7rem] bg-[#97814B]">
      {Array.from({ length: 9 }).map((_, i) => {
        const seatNumber = i; // 0부터 8까지의 좌석 번호
        let current = room.playerList.head; // playerList의 시작점
        let player: GamePlayerType | null = null;

        if (!current) {
          return (
            <div key={seatNumber} id={`seat-${seatNumber}`} className={`absolute ${seatPosition[i]}`}>
              <SeatButton onClick={() => seatHandler(seatNumber)} className="hover:cursor-pointer hover:scale-105" />
            </div>
          );
        }
        // 연결 리스트 순회하여 현재 좌석에 해당하는 플레이어 검색
        while (current !== null) {
          if (current.seat === seatNumber) {
            player = current.player; // 해당 좌석의 플레이어 정보 가져오기
            break;
          }
          current = current.next as PlayerNodeType;
        }

        return (
          <div key={seatNumber} id={`seat-${seatNumber}`} className={`absolute ${seatPosition[i]}`}>
            {player ? (
              <GameUser player={player} user={user} positionIndex={i} seat={seat} game={room} />
            ) : (
              <SeatButton onClick={() => seatHandler(seatNumber)} className="hover:cursor-pointer hover:scale-105" />
            )}
          </div>
        );
      })}
      <section className="w-3/4 h-4/5 flex flex-col items-center border-2 border-white rounded-xl bg-[#B99D55]">
        <div className="flex flex-col items-center gap-2 text-xs sm:text-sm md:text-base">
          <Chips amount={room.pot.main.current} />
          <div className="p-2 flex justify-center items-center rounded-xl bg-black opacity-50">
            <p>{room.pot.main.current}C</p>
          </div>
          <div className="w-2/3 p-2 flex flex-col justify-center items-center rounded-xl bg-black opacity-50 gap-2">
            <p>POT</p>
            <p>{room.pot.main.total}C</p>
          </div>
          <p className="text-center">
            SB: {room.blind / 2}C / BB: {room.blind}C<br />
            Time: {room.time}s
          </p>
        </div>
        <div className={`flex ${room.phase === 'showdown' ? 'gap-2' : 'gap-0.5'}`}>
          {room.board.map((card, i) => (
            <div key={i} className="w-[3rem] h-[4rem] bg-[#322918] rounded-[12rem]">
              <Card card={card} isOpen={getBoardOpen(room)[i]} phase={room.phase} />
            </div>
          ))}
        </div>
      </section>
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
    </div>
  );
}
