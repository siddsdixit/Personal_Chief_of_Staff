import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const SYSTEMS = [
  { label: "Calendar", color: "#4fc3f7" },
  { label: "Email", color: "#e08263" },
  { label: "Slack", color: "#9c7bd9" },
  { label: "Ramp", color: "#6fcf97" },
  { label: "Jira", color: "#f2c94c" },
];

export const ProblemScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clockFade = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 44,
      }}
    >
      <div
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', SF Mono, Menlo, monospace",
          fontSize: 64,
          fontWeight: 700,
          color: "#e6dccb",
          opacity: clockFade,
          letterSpacing: 2,
        }}
      >
        6:40 AM
      </div>
      <div
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', SF Mono, Menlo, monospace",
          fontSize: 18,
          color: "#9a8676",
          opacity: clockFade,
          marginTop: -24,
        }}
      >
        hotel desk, five tabs open, coffee cooling
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1080,
        }}
      >
        {SYSTEMS.map((system, i) => {
          const delay = 18 + i * 8;
          const appear = spring({
            frame: frame - delay,
            fps,
            config: { damping: 13, stiffness: 160 },
          });
          const jitter = Math.sin((frame - delay) * 0.4 + i) * (frame > delay + 20 ? 1.4 : 0);
          return (
            <div
              key={system.label}
              style={{
                fontFamily: "ui-monospace, 'JetBrains Mono', SF Mono, Menlo, monospace",
                fontSize: 20,
                fontWeight: 700,
                color: "#1a1614",
                background: system.color,
                padding: "14px 26px",
                borderRadius: 8,
                letterSpacing: 0.5,
                transform: `scale(${appear}) translateY(${jitter}px)`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
              }}
            >
              {system.label}
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontFamily: "ui-monospace, 'JetBrains Mono', SF Mono, Menlo, monospace",
          fontSize: 19,
          color: "#e6dccb",
          opacity: interpolate(frame, [90, 108], [0, 1], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        }}
      >
        busy in five systems, still late to the thing that matters by noon
      </div>
    </AbsoluteFill>
  );
};
