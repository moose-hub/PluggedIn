import SongList from "@/components/SongList";

export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="overflow-y-auto">
      <SongList />
    </div>
  );
}
