import { GamePlayerType, GamePlayType, UserType } from '@/model';
export const UserData: GamePlayerType[] = [
  {
    id: 1,
    user_name: 'user1',
    email: 'test_email1@gamil.com',
    profile: 'profile1',
    chips: 1000,
    gameLogs: { total: 0, logIds: [] },
    created_at: new Date(),
    updated_at: new Date(),
    state: 'A',
    gameChips: 1000,
    hand: [],
    action: {
      amount: 0,
      type: 'wait'
    }
  },
  {
    id: 2,
    user_name: 'user2',
    email: 'test_email2@gamil.com',
    profile: 'profile2',
    chips: 2000,
    gameLogs: { total: 0, logIds: [] },
    created_at: new Date(),
    updated_at: new Date(),
    state: 'A',
    gameChips: 1000,
    hand: [],
    action: {
      amount: 0,
      type: 'fold'
    }
  }
];

export const RoomListData: GamePlayType[] = [
  {
    roomId: '1',
    isPlaying: false,
    blind: 200,
    time: 15,
    type: 'public',
    phase: 'preFlop',
    playerNumber: 2,
    pot: {
      total: 0,
      current: 0
    },
    position: {
      dealer: 0,
      bb: 0,
      sb: 0,
      turn: 0,
      nextTurn: 0
    },
    board: [],
    seat: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null
    }
  }
];
