import SongList from "@/components/SongList";

export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-28">
        Home
      </h1>
      <SongList />
    </div>
  );
}
