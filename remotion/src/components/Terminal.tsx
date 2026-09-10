import { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

type Props = {
  children: ReactNode;
  path?: string;
  width?: number;
};

export const Terminal = ({ children, path = "~/cos/brief.md", width = 1080 }: Props) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lift = interpolate(frame, [0, 8], [14, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn,
        transform: `translateY(${lift}px)`,
      }}
    >
      <div
        style={{
          width,
          background: "#1a1614",
          borderRadius: 14,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(224,130,99,0.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 18px",
            borderBottom: "1px solid rgba(224,130,99,0.10)",
            background: "rgba(255,255,255,0.015)",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 12,
              color: "#9a8676",
              letterSpacing: 0.4,
            }}
          >
            {path}
          </div>
        </div>

        <div
          style={{
            padding: "26px 28px",
            color: "#e6dccb",
            fontSize: 19,
            lineHeight: 1.55,
            minHeight: 420,
            whiteSpace: "pre",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
