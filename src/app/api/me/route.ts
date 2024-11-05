import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { findUser } from '../../../../server/service/user';
export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await findUser(token.email as string);
  if (result === null) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } else {
    return NextResponse.json({ user: result }, { status: 200 });
  }
}
