import React from 'react';
import LoginButtons from './LoginButtons';
import { irish_grover } from '../font';

export default function LoginPage() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center text-7xl text-title gap-[5rem]">
      <p className={irish_grover.className}>Texas Hold'em</p>
      <p className={irish_grover.className}>H P</p>
      <LoginButtons />
    </div>
  );
}
