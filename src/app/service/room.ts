import { GamePlayType, PublicRoomBlind } from '@/model';

export const countTotalPlayers = (rooms: GamePlayType[], blind: PublicRoomBlind): number => {
  const result = rooms.filter(room => room.blind === blind).reduce((sum, room) => sum + room.playerList.length, 0);
  return result;
};
