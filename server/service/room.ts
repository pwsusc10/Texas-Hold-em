import { RowDataPacket } from 'mysql2';
import db from '../db/db';
import { BlindRoomsType, GameRoomType } from '@/model';

export const getRooms = async (): Promise<BlindRoomsType | null> => {
  try {
    const query1 = "SELECT * FROM `hold'em`.game_room where type = 'public' AND blind = 200 AND state = 'A';";
    const query2 = "SELECT * FROM `hold'em`.game_room where type = 'public' AND blind = 400 AND state = 'A';";
    const query3 = "SELECT * FROM `hold'em`.game_room where type = 'public' AND blind = 500 AND state = 'A';";
    const [result1] = await db.execute<RowDataPacket[]>(query1);
    const [result2] = await db.execute<RowDataPacket[]>(query2);
    const [result3] = await db.execute<RowDataPacket[]>(query3);

    return {
      blind200: result1 as GameRoomType[],
      blind400: result2 as GameRoomType[],
      blind500: result3 as GameRoomType[]
    };
  } catch (error) {
    console.error('getRooms function Error: ', error);
    return null;
  }
};
