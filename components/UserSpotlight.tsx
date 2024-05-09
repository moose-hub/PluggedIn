import { FaCircleUser } from "react-icons/fa6";

export default function UserSpotlight() {
  return (
    <div className="flex items-center">
      <FaCircleUser fill="black" className="mr-2 h-14 w-14" />
      <div className="flex flex-col">
        <span className="text-1xl font-bold tracking-normal text-black/60">
          User Name
        </span>
        <span className="text-sm font-normal tracking-normal text-black/60">
          Location, UK
        </span>
      </div>
    </div>
  );
}
