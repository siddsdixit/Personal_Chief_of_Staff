import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const POINTS = [22, 30, 28, 41, 55, 49, 68, 82];
const WIDTH = 760;
const HEIGHT = 260;

const toPath = (points: number[], progress: number) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const visibleCount = Math.max(2, Math.floor(points.length * progress));
  const slice = points.slice(0, visibleCount);
  const stepX = WIDTH / (points.length - 1);

  return slice
    .map((value, i) => {
      const x = i * stepX;
      const y = HEIGHT - ((value - min) / range) * (HEIGHT - 40) - 20;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
};

export const TrendScene = () => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [10, 90], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const path = toPath(POINTS, drawProgress);

  const labelFade = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const takeawayFade = interpolate(frame, [95, 115], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 28,
      }}
    >
      <div
        style={{
          color: "#e6dccb",
          fontSize: 20,
          fontWeight: 700,
          opacity: labelFade,
          letterSpacing: 0.5,
        }}
      >
        sunday pattern report, loop closing rate over 8 weeks
      </div>

      <div
        style={{
          width: WIDTH + 60,
          padding: "30px 30px 20px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(79,195,247,0.18)",
          borderRadius: 12,
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          <line x1="0" y1={HEIGHT - 20} x2={WIDTH} y2={HEIGHT - 20} stroke="#3a322c" strokeWidth={1} />
          <path
            d={path}
            fill="none"
            stroke="#4fc3f7"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        style={{
          color: "#4fc3f7",
          fontSize: 19,
          fontWeight: 700,
          opacity: takeawayFade,
          textAlign: "center",
          maxWidth: 700,
        }}
      >
        close rate is up 3x in eight weeks, keep doing the morning brief
      </div>
    </AbsoluteFill>
  );
};
