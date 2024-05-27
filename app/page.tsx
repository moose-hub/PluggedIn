import GenreHighlight from "@/components/GenreHighlight";
import NewReleases from "@/components/NewReleases";
import SongList from "@/components/SongList";

export default function Home({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex flex-col gap-8 overflow-y-auto overflow-x-hidden">
      <GenreHighlight />
      <NewReleases />
      <SongList />
    </div>
  );
}
