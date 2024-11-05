import { NextRequest, NextResponse } from 'next/server';
import { getRooms } from '../../../../../server/service/room';

export async function GET(req: NextRequest) {
  const result = await getRooms();

  if (result === null) {
    return NextResponse.json({ message: 'Rooms not found' }, { status: 404 });
  }

  let total200 = 0;
  result.blind200.forEach(room => {
    total200 += room.player_number;
  });

  let total400 = 0;
  result.blind400.forEach(room => {
    total400 += room.player_number;
  });

  let total500 = 0;
  result.blind500.forEach(room => {
    total500 += room.player_number;
  });

  return NextResponse.json(
    {
      blind200: { rooms: result.blind200, total: total200 },
      blind400: { rooms: result.blind400, total: total400 },
      blind500: { rooms: result.blind500, total: total500 }
    },
    { status: 200 }
  );
}
