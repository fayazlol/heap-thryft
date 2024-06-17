import User from "@/models/user";
import  bcrypt  from "bcryptjs"
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";

export const POST = async (request: any) => {
  const { username, email, password, profilepicture } = await request.json();

  await dbConnect();

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return new NextResponse("Email is already in use", { status: 400 });
    }
    if (existingUser.username === username) {
      return new NextResponse("Username is already in use", { status: 400 });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const defaultpic = '/ballingcat.jpeg'

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilepicture: defaultpic
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
