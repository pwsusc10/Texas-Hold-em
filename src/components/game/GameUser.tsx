import { GamePlayerType } from '@/model';
import React from 'react';
import { CircleUserIcon } from '../ui/icons/UserIcon';

export type Props = {
  user: GamePlayerType;
};

export default function GameUser({ user }: Props) {
  return (
    <div className="w-[6rem] flex justify-center">
      <div className="relative w-[4rem] h-[4rem]">
        <CircleUserIcon className="border border-white" />
        <div className="absolute top-full -translate-x-[0.5rem] -translate-y-1/3 w-[5rem] h-[3rem] bg-secondary flex flex-col justify-center items-center rounded-md text-xs">
          <p>{user.user_name}</p>
          <p className="text-yellow">{user.chips}c</p>
        </div>
      </div>
    </div>
  );
}
