"use client";
import { useEffect, useState, useRef } from "react";
import MusicControls from "./MusicControls";
import TrackSeeker from "./TrackSeeker";
import TrackSpotlight from "./TrackSpotlight";
import VolumeSlider from "./VolumeSlider";
import { currentSong as useCurrentSong } from "@/hooks/useCurrentSong";

export default function MusicBar() {
  const { currentSong, setCurrentSong } = useCurrentSong();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekerRef = useRef<HTMLInputElement>(null);

  const playAudio = async () => {
    try {
      if (audioRef.current) {
        // await audioRef.current.play();
      }
    } catch (error) {
      console.error("Error playing the audio:", error);
    }
  };

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
    const setAudioSource = async () => {
      if (audioRef.current && currentSong) {
        audioRef.current.pause();
        audioRef.current.src =
          `https://fpaeregzmenbrqdcpbra.supabase.co/storage/v1/object/public/songs/${currentSong.song_path}` ||
          "";
        audioRef.current.load();
        audioRef.current.oncanplaythrough = playAudio;
      }
    };

    setAudioSource();
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
