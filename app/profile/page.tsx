"use client";

import React, { useEffect, useState } from "react";

import ContributionForm from "@/components/ContributeBtn";
import Followbtn from "@/components/Follow";
import UploadedSongs from "@/components/Library";
import Liked from "@/components/Profile/Likes/likesRender";

interface UserProfileProps {
  profileImage: string;
  name: string;
  bio: string;
  username: string;
}

const Profile = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
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

  const content = () => {
    switch (activeButton) {
      case 1:
        return <p>Library content goes here</p>;
      case 2:
        return <Liked />;
      case 3:
        return <p>contributions go down here</p>;
      default:
        return <p> </p>;
    }
  };

  return (
    <>
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
            <h1 className="text-6xl font-bold">
              {userData.name}{" "}
              <div
                className="flex items-center py-1"
                style={{ display: "inline" }}
              >
                <Followbtn />
              </div>
            </h1>
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
        ></div>
      </div>
      <div className=" justify-center min-h-screen py-2">
        <div className=" space-x-4">
          <button
            className="px-4 py-2 border-4"
            onClick={() => {
              setActiveButton(1);
            }}
          >
            Library{" "}
          </button>
          <button
            className="px-4 py-2 border-4"
            onClick={() => {
              setActiveButton(2);
            }}
          >
            Likes
          </button>
          <button
            className="px-4 py-2 border-4"
            onClick={() => {
              setActiveButton(3);
            }}
          >
            Contribute
          </button>
        </div>
        <div className="border-b-2 border-gray-300 w-full my-4"></div>
        <div className="content mt-4">{content()}</div>
      </div>
    </>
  );
};

export default Profile;

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-start gap-4">
//         {" "}
//         {/* Change to flex for inline layout */}
//         <img
//           src={userData.profileImage}
//           alt="Profile"
//           className="rounded-3xl w-64 h-64 object-cover mb-6 border-4 border-pi-purple-main" // Removed col-span-1
//         />
//         <div className="flex flex-col justify-start mt-5">
//           {" "}
//           <h1 className="text-6xl font-bold">
//             {userData.name}{" "}
//             <div
//               className="flex items-center py-1"
//               style={{ display: "inline" }}
//             >
//               <Followbtn />
//             </div>
//           </h1>
//           <p className="text-sm text-gray-600">@{userData.username}</p>
//           <p className="text-md mt-2">{userData.bio}</p>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >

//       </div>
//     </div>
//   );
// };

// export default Profile;

// <div className="flex flex col-3 mt-4 h-1 bg-gray-300 w-full">
//           <div>
//             <UploadedSongs />
//           </div>
//           <div>
//             <Review />
//           </div>
//           <div>
//             <ContributionForm />
//           </div>
//         </div>

// const Profile = () => {
