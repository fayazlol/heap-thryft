"use client";

import React from 'react';
import { Card, Button, Image, Link, CardFooter, CardBody } from "@nextui-org/react";

interface User {
  _id: string;
  username: string;
  profilepicture: string;
}

interface ShopByUsersProps {
  users: User[];
}

const ShopByUsers: React.FC<ShopByUsersProps> = ({ users }) => {
  
  const getRandomUsers = (users: User[], count: number): User[] => {
    const shuffled = [...users].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomUsers = getRandomUsers(users, 5);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <b className="text-2xl text-black px-4 py-4">Shop by Users</b>
        <Link href="/allusers" className="flex justify-end px-5">
          <b className="text-blue-500 hover:underline">see all &rarr;</b>
        </Link>
      </div>
      <div className='grid md:grid-cols-5 auto-rows-[300px] gap-4 px-4'>
        {randomUsers.map((user) => (
          <Link key={user._id} href={`/users/${user.username}`}>
            <Card
              className="w-full h-full overflow-hidden radius-lg md:col-span-1 relative"
              isHoverable
              isPressable
              isBlurred
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  isBlurred
                  radius="lg"
                  width='100%'
                  height='100%'
                  alt='profile picture'
                  className="w-full object-cover h-[260px]"
                  src={user.profilepicture}
                />
              </CardBody>
              <CardFooter className="text-xl justify-center">
                <b>@{user.username}</b>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
)
};
export default ShopByUsers;