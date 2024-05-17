import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Image
        width={75}
        height={75}
        src="/plug.png"
        className="mr-3"
        alt="Logo"
      />
      <span className="text-4xl font-extrabold whitespace-nowrap text-pi-purple-main">
        Plugged In
        <span className="text-pi-purple-main relative top-[15px] right-[43px] text-sm">
          Music
        </span>
      </span>
    </>
  );
}
