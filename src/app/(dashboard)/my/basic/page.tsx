'use client';
import PencilIcon from '@/components/icons/PencilIcon';
import { CircleUserIcon } from '@/components/icons/UserIcon';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function page() {
  const { data } = useSession();

  if (!data || !data.user)
    return (
      <div className="w-4/5 mx-auto text-center text-2xl">
        <p>로그인 후 이용이 가능합니다.</p>
      </div>
    );

  return (
    <ul className="w-4/5 mx-auto">
      <li className="flex items-center border-b h-[5rem] p-4">
        <p className="w-1/5">프로필 사진</p>
        {data.user.image ? <p className="grow">프로필 사진을 변경해보세요.</p> : <p>프로필 사진을 추가해보세요.</p>}
        <div className="h-full">
          <CircleUserIcon />
        </div>
      </li>
      <li className="flex items-center border-b h-[5rem] p-4">
        <p className="w-1/5">닉네임</p>
        <p className="grow">{data.user.name}</p>
        <div className="h-full">
          <PencilIcon />
        </div>
      </li>
    </ul>
  );
}
