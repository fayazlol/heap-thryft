import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/lib/SessionProvider";
import {NextUIProvider} from "@nextui-org/system";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thryft ◡̈",
  description: "idk bro",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <NextUIProvider>
      <SessionProvider session={session}>
      <body className={inter.className}><Navbar />{children}</body>
      </SessionProvider>
      </NextUIProvider>
    </html>
  );
}
