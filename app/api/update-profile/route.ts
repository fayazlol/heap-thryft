import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/models/user';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { username, email, profilePic, bannerPic, bio } = await req.json();

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    user.email = email || user.email;
    user.profilepicture = profilePic || user.profilepicture;
    user.bannerpicture = bannerPic || user.bannerpicture;
    user.bio = bio || user.bio;

    await user.save();

    return NextResponse.json({ success: true, message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
