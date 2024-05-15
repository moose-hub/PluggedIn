"use client";

import React, { useEffect, useState } from "react";

import ContributionForm from "@/components/ContributeBtn";
import Followbtn from "@/components/Follow";
import Review from "@/components/Reviews";
import UploadedSongs from "@/components/Library";

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
        name: "Monty Postans",
        bio: "Lorem givsum",
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
      <div className="flex items-start gap-4">
        {" "}
        {/* Change to flex for inline layout */}
        <img
          src={userData.profileImage}
          alt="Profile"
          className="rounded-3xl w-64 h-64 object-cover mb-6 border-4 border-pi-purple-main" // Removed col-span-1
        />
        <div className="flex flex-col justify-start mt-5">
          {" "}
          <h1 className="text-6xl font-bold">{userData.name}</h1>
          <p className="text-sm text-gray-600">@{userData.username}</p>
          <p className="text-md mt-2">{userData.bio}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="flex flex col-3 ">
          <div>
            <UploadedSongs />
          </div>
          <div>
            <Review />
          </div>
          <div>
            <ContributionForm />
          </div>
        </div>
        <div className="flex items-center py-1">
          <Followbtn />
        </div>
      </div>
      {/*<div className="mt-4 h-1 bg-gray-300 w-full"></div>*/}
    </div>
  );
};

export default Profile;
