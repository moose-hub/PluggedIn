"use client";
import { useParams } from "next/navigation";
import Profile from "@/components/ProfilePage/Profile";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";

const DefaultProfilePage = () => {
  const { user } = useAuth();
  const { userid } = useParams();
  const profileId = userid?.toString();
  const userId = user?.id.toString();
  const { userData, loading, error } = useUserData(
    profileId ? profileId : userId || "",
  );

  if (error) {
    toast.error("Failed to load user data");
    return <div>Error loading user data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Profile user={userData} />;
};

export default DefaultProfilePage;
