import React, { PropsWithChildren, ReactNode } from 'react';
import { GamePlayerType, GamePlayType, PlayerListType } from '@/model';
import Chips from '../ui/Chips';
import Card from '../ui/card';
import { getBoardOpen } from '@/lib/util';

const SEAT_COUNT = 9;

const seatPositions: string[] = [
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

const findPlayerAtSeat = (list: PlayerListType, seat: number): GamePlayerType | null => {
  for (let node = list.head; node; node = node.next) {
    if (node.seat === seat) return node.player;
  }
  return null;
};

type Props = PropsWithChildren<{
  room: GamePlayType;
  className?: string;
  /** Seat shown at screen position 0 (bottom center). */
  firstSeat?: number;
  renderSeat: (seat: { seatNumber: number; positionIndex: number; player: GamePlayerType | null }) => ReactNode;
}>;

export default function PokerTable({ room, className = '', firstSeat = 0, renderSeat, children }: Props) {
  const boardOpen = getBoardOpen(room);

  return (
    <div
      className={`relative w-2/3 mx-auto h-[60vh] flex justify-center items-center border-[0.5rem] sm:border-[1rem] border-[#322918] rounded-[5rem] sm:rounded-[7rem] bg-[#97814B]${className ? ` ${className}` : ''}`}
    >
      {seatPositions.map((position, positionIndex) => {
        const seatNumber = (positionIndex + firstSeat) % SEAT_COUNT;
        return (
          <div key={seatNumber} id={`seat-${seatNumber}`} className={`absolute ${position}`}>
            {renderSeat({ seatNumber, positionIndex, player: findPlayerAtSeat(room.playerList, seatNumber) })}
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
              <Card card={card} isOpen={boardOpen[i]} phase={room.phase} />
            </div>
          ))}
        </div>
      </section>
      {children}
    </div>
  );
}
