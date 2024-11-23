// user
export type UserType = {
  id: number;
  user_name: string;
  email: string;
  profile: string | null;
  chips: number;
  gameLogs: HandIdsType;
  created_at: Date;
  updated_at: Date;
  state: 'A' | 'D';
};

export type GameRoomsType = {
  blind200: {
    rooms: GamePlayType[];
    total: number;
  };
  blind400: {
    rooms: GamePlayType[];
    total: number;
  };
  blind500: {
    rooms: GamePlayType[];
    total: number;
  };
};

export type HandIdsType = {
  total: number;
  logIds: number[];
};

// navBar
export type NavBarItem = {
  href: string;
  label: string;
};

export type CardType =
  | 'As'
  | 'Ad'
  | 'Ah'
  | 'Ac'
  | 'Ks'
  | 'Kd'
  | 'Kh'
  | 'Kc'
  | 'Qs'
  | 'Qd'
  | 'Qh'
  | 'Qc'
  | 'Js'
  | 'Jd'
  | 'Jh'
  | 'Jc'
  | 'Ts'
  | 'Td'
  | 'Th'
  | 'Tc'
  | '9s'
  | '9d'
  | '9h'
  | '9c'
  | '8s'
  | '8d'
  | '8h'
  | '8c'
  | '7s'
  | '7d'
  | '7h'
  | '7c'
  | '6s'
  | '6d'
  | '6h'
  | '6c'
  | '5s'
  | '5d'
  | '5h'
  | '5c'
  | '4s'
  | '4d'
  | '4h'
  | '4c'
  | '3s'
  | '3d'
  | '3h'
  | '3c'
  | '2s'
  | '2d'
  | '2h'
  | '2c';

export type ActionType = {
  amount: number;
  type: 'wait' | 'fold' | 'bet' | 'check' | 'call' | 'raise' | 're-raise' | 'all-in';
};

export type GamePlayerType = UserType & {
  gameChips: number;
  hand: CardType[];
  action: ActionType;
};

export type GamePlayType = {
  roomId: string;
  isPlaying: boolean;
  blind: number;
  time: number;
  type: 'public' | 'private';
  phase: 'preFlop' | 'flop' | 'turn' | 'river' | 'showdown';
  pot: {
    total: number;
    current: number;
  };
  position: {
    dealer: number;
    bb: number;
    sb: number;
    turn: number;
    nextTurn: number;
  };
  board: CardType[];
  playerNumber: number;
  seat: {
    1: GamePlayerType | null;
    2: GamePlayerType | null;
    3: GamePlayerType | null;
    4: GamePlayerType | null;
    5: GamePlayerType | null;
    6: GamePlayerType | null;
    7: GamePlayerType | null;
    8: GamePlayerType | null;
    9: GamePlayerType | null;
  };
};

export type PublicRoomBlind = 200 | 400 | 500;
