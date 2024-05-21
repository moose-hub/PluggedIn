import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaEllipsisVertical } from "react-icons/fa6";

const DropDown = ({ menuItems }: { menuItems: any }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center 
          text-xl 
          p-2 rounded-full
          outline-none
          hover:cursor-pointer 
          hover:bg-pi-offwhite-shadow"
          aria-label="Customise options"
        >
          <FaEllipsisVertical />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="
            text-sm font-medium 
            min-w-36 p-1 
            bg-white
            rounded-md 
            z-50"
          sideOffset={5}
          side="top"
          align="center"
        >
          {menuItems.map((item: any, index: number) => (
            <DropdownMenu.Item
              key={index}
              className="
                px-4 py-2
                outline-none
                rounded-md 
                hover:bg-pi-purple-main
                hover:text-pi-offwhite-main
                hover:cursor-pointer
                transition-colors
                "
              onClick={item.onClick}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="fill-pi-offwhite-main" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDown;
