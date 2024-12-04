import { initialPlayerNode } from '@/lib/initialValue';
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
    status: 'wait',
    action: {
      amount: -1,
      type: 'yet'
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
    status: 'wait',
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
    pot: {
      main: {
        total: 0,
        current: 0
      },
      side: []
    },
    currentBet: initialPlayerNode,
    position: {
      dealer: initialPlayerNode,
      bb: initialPlayerNode,
      sb: initialPlayerNode,
      turn: initialPlayerNode
    },
    board: [],
    winners: [],
    playerList: {
      head: null,
      length: 0
    }
  }
];
