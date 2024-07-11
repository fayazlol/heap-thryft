import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '../../lib/dbConnect';
import User from '@/models/user';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ profilePicture: '/default-profile.png' }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user?.email });

  if (user && user.profilepicture) {
    return NextResponse.json({ profilePicture: user.profilepicture });
  } else {
    return NextResponse.json({ profilePicture: '/default-profile.png' });
  }
}
