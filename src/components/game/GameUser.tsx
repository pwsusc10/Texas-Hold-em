import { GamePlayerType, GamePlayType, UserType } from '@/model';
import React, { useEffect, useState } from 'react';
import { CircleUserIcon } from '../ui/icons/UserIcon';
import Card from '../ui/card';
import ActionPreview from './ActionPreview';
import DealerButton from '../ui/DealerButton';
import Chips from '../ui/Chips';
import { didWin } from '@/lib/util';

export type Props = {
  game: GamePlayType;
  positionIndex: number;
  seat: number;
  user: UserType;
  player: GamePlayerType;
};

export default function GameUser({ game, positionIndex, seat, user, player }: Props) {
  const [isWin, setIsWin] = useState({ result: false, amount: 0 });
  const chipsPosition: string[] = [
    '-top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/3',
    'top-1/3 -right-1/2 translate-x-1/2',
    'top-1/2 -right-1/4 translate-x-1/2',
    '-bottom-1/2 -right-1/3 translate-x-1/2',
    '-bottom-full left-1/2 -translate-x-1/2',
    '-bottom-full right-1/2 translate-x-1/2',
    '-bottom-1/2 -left-1/3 -translate-x-1/2',
    'top-1/2 -left-1/4 -translate-x-1/2',
    'top-1/3 -left-1/2 -translate-x-1/2'
  ];

  useEffect(() => {
    const result = didWin({ user: player, game });
    setIsWin(result);
  }, [game.winners]);

  return (
    <div className="relative w-[6rem] flex justify-center">
      {game && game.position.dealer.seat === seat && <DealerButton positionIndex={positionIndex} />}
      {isWin.result ? (
        <p className={`${chipsPosition[positionIndex]} absolute z-40 text-center font-semibold`}>+{isWin.amount}C</p>
      ) : (
        player.action.amount > 0 && (
          <div className={`${chipsPosition[positionIndex]} absolute z-40 flex flex-col justify-center items-center gap-2`}>
            <Chips amount={player.action.amount} />
            <p className="text-xs">{player.action.amount}</p>
          </div>
        )
      )}
      <div className="relative w-[4rem] h-[4rem]">
        {player.action.type !== 'yet' && (
          <div className="z-10 w-[4rem] absolute -top-1/4 right-1/2 translate-x-1/2">
            <ActionPreview action={player.action} isWin={isWin.result} />
          </div>
        )}
        <CircleUserIcon className={`border ${game.position.turn.seat === seat ? 'border-yellow scale-110' : 'borer-white'}`} />
        {game.phase === 'showdown' ? (
          <div className="z-30 absolute top-1/4 right-0 translate-x-2/3 flex gap-1.5">
            {player.hand.map((card, i) => (
              <div key={i} className={`w-8`}>
                <Card card={card} isOpen={user.id === player.id ? true : false} phase={game.phase} />
              </div>
            ))}
          </div>
        ) : (
          <div className="z-10 absolute top-1/4 right-0 translate-x-2/3 flex">
            {player.hand.map((card, i) => (
              <div key={i} className={`${i % 2 === 0 ? '-rotate-6' : 'rotate-6 -translate-x-[0.5rem]'} w-8`}>
                <Card card={card} isOpen={user.id === player.id ? true : false} phase={game.phase} />
              </div>
            ))}
          </div>
        )}
        <div className="z-20 absolute top-full -translate-x-[0.5rem] -translate-y-1/3 w-[5rem] h-[3rem] bg-secondary flex flex-col justify-center items-center rounded-md text-xs">
          <p>{player.user_name}</p>
          <p className="text-yellow">{player.gameChips}c</p>
        </div>
      </div>
    </div>
  );
}
