import Link from "next/link";
import LoginPanel from "../components/LoginPanel";

export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex flex-col text-center">
      <h1>Plugged-in</h1>
      <LoginPanel searchParams={searchParams} />
    </div>
  );
}
