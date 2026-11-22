import { GamePlayType, UserType } from '@/model';
import { atom } from 'jotai';
import { initialGamePlayValue, initialUser } from './initialValue';

export const userAtom = atom<UserType>(initialUser);

export const gamePlayAtom = atom<GamePlayType>(initialGamePlayValue);
