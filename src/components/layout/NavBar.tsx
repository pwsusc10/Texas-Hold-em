import Link from 'next/link';
import React from 'react';
import { navBarKey, navBarList } from '@/lib/navBar';

type Props = {
  currentPage: (typeof navBarKey)[keyof typeof navBarKey];
};

export default function NavBar({ currentPage }: Props) {
  return (
    <ul className="flex gap-8 p-4 font-semibold text-3xl bg-tertiary rounded-md">
      {navBarList.map((item, index) => (
        <Link key={index} href={item.href}>
          <p className={`${currentPage === item.href.split('/')[1] && 'text-yellow'}`}>{item.label}</p>
        </Link>
      ))}
    </ul>
  );
}
