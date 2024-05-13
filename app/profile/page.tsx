"use client";
import React, { useEffect, useState } from "react";

interface UserProfileProps {
  profileImage: string;
  name: string;
  bio: string;
  username: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserProfileProps | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Simulated fetch response
      const dummyData: UserProfileProps = {
        profileImage: "https://i.pravatar.cc/300",
        name: "Rhy$ Po$tan$",
        bio: "Giver of RNC's",
        username: "RhMoPo",
      };

      // Simulate a fetch delay
      setTimeout(() => {
        setUserData(dummyData);
      }, 1000);
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 items-start gap-1">
        <img
          src={userData.profileImage}
          alt="Profile"
          className="rounded-xl w-64 h-64 object-cover col-span-1"
        />
        <div className="flex flex-col col-span-1">
          <h1 className="text-6xl font-bold">{userData.name}</h1>
          <p className="text-sm text-gray-600">@{userData.username}</p>
          <p className="text-center mt-2">{userData.bio}</p>
          <div className="mt-4 h-1 bg-gray"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
