import { GamePlayType, UserType } from '@/model';
import { atom } from 'jotai';
import { initialGamePlayValue } from './initialValue';

export const userAtom = atom<UserType>({
  id: 0,
  user_name: '',
  email: '',
  profile: null,
  chips: 0,
  gameLogs: { total: 0, logIds: [] },
  created_at: new Date(),
  updated_at: new Date(),
  state: 'A'
});

export const gamePlayAtom = atom<GamePlayType>(initialGamePlayValue);
