import { AbsoluteFill, Sequence } from "remotion";
import { Terminal } from "./components/Terminal";
import { Title } from "./components/Title";
import { Scanlines, Vignette, GridBackground } from "./components/Scanlines";
import { ProblemScene } from "./scenes/ProblemScene";
import { BriefScene } from "./scenes/BriefScene";
import { DraftsScene } from "./scenes/DraftsScene";
import { LedgerScene } from "./scenes/LedgerScene";
import { TrendScene } from "./scenes/TrendScene";
import { ClosingScene } from "./scenes/ClosingScene";

export const FPS = 30;

const SCENES = {
  problem: 85,   // 2.8s
  brief: 95,     // 3.2s
  drafts: 85,    // 2.8s
  ledger: 95,    // 3.2s
  trend: 90,     // 3.0s
  closing: 80,   // 2.7s
};

export const DEMO_DURATION_FRAMES = Object.values(SCENES).reduce((a, b) => a + b, 0);

export const CosDemo = () => {
  let from = 0;
  const at = (key: keyof typeof SCENES) => {
    const start = from;
    from += SCENES[key];
    return start;
  };

  return (
    <AbsoluteFill
      style={{
        fontFamily:
          "ui-monospace, 'JetBrains Mono', 'Fira Code', SF Mono, Menlo, Consolas, monospace",
      }}
    >
      <GridBackground />

      <Sequence from={at("problem")} durationInFrames={SCENES.problem}>
        <ProblemScene />
      </Sequence>
      <Sequence from={at("brief")} durationInFrames={SCENES.brief}>
        <Terminal path="~/cos/brief.md">
          <BriefScene />
        </Terminal>
      </Sequence>
      <Sequence from={at("drafts")} durationInFrames={SCENES.drafts}>
        <DraftsScene />
      </Sequence>
      <Sequence from={at("ledger")} durationInFrames={SCENES.ledger}>
        <LedgerScene />
      </Sequence>
      <Sequence from={at("trend")} durationInFrames={SCENES.trend}>
        <TrendScene />
      </Sequence>
      <Sequence from={at("closing")} durationInFrames={SCENES.closing}>
        <ClosingScene />
      </Sequence>

      <Vignette />
      <Scanlines />
    </AbsoluteFill>
  );
};
