// user
export type UserType = {
  id: number;
  user_name: string;
  email: string;
  profile: string | null;
  chips: number;
  gameLogs: HandIdsType;
  CREATED_AT: Date | null;
  UPDATED_AT: Date | null;
  DELETE_AT: Date | null;
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
