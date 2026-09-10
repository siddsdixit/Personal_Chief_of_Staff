# Personal Chief of Staff, remotion demo

Hero video for [Personal_Chief_of_Staff](https://github.com/siddsdixit/Personal_Chief_of_Staff). Warm dark terminal aesthetic, six scenes dramatizing the 6:40 AM ritual to Sunday pattern report arc.

## Run

```bash
cd remotion
npm install
npm start          # opens Remotion Studio at http://localhost:3000
```

If this is the first render on a machine, Remotion needs a headless browser once:

```bash
npx remotion browser ensure
```

## Render

```bash
npm run build       # -> out/demo.mp4 (1280x720, h264, roughly 18s)
```

Convert to the GIF used on the landing page with the two pass palette approach:

```bash
ffmpeg -i out/video.mp4 -vf "fps=8,scale=560:-1:flags=lanczos,palettegen=max_colors=128:stats_mode=diff" -y /tmp/palette.png
ffmpeg -i out/video.mp4 -i /tmp/palette.png -filter_complex "fps=8,scale=560:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=4" -y ../docs/cos-explainer.gif
```

## Scenes

1. **Problem** - 6:40 AM, five systems (Calendar, Email, Slack, Ramp, Jira) appear as chaotic tabs
2. **Solution** - a single morning brief terminal materializes with typewriter reveal, hottest ask, calendar prep, drafts waiting
3. **Drafts** - three draft messages slide in, each labeled draft, awaiting your send
4. **Ledger** - four items with first seen dates and heat indicators, one item closes out
5. **Sunday trend** - an animated line chart trending upward with a bolded takeaway
6. **Closing** - COS brick word, tagline, and the GitHub URL

Total is about 17.7s at 30fps (530 frames).

## Notes

No em dashes and no emojis anywhere in code, comments, or on screen text. All content is generic and fictional, no PII, no real company names.
