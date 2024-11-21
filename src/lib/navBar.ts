import { NavBarItem } from '@/model';

export const navBarKey = ['notice', 'game', 'my'] as const;

export const navBarList: NavBarItem[] = [
  { href: '/notice', label: '공지사항' },
  { href: '/game', label: '홀 덤' },
  { href: '/my/basic', label: '마이페이지' }
];
