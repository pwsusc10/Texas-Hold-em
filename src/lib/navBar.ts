import { NavBarItem } from '@/model';

export const navBarKey = ['notice', 'room', 'my'] as const;

export const navBarList: NavBarItem[] = [
  { href: '/notice', label: '공지사항' },
  { href: '/room', label: '홀 덤' },
  { href: '/my', label: '마이페이지' }
];
