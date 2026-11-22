import { ChipValueType, GamePlayType, PublicRoomBlind, UserType } from '@/model';

export const publicRoomsBlind: PublicRoomBlind[] = [200, 400, 500];
const chipValues: ChipValueType[] = [100000, 10000, 5000, 1000, 100];

const openBoardCards: Record<GamePlayType['phase'], number> = { preFlop: 0, flop: 3, turn: 4, river: 5, showdown: 5 };

export const getBoardOpen = (room: GamePlayType): boolean[] => Array.from({ length: 5 }, (_, i) => i < openBoardCards[room.phase]);

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

export const didWin = ({ user, game }: { user: UserType; game: GamePlayType }) => {
  const result = game.winners.find(winner => winner.player.player.id === user.id);

  if (result) {
    return { result: true, amount: result.total };
  } else {
    return { result: false, amount: 0 };
  }
};
