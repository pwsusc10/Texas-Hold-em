'use client';

import React from 'react';
import { CircleUserIcon } from '../icons/UserIcon';
import Link from 'next/link';
import CoinIcon from '../icons/CoinIcon';
import useSWR from 'swr';
import { UserType } from '@/model';

export default function MiniProfile() {
  const { data: user, isLoading, error } = useSWR<UserType>(`${process.env.NEXT_PUBLIC_FRONT_SERVER_URL}/api/me`);

  if (isLoading) {
    return (
      <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
        <p className="text-center text-2xl font-semibold">Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
        <p className="text-center text-2xl font-semibold">Error!</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
        <p className="text-center text-2xl font-semibold">Not Found User!</p>
      </div>
    );
  }

  return (
    <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col items-center gap-[2rem]">
          <p className="text-3xl">{user.user_name}</p>
          <p className="text-lg">핸드 : {user.gameLogs.total}</p>
        </div>
        {/* TODO: userProfile */}
        <div className="w-[6rem] h-[6rem] bg-tertiary rounded-full">
          <CircleUserIcon />
        </div>
      </div>
      <div className="flex justify-evenly items-center">
        <div className="w-[4rem] text-yellow">
          <CoinIcon />
        </div>
        <p className="text-2xl">{user.chips} c</p>
        <Link href="/my" className="h-fit border-2 border-white rounded-md bg-yellow py-3 px-2 text-xl font-semibold">
          상세보기
        </Link>
      </div>
    </div>
  );
}
