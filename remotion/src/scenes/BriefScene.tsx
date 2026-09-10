import { Typewriter, RevealLines } from "../components/Typewriter";

const COMMAND = "cos brief";
const OUTPUT = [
  "",
  "morning brief, generated 6:41 AM",
  "",
  "  hottest ask     Acme Corp wants pricing by Friday, no reply in 3 days",
  "  calendar prep   9:00 board sync, agenda drafted, 2 opens flagged",
  "  drafts waiting  3 messages ready in your voice, none sent yet",
  "",
  "  everything below is a draft. you decide what goes out.",
];

export const BriefScene = () => {
  const cmdEnd = Math.ceil(COMMAND.length / 0.8) + 6;
  return (
    <>
      <span style={{ color: "#4fc3f7", fontWeight: 700 }}>$ </span>
      <Typewriter text={COMMAND} style={{ color: "#f0e0d0" }} />
      <RevealLines
        lines={OUTPUT}
        startFrame={cmdEnd}
        framesPerLine={5}
        renderLine={(line) => {
          if (line.includes("everything below")) {
            return <span style={{ color: "#4fc3f7", fontWeight: 700 }}>{line}</span>;
          }
          return <span>{line || " "}</span>;
        }}
      />
    </>
  );
};
