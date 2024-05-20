"use client";
import { User } from "@supabase/supabase-js";
import useSWR from "swr";
import { toast } from "sonner";

import useAuthModal from "@/stores/useAuthModal";
import { useAuth } from "@/hooks/useAuth";

const LoginButton = () => {
  const authModal = useAuthModal();

  const { user, isLoading, error, signOut } = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const {
  //         data: { user },
  //       } = await supabase.auth.getUser();
  //       setUser(user);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false); // Set loading to false after fetching
  //     }
  //   };

  //   fetchData();
  // }, [supabase]);

  const handleSignIn = () => {
    authModal.onOpen();
  };

  const handleSignOut = async () => {
    const response = await signOut();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user ? (
        <>
          <button onClick={handleSignOut}>Logout</button>
          <div>Welcome, {user.email}</div> {/* Display user email */}
        </>
      ) : (
        <>
          <button
            className="
              font-bold text-white 
            bg-pi-purple-main 
              p-2 w-full
              rounded-full
            "
            onClick={() => toast("this a sandwich")}
          >
            Login
          </button>
        </>
      )}
    </>
  );
};

export default LoginButton;
