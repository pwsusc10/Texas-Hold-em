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

export type GameRoomType = {
  id: number;
  blind: number;
  time: number;
  type: 'public' | 'private';
  player_number: number;
  created_at: Date;
  updated_at: Date;
  state: 'A' | 'D';
};

export type BlindRoomsType = {
  blind200: GameRoomType[];
  blind400: GameRoomType[];
  blind500: GameRoomType[];
};

export type BlindRoomsWithTotalType = {
  blind200: { rooms: GameRoomType[]; total: number };
  blind400: { rooms: GameRoomType[]; total: number };
  blind500: { rooms: GameRoomType[]; total: number };
};
