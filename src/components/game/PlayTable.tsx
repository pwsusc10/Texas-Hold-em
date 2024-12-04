import React, { useEffect } from 'react';
import GameUser from './GameUser';
import { GamePlayerType, GamePlayType, PlayerNodeType, UserType } from '@/model';
import SeatButton from './SeatButton';
import { Socket } from 'socket.io-client';
import Card from '../ui/card';
import ActionButtonList from './ActionButtonList';
import Chips from '../ui/Chips';
import { boardOpen, getBoardOpen } from '@/lib/util';

type Props = {
  socket: Socket;
  user: UserType;
  roomId: string;
  room: GamePlayType;
  seat: number;
};

export default function PlayTable({ socket, user, roomId, room, seat }: Props) {
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
  useEffect(() => {
    return () => {
      // 게임 진행중일때 자리 비움.
      console.log('emit awayRoom');
      // socket.emit('awayRoom', { roomId, user });
    };
  }, []);

  return (
    <>
      <div className="relative w-2/3 mx-auto h-[60vh] flex justify-center items-center border-[0.5rem] sm:border-[1rem] border-[#322918] rounded-[5rem] sm:rounded-[7rem] bg-[#97814B] mb-[4rem]">
        {Array.from({ length: 9 }).map((_, i) => {
          const seatNumber = (i + seat) % 9; // 1부터 9까지의 좌석 번호
          let current = room.playerList.head; // playerList의 시작점
          let player: GamePlayerType | null = null;

          if (!current) {
            return (
              <div key={seatNumber} id={`seat-${seatNumber}`} className={`absolute ${seatPosition[i]}`}>
                <SeatButton onClick={() => {}} />
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
              {player ? <GameUser game={room} player={player} user={user} positionIndex={i} seat={seatNumber} /> : <SeatButton onClick={() => {}} />}
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
      </div>
      {room.position.turn.player.id === user.id && <ActionButtonList socket={socket} game={room} prevBet={room.currentBet} user={room.position.turn.player} />}
    </>
  );
}
