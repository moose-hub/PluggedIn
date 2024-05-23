import { useAuth } from "@/hooks/useAuth";
import useAuthModal from "@/stores/useAuthModal";
import UserSpotlight from "./UserSpotlight";
import { toast } from "sonner";

const LoginButton = () => {
  const { user, isLoading, error, signOut } = useAuth();
  const authModal = useAuthModal();

  const handleSignIn = () => {
    authModal.onOpen();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return toast.error(error.message);

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
