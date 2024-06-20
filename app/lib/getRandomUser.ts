// app/lib/randomfiveusers.ts

import mongoose from 'mongoose';
import User from '@/models/user';

const getRandomDocumentsArray = async (n: number): Promise<any[]> => {
  try {
    // Ensure mongoose connection is established
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    const randomDocs = await User.aggregate([{ $sample: { size: n } }]);

    // Convert MongoDB documents to plain JavaScript objects
    const users = randomDocs.map(user => ({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return users;
  } catch (error) {
    console.error('Error fetching random users:', error);
    return [];
  }
};

export default getRandomDocumentsArray;
