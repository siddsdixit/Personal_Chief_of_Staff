import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { BrickWord } from "../components/BrickText";

export const ClosingScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const taglineAppear = spring({
    frame: frame - 36,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 46,
      }}
    >
      <BrickWord text="COS" cell={24} letterGap={14} startDelay={0} />

      <div
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', SF Mono, Menlo, monospace",
          fontSize: 24,
          fontWeight: 700,
          color: "#f0e0d0",
          letterSpacing: 1,
          transform: `scale(${taglineAppear})`,
        }}
      >
        Trust velocity, not busier.
      </div>

      <div
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
          fontSize: 20,
          color: "#9a8676",
          letterSpacing: 1,
          opacity: interpolate(frame, [60, 80], [0, 1], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        }}
      >
        github.com/siddsdixit/Personal_Chief_of_Staff
      </div>
    </AbsoluteFill>
  );
};
