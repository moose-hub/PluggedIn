import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DropDown from "./DropDown";
import { useAuth } from "@/hooks/useAuth";
import fetchSwipeCount from "@/utils/fetchSwipes";
import { createClient } from "@/utils/supabase/component";

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

interface MenuItem {
  label: string;
  onClick: () => void;
}

const UserSpotlight: React.FC = () => {
  const href = "/profile";
  const { user, isLoading, error, signOut } = useAuth();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loadingEmail, setLoadingEmail] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<Error | null>(null);
  const [swipeCount, setSwipeCount] = useState<number>(0);

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

    const getSwipeCount = async () => {
      if (user) {
        const count = await fetchSwipeCount(user.id);
        setSwipeCount(count);
      }
    };

    if (user) {
      getUserEmail();
      getSwipeCount();
    }
  }, [user]);

  const handleEditProfile = () => {};

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

  if (isLoading || loadingEmail) {
    return <div>Loading...</div>;
  }

  if (error || emailError) {
    return <div>Error: {error?.message ?? emailError?.message}</div>;
  }

  const userName = userEmail ? userEmail.split("@")[0] : "";

  return (
    <div className="flex items-center w-full">
      <div className="flex items-center w-80">
        <Link href={href}>
          <Image
            src="/avatars/mouse.jpg"
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
