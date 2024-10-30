import React from 'react';

export default function Main({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-full grow ">{children}</main>;
}
