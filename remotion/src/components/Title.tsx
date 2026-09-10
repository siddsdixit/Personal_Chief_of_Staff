import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { BrickWord } from "./BrickText";

export const Title = () => {
  const frame = useCurrentFrame();

  const exitFade = interpolate(frame, [78, 90], [1, 0], { extrapolateRight: "clamp" });
  const subFade = interpolate(frame, [55, 75], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const bannerFade = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 38,
        opacity: exitFade,
      }}
    >
      <div
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', SF Mono, Menlo, monospace",
          fontSize: 17,
          color: "#d9c4b1",
          letterSpacing: 0.4,
          padding: "12px 22px",
          border: "1px solid rgba(79,195,247,0.55)",
          borderRadius: 6,
          opacity: bannerFade,
        }}
      >
        <span style={{ color: "#4fc3f7", marginRight: 10 }}>*</span>
        Trust velocity, not busier.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "center" }}>
        <BrickWord text="COS" cell={30} startDelay={0} />
      </div>

      <div
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', SF Mono, Menlo, monospace",
          fontSize: 17,
          color: "#9a8676",
          opacity: subFade,
          letterSpacing: 6,
        }}
      >
        YOUR MORNING, HANDLED BEFORE 7 AM
      </div>
    </AbsoluteFill>
  );
};
