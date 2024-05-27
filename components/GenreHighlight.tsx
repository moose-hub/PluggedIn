"use client";
import React, { useMemo } from "react";
import { useSongs } from "@/hooks/useSongs";
import { Database } from "@/types_db";
import Image from "next/image";

type Song = Database["public"]["Tables"]["songs"]["Row"];
type GenreCount = {
  genre: string;
  songCount: number;
};

const GenreHighlight: React.FC = () => {
  const { songs, isLoading, error } = useSongs();

  const topGenres: GenreCount[] = useMemo(() => {
    if (!songs) return [];

    const genreCountMap: Record<string, number> = {};

    songs.forEach((song: Song) => {
      if (song.genre) {
        if (genreCountMap[song.genre]) {
          genreCountMap[song.genre]++;
        } else {
          genreCountMap[song.genre] = 1;
        }
      }
    });

    const genreCounts: GenreCount[] = Object.entries(genreCountMap).map(
      ([genre, count]) => ({
        genre,
        songCount: count,
      }),
    );

    genreCounts.sort((a, b) => b.songCount - a.songCount);

    return genreCounts.slice(0, 2);
  }, [songs]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading songs: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mx-4 mb-4">Trending Genres</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        {topGenres.map(({ genre, songCount }) => (
          <div
            key={genre}
            className="flex items-center hover:cursor-pointer hover:bg-white transition-colors rounded-lg p-4"
          >
            <div className="relative w-32 h-20 sm:w-48 sm:h-28 md:w-64 md:h-36 lg:w-80 lg:h-40 xl:w-96 xl:h-48">
              <Image
                src={`https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/images/image-genre-${genre}.png`}
                alt={`Image of Genre ${genre}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="rounded-xl object-cover"
                quality={100}
              />
            </div>
            <div className="flex flex-col justify-center ml-4 min-w-36">
              <h3 className="text-2xl font-bold overflow-hidden text-ellipsis">
                {genre}
              </h3>
              <p className="text-xl text-black/50 font-semibold">
                {songCount} Uploads
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreHighlight;
