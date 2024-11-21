import { GamePlayType, GameRoomsType } from '@/model';

export const calculateRoomMember = (rooms: GamePlayType[]): GameRoomsType => {
  let blind200Members = 0;
  const publicRooms = rooms.filter(room => room.type === 'public');
  const blind200 = publicRooms.filter(room => room.blind === 200);
  blind200.forEach(room => {
    blind200Members += room.playerNumber;
  });

  let blind400Members = 0;
  const blind400 = publicRooms.filter(room => room.blind === 400);
  blind400.forEach(room => {
    blind400Members += room.playerNumber;
  });

  let blind500Members = 0;
  const blind500 = publicRooms.filter(room => room.blind === 500);
  blind500.forEach(room => {
    blind500Members += room.playerNumber;
  });

  return {
    blind200: {
      rooms: blind200,
      total: blind200Members
    },
    blind400: {
      rooms: blind400,
      total: blind400Members
    },
    blind500: {
      rooms: blind500,
      total: blind500Members
    }
  };
};
