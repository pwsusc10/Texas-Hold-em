import { ChipValueType, UserType } from './../model/index';
import { GamePlayType, PublicRoomBlind } from '@/model';

export const publicRoomsBlind: PublicRoomBlind[] = [200, 400, 500];
const chipValues: ChipValueType[] = [100000, 10000, 5000, 1000, 100];
// const chipValues: ChipValueType[] = [100, 500, 1000, 5000, 10000];

export const boardOpen = [
  [false, false, false, false, false],
  [true, true, true, false, false],
  [true, true, true, true, false],
  [true, true, true, true, true]
];

export const getBoardOpen = (room: GamePlayType) => {
  const boardOpenList = room.phase === 'preFlop' ? boardOpen[0] : room.phase === 'flop' ? boardOpen[1] : room.phase === 'turn' ? boardOpen[2] : boardOpen[3];
  return boardOpenList;
};

export const calculateChips = (amount: number): number[] => {
  const chips: number[] = [];
  for (let value of chipValues) {
    const count = Math.floor(amount / value);
    amount %= value;
    for (let i = 0; i < count; i++) {
      chips.push(value);
    }
  }
  return chips;
};

export const playFunctionAfterAnimation = ({ func, duration }: { func: () => void; duration: number }) => {
  setTimeout(() => {
    func();
  }, duration);
};

export const didWin = ({ user, game }: { user: UserType; game: GamePlayType }) => {
  const result = game.winners.find(winner => winner.player.player.id === user.id);

  if (result) {
    return { result: true, amount: result.total };
  } else {
    return { result: false, amount: 0 };
  }
};
