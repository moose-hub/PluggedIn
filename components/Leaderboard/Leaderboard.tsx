import { Leader, leaders } from "./leaderModel";
import LeadingArtist from "./LeadingArtist";

export default function Leaderboard() {
  return (
    <>
      {leaders.map((leader: Leader) => (
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
