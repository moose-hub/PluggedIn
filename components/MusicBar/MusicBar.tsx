"use client";
import { useEffect, useState, useRef } from "react";
import useCurrentSong from "@/stores/useCurrentSong";
import MusicControls from "./MusicControls";
import TrackSeeker from "./TrackSeeker";
import TrackSpotlight from "./TrackSpotlight";
import VolumeSlider from "./VolumeSlider";

export default function MusicBar() {
  const currentSong = useCurrentSong((state) => state.currentSong);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(10);

  const audioRef = useRef<HTMLAudioElement>(null);
  const seekerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      const handleLoadedMetadata = () => {
        setDuration(currentAudio.duration || 0);
      };
      currentAudio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        currentAudio.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata,
        );
      };
    }
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src =
        `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/songs/${currentSong.song_path}` ||
        "";
      audioRef.current.play();
    }
  }, [currentSong]);

  return (
    <div className="w-screen fixed bottom-20 lg:bottom-4 left-0 z-50">
      <div className="flex justify-between items-center bg-white border-gray-200 rounded-lg border shadow-md mx-4 p-4">
        <TrackSpotlight audioRef={audioRef} />
        <div className="flex flex-col items-center gap-2">
          <audio preload="metadata" ref={audioRef} />
          <MusicControls
            {...{ seekerRef, audioRef, duration, setTimeProgress }}
          />
          <TrackSeeker
            {...{ seekerRef, audioRef, timeProgress, duration, setDuration }}
          />
        </div>
        <VolumeSlider audioRef={audioRef} />
      </div>
    </div>
  );
}
