import React from 'react';
import { cookies } from 'next/headers';
import { CircleUserIcon } from '../icons/UserIcon';
import Link from 'next/link';
import CoinIcon from '../icons/CoinIcon';

export default async function MiniProfile() {
  const cookieStore = cookies();
  const isLogin = cookieStore.get('next-auth.session-token');
  if (!isLogin) {
    return (
      <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
        <p className="text-center text-2xl font-semibold">로그인이 필요합니다.</p>
      </div>
    );
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_FRONT_SERVER_URL}/api/me`, {
    method: 'GET',
    credentials: 'include',
    headers: { Cookie: cookies().toString() }
  });

  if (res.status !== 200) {
    // 에러 처리
    console.error('Failed to fetch data');
    <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
      <p className="text-center text-2xl font-semibold">Error!</p>
    </div>;
    return null;
  }

  const data = await res.json();

  return (
    <div className="w-1/3 h-fit flex flex-col gap-8 border-4 border-deepdark bg-secondary rounded-md px-4 py-10">
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col items-center gap-[2rem]">
          <p className="text-3xl">{data.user.user_name}</p>
          <p className="text-lg">핸드 : {data.user.gameLogs.total}</p>
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
        <p className="text-2xl">{data.user.chips} c</p>
        <Link href="/my" className="h-fit border-2 border-white rounded-md bg-yellow py-3 px-2 text-xl font-semibold">
          상세보기
        </Link>
      </div>
    </div>
  );
}
