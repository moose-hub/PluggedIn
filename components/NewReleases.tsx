"use client";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { currentSong as useCurrentSong } from "@/hooks/useCurrentSong";
import fetchSongs from "@/utils/fetchSongs";
import { Database } from "@/types_db";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const NewReleases = () => {
  const { data: songList, error } = useSWR<Song[] | undefined>(
    "songs",
    fetchSongs,
  );
  const { setCurrentSong } = useCurrentSong();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [maxSongColumns, setMaxSongColumns] = useState(10);

  const handlePlay = async (song: Song) => {
    setCurrentSong(song);
  };

  useEffect(() => {
    const updateMaxColumns = () => {
      if (containerRef.current && itemRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = itemRef.current.offsetWidth;
        const newMaxColumns = Math.floor(containerWidth / itemWidth);
        setMaxSongColumns(newMaxColumns);
      }
    };

    updateMaxColumns();
    window.addEventListener("resize", updateMaxColumns);

    return () => {
      window.removeEventListener("resize", updateMaxColumns);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && itemRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const itemWidth = itemRef.current.offsetWidth;
      const newMaxColumns = Math.floor(containerWidth / itemWidth);
      setMaxSongColumns(newMaxColumns);
    }
  }, [songList]);

  if (error) return <div>Failed to load song list</div>;

  if (!songList)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  const newSongList = [...songList]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, maxSongColumns);

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl mx-4 font-bold">New Releases</h2>
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4"
        >
          {newSongList.map((song, index) => (
            <div
              ref={index === 0 ? itemRef : null}
              key={song.id}
              className="flex flex-col items-start p-4 rounded-md hover:cursor-pointer hover:bg-white transition-colors max-w-48"
              onClick={() => handlePlay(song)}
            >
              <Image
                src={
                  `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/${song.image_path}` ||
                  ""
                }
                alt={song.title || ""}
                width={150}
                height={150}
                className="aspect-square rounded-md"
              />
              <div className="flex flex-col mt-2 w-full">
                <p className="text-left font-bold text-nowrap text-ellipsis max-w-[150px] overflow-hidden">
                  {song.title}
                </p>
                <p className="text-left text-black/80">{song.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewReleases;
