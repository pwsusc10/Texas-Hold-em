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
  type: 'yet' | 'sb' | 'bb' | 'fold' | 'bet' | 'check' | 'call' | 'raise' | 're-raise' | 'all-in';
};

export type GamePlayerType = UserType & {
  gameChips: number;
  hand: CardType[];
  status: 'play' | 'away' | 'wait'; // 게임 진행, 자리 비움, 대기
  action: ActionType;
};

export type PublicRoomBlind = 200 | 400 | 500;

export type SidePotType = {
  total: number;
  player: PlayerNodeType;
};

export type GamePlayType = {
  roomId: string;
  isPlaying: boolean;
  blind: number;
  time: number;
  type: 'public' | 'private';
  phase: 'preFlop' | 'flop' | 'turn' | 'river' | 'showdown';
  board: CardType[];
  pot: {
    main: {
      total: number;
      current: number;
    };
    side: SidePotType[];
  };
  currentBet: PlayerNodeType;
  position: {
    dealer: PlayerNodeType;
    bb: PlayerNodeType;
    sb: PlayerNodeType;
    turn: PlayerNodeType;
  };
  winners: SidePotType[];
  playerList: PlayerListType;
};

export type PlayerNodeType = {
  player: GamePlayerType;
  seat: number;
  next: PlayerNodeType | null;
};

export type PlayerListType = {
  head: PlayerNodeType | null;
  length: number;
};

export type ChipValueType = 100 | 1000 | 5000 | 10000 | 100000;
