import { Leader, leaders } from "./leaderModel";
import LeadingArtist from "./LeadingArtist";

export default function Leaderboard() {
  const sortedLeaders = [...leaders].sort(
    (a, b) => b.numberOfSwipes - a.numberOfSwipes,
  );

  return (
    <>
      <div className="flex items-center mt-8 ">
        <div className="rounded ">
          {sortedLeaders.map((leader: Leader) => (
            <LeadingArtist
              key={leader.key}
              image={`https://i.pravatar.cc/300?img=${leader.key}`}
              name={leader.name}
              numberOfSwipes={leader.numberOfSwipes}
            />
          ))}
        </div>
      </div>
    </>
  );
}
