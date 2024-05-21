import { useAuth } from "@/hooks/useAuth";
import useAuthModal from "@/hooks/useAuthModal";
import UserSpotlight from "./UserSpotlight";

const LoginButton = () => {
  const { user, isLoading, error, signOut } = useAuth();
  const authModal = useAuthModal();

  const handleSignIn = () => {
    authModal.onOpen();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return user ? (
    <UserSpotlight />
  ) : (
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
  );
};

export default LoginButton;
