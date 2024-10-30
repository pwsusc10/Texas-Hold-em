'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { BasicButton } from '../Buttons';

export default function AuthButton() {
  const { data: session, status } = useSession();

  return (
    <div className="text-2xl">
      {status === 'authenticated' ? (
        <BasicButton
          onClick={() => {
            signOut();
          }}
          filled
        >
          Log Out
        </BasicButton>
      ) : (
        <BasicButton onClick={() => signIn()} filled={false}>
          Log In
        </BasicButton>
      )}
    </div>
  );
}
