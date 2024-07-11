'use client';

import React from 'react';
import { Avatar, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, DropdownSection } from "@nextui-org/react";
import { useUserProfilePicture} from '@/app/lib/useUserProfilePicture';
import { useRouter } from 'next/navigation';
import { useSession,signOut } from 'next-auth/react';



const NavPfp: React.FC = () => {
  const { profilePicture, loading } = useUserProfilePicture();
  const { data: session }: any = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    signOut();
};



  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Dropdown>
    <DropdownTrigger>
    <Avatar
      src={profilePicture}
      alt="Profile Picture"
      style={{ cursor: 'pointer' }}
    />
    </DropdownTrigger>
                                        <DropdownMenu aria-label="User Actions">
                                            <DropdownSection>
                                                <DropdownItem key="User Profile" onClick={() => router.push('/userprofile')} className="text-black hover:text-blue-500">
                                                    My Profile
                                                </DropdownItem>
                                                <DropdownItem key="My Listings" onClick={() => router.push('/userprofile/mylistings')} className="text-black hover:text-blue-500">
                                                My Listings
                                                </DropdownItem>
                                                <DropdownItem key="My Favourites" onClick={() => router.push('/userprofile/favourites')} className="text-black hover:text-blue-500">
                                                My Favourites
                                                </DropdownItem>
                                                <DropdownItem key="My Orders" onClick={() => router.push('/userprofile/orders')} className="text-black hover:text-blue-500">
                                                    My Orders
                                                </DropdownItem>
                                                <DropdownItem key="logout" className="text-black hover:text-red-500" onClick={handleLogout}>
                                                    Sign Out
                                                </DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
  );
};

export default NavPfp;
