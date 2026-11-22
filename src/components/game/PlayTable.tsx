import React from 'react';
import GameUser from './GameUser';
import { GamePlayType, UserType } from '@/model';
import SeatButton from './SeatButton';
import { Socket } from 'socket.io-client';
import ActionButtonList from './ActionButtonList';
import PokerTable from './PokerTable';

type Props = {
  socket: Socket;
  user: UserType;
  room: GamePlayType;
  seat: number;
};

export default function PlayTable({ socket, user, room, seat }: Props) {
  return (
    <>
      <PokerTable
        room={room}
        firstSeat={seat}
        className="mb-[4rem]"
        renderSeat={({ seatNumber, positionIndex, player }) =>
          player ? <GameUser game={room} player={player} user={user} positionIndex={positionIndex} seat={seatNumber} /> : <SeatButton onClick={() => {}} />
        }
      />
      {room.position.turn.player.id === user.id && <ActionButtonList socket={socket} game={room} prevBet={room.currentBet} user={room.position.turn.player} />}
    </>
  );
}
