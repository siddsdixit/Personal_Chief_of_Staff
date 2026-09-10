import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const ITEMS = [
  { item: "pricing reply to Acme Corp", firstSeen: "3 days ago", heat: "hot", color: "#ff5f57" },
  { item: "board pre-read review", firstSeen: "1 day ago", heat: "warm", color: "#f2c94c" },
  { item: "hiring loop feedback", firstSeen: "5 days ago", heat: "hot", color: "#ff5f57" },
  { item: "vendor renewal approval", firstSeen: "closed", heat: "done", color: "#28c840" },
];

export const LedgerScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerFade = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          color: "#e6dccb",
          fontSize: 20,
          fontWeight: 700,
          opacity: headerFade,
          letterSpacing: 0.5,
        }}
      >
        the ledger, state that survives between morning and evening
      </div>

      <div
        style={{
          width: 880,
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid rgba(79,195,247,0.18)",
        }}
      >
        {ITEMS.map((row, i) => {
          const delay = 14 + i * 10;
          const rise = spring({
            frame: frame - delay,
            fps,
            config: { damping: 16, stiffness: 150 },
          });
          const closing = row.heat === "done";
          const strike = closing
            ? interpolate(frame, [70, 90], [0, 1], {
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              })
            : 0;
          return (
            <div
              key={row.item}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 22px",
                background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
                opacity: rise,
                transform: `translateY(${(1 - rise) * 16}px)`,
              }}
            >
              <span
                style={{
                  color: closing ? "#9a8676" : "#e6dccb",
                  fontSize: 16,
                  textDecoration: strike > 0.5 ? "line-through" : "none",
                }}
              >
                {row.item}
              </span>
              <span style={{ color: "#9a8676", fontSize: 13, marginRight: 16 }}>
                first seen, {row.firstSeen}
              </span>
              <span
                style={{
                  color: row.color,
                  fontSize: 12,
                  fontWeight: 700,
                  border: `1px solid ${row.color}66`,
                  borderRadius: 5,
                  padding: "3px 10px",
                  letterSpacing: 0.5,
                }}
              >
                {row.heat}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
