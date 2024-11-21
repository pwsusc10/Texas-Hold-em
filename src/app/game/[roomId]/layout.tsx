import RoomOutIcon from '@/components/ui/icons/RoomOutIcon';
import { SocketProvider } from '@/context/SocketContext';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { roomId: string };
  children: React.ReactNode;
};

export default function layout({ params, children }: Props) {
  const { roomId } = params;

  return (
    <>
      <Link href="/room" className="absolute right-5 top-5 w-[3rem] text-gray hover:scale-110">
        <RoomOutIcon />
      </Link>
      {children}
    </>
  );
}
