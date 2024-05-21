"use client";
import { User } from "@supabase/supabase-js";
import useSWR from "swr";
import { toast } from "sonner";

import useAuthModal from "@/stores/useAuthModal";
import { useAuth } from "@/hooks/useAuth";

const LoginButton = () => {
  const authModal = useAuthModal();

  const { user, isLoading, error, signOut } = useAuth();

  const handleSignIn = () => {
    authModal.onOpen;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        className="
              font-bold text-white 
            bg-pi-purple-main 
              p-2 w-full
              rounded-full
            "
        onClick={handleSignIn}
      >
        Login
      </button>
    </>
  );
};

export default LoginButton;
