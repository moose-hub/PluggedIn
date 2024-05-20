import Liked from "@/components/CoverArt/Liked";

const likes = () => {
  return (
    <>
      <div className="">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl p-8 font-extrabold">
          Likes
        </h1>
        <div id="likes-container" className="rounded">
          <Liked />
        </div>
      </div>
    </>
  );
};

export default likes;
