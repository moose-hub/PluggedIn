import { useState, useEffect, useRef, useCallback } from "react";
import { MusicControlsProps } from "@/models/interfaces/musicPlayer";
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import {
  FaCirclePlay,
  FaCirclePause,
  FaShuffle,
  FaRepeat,
} from "react-icons/fa6";

export default function MusicControls({
  seekerRef,
  audioRef,
  duration,
  setTimeProgress,
}: MusicControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimationRef = useRef<number | null>(null);

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime || 0;
    setTimeProgress(currentTime);
    if (seekerRef.current) {
      seekerRef.current.value = currentTime.toString();
      seekerRef.current.style.setProperty(
        "--seeker-progress",
        `${(Number(seekerRef.current.value) / duration) * 100}%`,
      );
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, seekerRef, duration, setTimeProgress]);

  useEffect(() => {
    const handlePlayPause = async () => {
      if (isPlaying) {
        try {
          if (audioRef.current) {
            await audioRef.current.play();
            playAnimationRef.current = requestAnimationFrame(repeat);
          }
        } catch (error) {
          console.error("Error playing the audio:", error);
          setIsPlaying(false);
        }
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
          cancelAnimationFrame(Number(playAnimationRef.current));
        }
      }
    };

    handlePlayPause();
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className="flex items-center lg:gap-4 text-3xl">
      <button>
        <FaShuffle className="text-2xl hidden lg:block" />
      </button>
      <button>
        <IoPlaySkipBack className="text-2xl hidden lg:block" />
      </button>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <FaCirclePause className="text-pi-purple-main/90 hover:text-pi-purple-main/100 transition-all" />
        ) : (
          <FaCirclePlay className="text-pi-purple-main/90 hover:text-pi-purple-main/100 transition-all" />
        )}
      </button>
      <button>
        <IoPlaySkipForward className="text-2xl hidden lg:block" />
      </button>
      <button>
        <FaRepeat className="text-2xl hidden lg:block" />
      </button>
    </div>
  );
}
