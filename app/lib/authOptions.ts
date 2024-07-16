
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import dbConnect from "@/app/lib/dbConnect";

export const authOptions: any = {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          usernameOrEmail: { label: "Username or Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          await dbConnect();
          try {
            const query = credentials.usernameOrEmail.includes("@")
              ? { email: credentials.usernameOrEmail }
              : { username: credentials.usernameOrEmail };
            const user = await User.findOne(query);
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account }: { user: AuthUser; account: Account }) {
        if (account?.provider == "credentials") {
          return true;
        }
        return false;
      },
    },
  };