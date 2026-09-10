import { AbsoluteFill } from "remotion";

export const Scanlines = () => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(180deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 4px)",
        mixBlendMode: "overlay",
      }}
    />
  );
};

export const Vignette = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

export const GridBackground = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #221c18 0%, #1a1614 55%, #100c0a 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(79,195,247,0.09) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
