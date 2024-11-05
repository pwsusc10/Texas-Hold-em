import db from '../db/db';
import { HandIdsType, UserType } from '@/model';
import { RowDataPacket } from 'mysql2';
import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

export const findUser = async (email: string): Promise<UserType | null> => {
  try {
    const query = "SELECT * FROM `hold'em`.`user` WHERE `email` = ?;";
    const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

    const gameLogs = await getUserGameLogIds(rows[0].id);
    return { ...rows[0], gameLogs } as UserType;
  } catch (error) {
    console.error('next-auth checkUser function Error: ', error);
    return null;
  }
};

export const getUserGameLogIds = async (userId: number): Promise<HandIdsType | null> => {
  try {
    const query =
      "SELECT * FROM `hold'em`.`game_log` WHERE (player_1 = ? OR player_2 = ? OR player_3 = ? OR player_4 = ? OR player_5 = ? OR player_6 = ? OR player_7 = ? OR player_8 = ? OR player_9 = ?) AND state = 'A' ORDER BY created_at DESC;";
    const [rows] = await db.execute<RowDataPacket[]>(query, [userId, userId, userId, userId, userId, userId, userId, userId, userId]);

    const logIds = rows.map(row => row.id);
    return {
      total: logIds.length,
      logIds
    };
  } catch (error) {
    console.error('getUserGameLog function Error: ', error);
    return null;
  }
};

export const addUser = async (user: User | AdapterUser): Promise<boolean> => {
  try {
    const query = "INSERT INTO `hold'em`.`user` (`user_name`, `email`, `profile`, `chips`) VALUES (?, ?, ?, ?);";
    const [rows] = await db.execute(query, [user.name, user.email, user.image, 0]);

    return true;
  } catch (error) {
    console.error('next-auth addUser function Error: ', error);
    return false;
  }
};
