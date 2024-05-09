import MusicControls from "./MusicControls";
import TrackSpotlight from "./TrackSpotlight";
import VolumeSlider from "./VolumeSlider";

export default function MusicBar() {
  return (
    <div
      className="
        flex justify-between items-center 
        min-w-full mx-2 p-3 
        absolute left-0 bottom-0 z-50
        bg-white"
    >
      <TrackSpotlight />
      <MusicControls />
      <VolumeSlider />
    </div>
  );
}
