import Link from 'next/link';
import React from 'react';
import { navBarKey, navBarList } from '@/lib/navBar';

type Props = {
  currentPage: (typeof navBarKey)[keyof typeof navBarKey];
};

export default function NavBar({ currentPage }: Props) {
  return (
    <ul className="flex gap-8 p-4 font-semibold bg-tertiary rounded-md text-xl sm:text-2xl md:text-3xl">
      {navBarList.map((item, index) => (
        <Link key={index} href={item.href}>
          <p className={`${currentPage === item.href.split('/')[1] && 'text-yellow'}`}>{item.label}</p>
        </Link>
      ))}
    </ul>
  );
}
