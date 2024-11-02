// user
export type UserType = {
  id: number;
  userName: string;
  email: string;
  profile: string | null;
  chips: number;
  handCounts: number;
  CREATED_AT: Date | null;
  UPDATED_AT: Date | null;
  DELETE_AT: Date | null;
};

// navBar
export type NavBarItem = {
  href: string;
  label: string;
};
