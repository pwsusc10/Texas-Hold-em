import { GamePlayerType, GamePlayType, PlayerNodeType, UserType } from '@/model';

export const initialUser: UserType = {
  id: 0,
  user_name: '',
  email: '',
  profile: null,
  chips: 0,
  gameLogs: {
    total: 0,
    logIds: []
  },
  created_at: new Date(),
  updated_at: new Date(),
  state: 'A'
};

export const initialPlayer: GamePlayerType = {
  ...initialUser,
  gameChips: 0,
  hand: [],
  status: 'wait',
  action: {
    amount: 0,
    type: 'yet'
  }
};

export const initialPlayerNode: PlayerNodeType = {
  player: initialPlayer,
  seat: -1,
  next: null
};

export const initialGamePlayValue: GamePlayType = {
  roomId: '0',
  isPlaying: false,
  blind: 0,
  time: 0,
  type: 'public',
  phase: 'preFlop',
  pot: {
    main: { total: 0, current: 0 },
    side: []
  },
  currentBet: JSON.parse(JSON.stringify(initialPlayerNode)),
  position: {
    dealer: JSON.parse(JSON.stringify(initialPlayerNode)),
    bb: JSON.parse(JSON.stringify(initialPlayerNode)),
    sb: JSON.parse(JSON.stringify(initialPlayerNode)),
    turn: JSON.parse(JSON.stringify(initialPlayerNode))
  },
  board: [],
  winners: [],
  playerList: {
    head: null,
    length: 0
  }
};
