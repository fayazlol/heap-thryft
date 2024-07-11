
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { UploadButton } from "@/app/lib/uploadthing";
import { maxHeaderSize } from "http";

interface EditProfileProps {
  user: {
    username: string;
    email: string;
    profilepicture: string;
    bannerpicture: string;
    bio:string;
  };
}

const EditProfile: React.FC<EditProfileProps> = ({ user }) => {
  const [profilePic, setProfilePic] = useState(user.profilepicture);
  const [bannerPic, setBannerPic] = useState(user.bannerpicture);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const username = user.username;
  const router = useRouter();

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, profilePic, bannerPic, bio, username })
      });

      const data = await response.json();

      if (data.success) {
        alert('Profile updated successfully');
        router.push('/userprofile');
      } else {
        alert(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSaveProfile();
  };

  return (
    <main className="bg-[#fafafa] min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4 text-black">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <h3 className="text-2xl font-semibold text-[#6b7280] mb-1">Banner</h3>
          <Image src={bannerPic} alt="Banner Picture" layout="responsive" width={1000} height={50} className="mx-auto max-w-full mb-6" />
          <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  setBannerPic(res[0].url);
                  alert('Banner picture uploaded successfully.');//change to toast?
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="mb-2"
            />
          <h3 className="text-2xl font-semibold text-[#6b7280] mb-1">Profile Picture</h3>
            <Image src={profilePic} alt="Profile Picture" width={100} height={100} className="rounded-full mx-auto mb-4 border-slate-500" />
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  setProfilePic(res[0].url);
                  alert('Profile picture uploaded successfully.');
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              className="mb-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-black mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-black mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-left text-black mb-2">Bio</label>
          <textarea
              name="Biography"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter a cool bio!"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black"
              required
            />
            </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
