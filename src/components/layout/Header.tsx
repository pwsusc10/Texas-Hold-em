'use client';
import { irish_grover } from '@/app/font';
import Image from 'next/image';
import React from 'react';
import AuthButton from './AuthButton';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-secondary">
      <div className="flex gap-4">
        <h1 className={`${irish_grover.className} text-title px-4 text-3xl sm:text-4xl md:text-5xl`}>H P</h1>
        {/* <Image src={'/images/friends.svg'} alt="Friends" width={50} height={50} />
        <Image src={'/images/setting.svg'} alt="Setting" width={50} height={50} />
        <Image src={'/images/QA.svg'} alt="QA" width={50} height={50} /> */}
      </div>
      <AuthButton />
    </div>
  );
}
