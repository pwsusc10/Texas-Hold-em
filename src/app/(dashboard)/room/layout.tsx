import NavBar from '@/components/layout/NavBar';
import React, { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <NavBar currentPage="room" />
      <div className="grow border-4 border-deepdark rounded-md min-h-[75vh]">{children}</div>
    </div>
  );
}
