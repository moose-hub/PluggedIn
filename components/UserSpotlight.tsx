import Link from "next/link";
import Image from "next/image";
import { FaEllipsisVertical } from "react-icons/fa6";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function UserSpotlight() {
  const href = "/profile";
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
        flex items-center 
        text-xl 
        p-2 rounded-full
        hover:cursor-pointer 
        hover:bg-pi-offwhite-shadow"
      >
        <FaEllipsisVertical />
      </div>
    </div>
  );
}
