import Link from "next/link";
import Image from "next/image";
import DropDown from "./DropDown";
import { useAuth } from "@/hooks/useAuth";

export default function UserSpotlight() {
  const href = "/profile";
  const { user, isLoading, error, signOut } = useAuth();

  const handleEditProfile = () => {};

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    { label: "Edit Profile", onClick: handleEditProfile },
    { label: "Sign Out", onClick: handleSignOut },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            Gizmo
          </span>
          <span className="text-sm font-normal tracking-normal text-black/70">
            London, UK
          </span>
        </div>
      </div>
      <div
        className="
        "
      >
        <DropDown menuItems={menuItems} />
      </div>
    </div>
  );
}
