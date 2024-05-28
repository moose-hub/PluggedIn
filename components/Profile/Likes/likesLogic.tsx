import { Cover, covers } from "./mockData";
import CoverArt from "./likesRender";

export default function Liked() {
  const Covers = [...covers];
  return (
    <>
      <div className="grid grid-cols-5 gap-10 pl-8">
        {covers.map((cover: Cover) => (
          <CoverArt
            key={cover.key}
            image={cover.image}
            coverName={cover.coverName}
          />
        ))}
      </div>
    </>
  );
}
