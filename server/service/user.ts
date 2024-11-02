import db from '../db/db';
import { UserType } from '@/model';
import { RowDataPacket } from 'mysql2';
import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

export const checkUser = async (email: string): Promise<UserType | null> => {
  try {
    const query = "SELECT * FROM `hold'em`.`users` WHERE `email` = ?;";
    const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

    return rows[0] as UserType;
  } catch (error) {
    console.error('next-auth checkUser function Error: ', error);
    return null;
  }
};

export const addUser = async (user: User | AdapterUser): Promise<boolean> => {
  try {
    const query = "INSERT INTO `hold'em`.`users` (`userName`, `email`, `profile`, `chips`, `handCounts`) VALUES (?, ?, ?, ?, ?);";
    const [rows] = await db.execute(query, [user.name, user.email, user.image, 0, 0]);

    return true;
  } catch (error) {
    console.error('next-auth addUser function Error: ', error);
    return false;
  }
};
