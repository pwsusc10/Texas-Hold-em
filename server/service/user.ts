import { HandIdsType, UserType } from '@/model';
import { RowDataPacket } from 'mysql2';
import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { db } from '../db/db';

export const findUser = async (email: string): Promise<UserType | null> => {
  let connection;
  try {
    connection = await db.getConnection();
    const query = "SELECT * FROM `hold'em`.`user` WHERE `email` = ?;";
    const [rows] = await connection.execute<RowDataPacket[]>(query, [email]);
    const gameLogs = await getUserGameLogIds(rows[0].id);

    return { ...rows[0], gameLogs } as UserType;
  } catch (error) {
    console.error('next-auth checkUser function Error: ', error);
    return null;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const getUserGameLogIds = async (userId: number): Promise<HandIdsType | null> => {
  let connection;
  try {
    connection = await db.getConnection();
    const query =
      "SELECT * FROM `hold'em`.`game_log` WHERE (player_1 = ? OR player_2 = ? OR player_3 = ? OR player_4 = ? OR player_5 = ? OR player_6 = ? OR player_7 = ? OR player_8 = ? OR player_9 = ?) AND state = 'A' ORDER BY created_at DESC;";
    const [rows] = await connection.execute<RowDataPacket[]>(query, [userId, userId, userId, userId, userId, userId, userId, userId, userId]);

    const logIds = rows.map(row => row.id);
    return {
      total: logIds.length,
      logIds
    };
  } catch (error) {
    console.error('getUserGameLog function Error: ', error);
    return null;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const addUser = async (user: User | AdapterUser): Promise<number | null> => {
  let connection;
  try {
    connection = await db.getConnection();
    const query = "INSERT INTO `hold'em`.`user` (`user_name`, `email`, `profile`, `chips`) VALUES (?, ?, ?, ?);";
    await db.execute(query, [user.name, user.email, user.image, 0]);
    const getIdQuery = "SELECT MAX(id) FROM `hold'em`.user;";
    const [result] = await connection.execute<RowDataPacket[]>(getIdQuery);
    const { 'MAX(id)': maxId } = result[0];

    return maxId;
  } catch (error) {
    console.error('next-auth addUser function Error: ', error);
    return null;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
