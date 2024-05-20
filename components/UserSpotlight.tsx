import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default function UserSpotlight() {
  const href = "/profile";
  return (
    <div className="flex items-center">
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
        <Link href={href}>
          <span className="text-1xl font-bold tracking-normal text-black/80">
            Gizmo
          </span>
        </Link>
        <span className="text-sm font-normal tracking-normal text-black/70">
          London, UK
        </span>
      </div>
    </div>
  );
}
