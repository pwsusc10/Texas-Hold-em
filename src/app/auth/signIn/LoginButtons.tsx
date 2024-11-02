'use client';

import React from 'react';
import Image from 'next/image';
import Google_Login_Button from '/public/images/google_login.webp';
import Kakao_Login_Button from '/public/images/kakao_login.webp';
import { ClientSafeProvider, signIn } from 'next-auth/react';

interface Props {
  providers: Record<string, ClientSafeProvider>;
}

export default function LoginButtons({ providers }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {Object.values(providers).map(provider => (
        <Image
          key={provider.id}
          src={provider.name === 'Google' ? Google_Login_Button : Kakao_Login_Button}
          alt={`${provider.name} Login Button`}
          width={50}
          height={50}
          unoptimized
          className="w-[13rem] hover:cursor-pointer"
          onClick={() => signIn(provider.id, { callbackUrl: '/notice' })}
        />
      ))}
    </div>
  );
}
