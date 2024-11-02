'use client';
import { irish_grover } from '@/app/font';
import Image from 'next/image';
import React from 'react';
import AuthButton from './AuthButton';

export default function Header() {
  return (
    <div className="sticky top-0 flex justify-between items-center p-4 ">
      <div className="flex gap-4">
        <h1 className={`${irish_grover.className} text-title text-5xl px-4`}>H P</h1>
        <Image src={'/images/friends.svg'} alt="Friends" width={50} height={50} />
        <Image src={'/images/setting.svg'} alt="Setting" width={50} height={50} />
        <Image src={'/images/QA.svg'} alt="QA" width={50} height={50} />
      </div>
      <AuthButton />
    </div>
  );
}