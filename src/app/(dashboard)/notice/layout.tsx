import NavBar from '@/components/layout/NavBar';
import React, { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <NavBar currentPage="notice" />
      {children}
    </div>
  );
}
