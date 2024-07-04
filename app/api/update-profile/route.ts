// app/api/update-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import User from '../../../models/user';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, profilePic } = await req.json();

    if (!email || !profilePic) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const user = await User.findOneAndUpdate(
      { email }, // Assuming email is the unique identifier, adjust as necessary
      { profilepicture: profilePic },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
