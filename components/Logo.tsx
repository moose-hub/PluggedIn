import Image from "next/image";

export default function Logo() {
    return (
    <>
        <Image
          width="10"
          height="10"
          src="/plug.png"
          className="h-20 mr-3"
          alt="Logo"
        />
        <span className="self-center text-4xl font-semibold whitespace-nowrap text-plugged-in-purple">
          Plugged in
            </span>
    </>
    );
}
