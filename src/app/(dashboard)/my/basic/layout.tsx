import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="w-full flex justify-center text-2xl text-center m-4">
        <Link href={'/my/basic'} className="w-1/3 bg-gray py-2 border-b-2">
          기본 정보
        </Link>
        <Link href={'/my/log'} className="w-1/3 py-2 opacity-50 bg-quaternary">
          기록
        </Link>
      </div>
      {children}
    </div>
  );
}
