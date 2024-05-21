import { Song } from "../../interfaces/Song";

interface Props {
  song: Song;
  onLike: () => void;
  onDislike: () => void;
}

const SongCard: React.FC<Props> = ({ song, onLike, onDislike }) => {
  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md">
      <img
        className="rounded-t-lg"
        src={song.albumArtUrl}
        alt={`Cover of ${song.title}`}
      />
      <div className="p-4">
        <h5 className="text-xl font-medium">{song.title}</h5>
        <p className="text-gray-700">{song.artist}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-white bg-red-500 hover:bg-red-700 rounded-lg px-4 py-2"
            onClick={onDislike}
          >
            Dislike ❌
          </button>
          <button
            className="text-white bg-green-500 hover:bg-green-700 rounded-lg px-4 py-2"
            onClick={onLike}
          >
            Like ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
