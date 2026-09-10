import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";

const DRAFTS = [
  {
    to: "Acme Corp, pricing follow up",
    preview: "Appreciate the patience, here is the updated tier breakdown...",
  },
  {
    to: "#eng-leads, sprint recap",
    preview: "Quick recap before standup, three items need owners...",
  },
  {
    to: "Board sync, pre-read",
    preview: "Attaching the two-pager ahead of tomorrow's 9 AM...",
  },
];

export const DraftsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        gap: 16,
        padding: "0 40px",
      }}
    >
      {DRAFTS.map((draft, i) => {
        const delay = 6 + i * 14;
        const slide = spring({
          frame: frame - delay,
          fps,
          config: { damping: 18, stiffness: 140 },
        });
        const x = (1 - slide) * -60;
        return (
          <div
            key={draft.to}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(79,195,247,0.18)",
              borderRadius: 10,
              padding: "16px 20px",
              opacity: slide,
              transform: `translateX(${x}px)`,
              boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span style={{ color: "#e6dccb", fontWeight: 700, fontSize: 18 }}>{draft.to}</span>
              <span
                style={{
                  color: "#f2c94c",
                  fontSize: 12,
                  border: "1px solid rgba(242,201,76,0.4)",
                  borderRadius: 5,
                  padding: "3px 8px",
                  letterSpacing: 0.5,
                }}
              >
                draft, awaiting your send
              </span>
            </div>
            <div style={{ color: "#9a8676", fontSize: 15 }}>{draft.preview}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
