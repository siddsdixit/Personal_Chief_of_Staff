import { Composition } from "remotion";
import { CosDemo, DEMO_DURATION_FRAMES, FPS } from "./CosDemo";

export const Root = () => {
  return (
    <Composition
      id="CosDemo"
      component={CosDemo}
      durationInFrames={DEMO_DURATION_FRAMES}
      fps={FPS}
      width={1280}
      height={720}
    />
  );
};
