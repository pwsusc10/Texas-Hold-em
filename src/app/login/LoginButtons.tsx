'use client';

import React from 'react';
import Image from 'next/image';
import Google_Login_Button from '/public/images/google_login.webp';
import Kakao_Login_Button from '/public/images/kakao_login.webp';

export default function LoginButtons() {
  return (
    <div className="flex flex-col gap-8">
      <Image src={Google_Login_Button} alt="Google Login Button" width={50} height={50} className="w-[13rem] hover:cursor-pointer" />
      <Image src={Kakao_Login_Button} alt="Kakao Login Button" width={50} height={50} className="w-[13rem] hover:cursor-pointer" />
    </div>
  );
}
