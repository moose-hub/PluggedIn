import { Leader, leaders } from "./leaderModel";

import LeadingArtist from "./LeadingArtist";
import { sortedLeaders } from "./leaderModel";

export default function Leaderboard() {
  const sortedLeaders = [...leaders].sort(
    (a, b) => b.numberOfSwipes - a.numberOfSwipes,
  );
  return (
    <>
      {sortedLeaders.map((leader: Leader) => (
        <LeadingArtist
          key={leader.key}
          image={leader.image}
          name={leader.name}
          numberOfSwipes={leader.numberOfSwipes}
        />
      ))}
    </>
  );
}
