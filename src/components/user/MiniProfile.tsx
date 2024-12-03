'use client';

import React from 'react';
import { CircleUserIcon } from '../ui/icons/UserIcon';
import Link from 'next/link';
import CoinIcon from '../ui/icons/CoinIcon';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/lib/atom';

export default function MiniProfile() {
  const user = useAtomValue(userAtom);

  // userAtom이 초기화 되지 않음 (로그인 전)
  if (user.id === 0) {
    return (
      <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
        <p className="text-center text-2xl font-semibold">로그인 후 이용가능</p>
      </div>
    );
  }

  return (
    <div className="w-1/3 h-fit flex flex-col border-4 border-deepdark bg-secondary rounded-md gap-4 sm:gap-6 md:gap-8 px-2 py-6 sm:px-3 sm:py-8 md:px-4 md:py-10">
      <div className="flex flex-col sm:flex-row justify-evenly items-center gap-1 sm:gap-2">
        <div className="flex flex-col items-center gap-[0.5rem] sm:gap-[1rem] md:gap-[2rem]">
          <p className="font-semibold text-base sm:text-xl md:text-2xl lg:text-3xl">{user.user_name}</p>
          <p className="text-white text-opacity-80 text-sm sm:text-base md:text-lg">핸드 : {user.gameLogs ? user.gameLogs.total : 0}</p>
        </div>
        {/* TODO: userProfile */}
        <div className="bg-tertiary rounded-full w-[4rem] h-[4rem] sm:w-[5rem] sm:h-[5rem] md:w-[6rem] md:h-[6rem] ">
          <CircleUserIcon />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-evenly items-center gap-2">
        <div className="flex items-center">
          <div className="w-[2rem] sm:w-[3rem] md:w-[3.5rem] text-yellow">
            <CoinIcon />
          </div>
          <p className="text-base sm:text-xl md:text-2xl whitespace-nowrap">{user.chips} c</p>
        </div>
        <Link href="/my/log" className="h-fit border-2 border-white rounded-md bg-yellow font-semibold text-sm sm:text-base px-1 py-1.5  sm:px-2 sm:py-3">
          상세보기
        </Link>
      </div>
    </div>
  );
}
