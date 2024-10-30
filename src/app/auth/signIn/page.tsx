import React from 'react';
import LoginButtons from './LoginButtons';
import { irish_grover } from '../../font';
import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';

export default async function SignInPage() {
  const session = await getServerSession();

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = (await getProviders()) ?? {};

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center text-7xl text-title gap-[5rem]">
      <p className={irish_grover.className}>{"Texas Hold'em"}</p>
      <p className={irish_grover.className}>H P</p>
      <LoginButtons providers={providers} />
    </div>
  );
}
