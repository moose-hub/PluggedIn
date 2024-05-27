"use client";
import { useParams } from "next/navigation";
import Profile from "@/components/ProfilePage/Profile";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";

const ProfilePage = () => {
  const { userid } = useParams();
  const profileId = userid.toString();
  const { userData, loading, error } = useUserData(profileId);

  if (error) {
    toast.error("Failed to load user data");
    return <div>Error loading user data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Profile user={userData} />;
};

export default ProfilePage;
