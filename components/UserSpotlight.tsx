import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropDown from "./DropDown";
import { useAuth } from "@/hooks/useAuth";
import fetchSwipeCount from "@/utils/fetchSwipes";
import { createClient } from "@/utils/supabase/component";
import useEditProfileModal from "@/stores/useEditProfileModal";
import { useUserData } from "@/hooks/useUserData";
import { useUserDataStore } from "@/stores/useUserData";

const supabase = createClient();

const fetchUserEmail = async (): Promise<string | null> => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(userError.message);
    }

    if (!user) {
      throw new Error("User is not logged in");
    }

    const userEmail = user.email;

    if (!userEmail) {
      throw new Error("User email not found");
    }

    return userEmail;
  } catch (error) {
    console.error("Error fetching user email", error);
    return null;
  }
};

const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("avatar_url")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null;
  }
};

interface MenuItem {
  label: string;
  onClick: () => void;
}

const UserSpotlight: React.FC = () => {
  const { user, isLoading: authLoading, error: authError, signOut } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loadingEmail, setLoadingEmail] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<Error | null>(null);
  const [swipeCount, setSwipeCount] = useState<number>(0);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const setUser = useUserDataStore((state) => state.setUser);
  const editProfileModal = useEditProfileModal();
  const { userData, loading, error } = useUserData(user?.id || "");

  const profileLink = `/profile/${user?.id}`;

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const email = await fetchUserEmail();
        setUserEmail(email);
      } catch (error) {
        setEmailError(error as Error);
      } finally {
        setLoadingEmail(false);
      }
    };

    const getUserProfile = async () => {
      if (user) {
        const profile = await fetchUserProfile(user.id);
        if (profile) {
          setAvatarUrl(profile.avatar_url);
        }
      }
    };

    const getSwipeCount = async () => {
      if (user) {
        const count = await fetchSwipeCount(user.id);
        setSwipeCount(count);
      }
    };

    if (user) {
      setUser(user); // Set user in Zustand store
      getUserEmail();
      getUserProfile();
      getSwipeCount();
    }
  }, [user, setUser]);

  const handleEditProfile = () => {
    editProfileModal.onOpen();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems: MenuItem[] = [
    { label: "Edit Profile", onClick: handleEditProfile },
    { label: "Sign Out", onClick: handleSignOut },
  ];

  if (authLoading || loadingEmail || loading) {
    return <div>Loading...</div>;
  }

  if (authError || emailError || error) {
    return (
      <div>
        Error: {authError?.message ?? emailError?.message ?? error?.message}
      </div>
    );
  }

  const userName = userData?.username
    ? userData.username
    : userEmail
      ? userEmail.split("@")[0]
      : "";
  const userAvatar =
    `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${userData?.avatar_url}` ||
    "https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/image-placeholder-profile.png";

  return (
    <div className="flex items-center w-full">
      <div className="flex items-center w-80">
        <Link href={profileLink}>
          <Image
            src={userAvatar}
            alt="User avatar"
            width={100}
            height={100}
            className="mr-2 h-14 w-14 rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <span className="text-1xl font-bold tracking-normal text-black/80">
            {userName}
          </span>
          <span className="text-sm font-normal tracking-normal text-black/70">
            Swipes: {swipeCount}
          </span>
        </div>
      </div>
      <div>
        <DropDown menuItems={menuItems} />
      </div>
    </div>
  );
};

export default UserSpotlight;
