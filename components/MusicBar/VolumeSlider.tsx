import { useState, useEffect } from "react";
import { FaVolumeMute, FaVolumeDown, FaVolumeUp } from "react-icons/fa";

interface VolumeSliderProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ audioRef }) => {
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(volume); // To store the previous volume before muting

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Convert to a 0-1 range for the audio element
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setPreviousVolume(newVolume); // Update previous volume when changing volume
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume); // Store the current volume before muting
      setVolume(0); // Mute the audio
    } else {
      setVolume(previousVolume); // Restore the previous volume
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <FaVolumeMute
          className="text-gray-600 w-8 h-8 cursor-pointer"
          onClick={toggleMute}
        />
      );
    } else if (volume > 0 && volume <= 25) {
      return (
        <FaVolumeDown
          className="text-gray-600 w-8 h-8 cursor-pointer"
          onClick={toggleMute}
        />
      );
    } else {
      return (
        <FaVolumeUp
          className="text-gray-600 w-8 h-8 cursor-pointer"
          onClick={toggleMute}
        />
      );
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {getVolumeIcon()}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="cursor-pointer accent-pi-purple-main"
      />
    </div>
  );
};

export default VolumeSlider;
