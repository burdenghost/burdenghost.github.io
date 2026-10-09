# BURDEN GHOST Video Lab

A static, local-first music visualizer prototype for BURDEN GHOST. It is intentionally isolated under `/video-lab/` so the existing artist homepage and site security configuration remain untouched.

## Current prototype
- Audio-reactive canvas preview (crimson waveform, spectrum, cathedral pulse, embers).
- Optional cover artwork and artist/title text.
- 16:9, 9:16, and square composition presets.
- Optional LRC-style timed lyrics using `[mm:ss.xx] lyric text`.
- Local browser playback and WebM recording where the browser supports MediaRecorder.
- User-selected audio and artwork remain in the browser; the prototype does not upload them.

## Important limitations
- This is a prototype, not yet a complete NLE or AI text-to-video system.
- Browser recording runs in real time and exports WebM, not guaranteed MP4.
- Timed lyrics are parsed from LRC-style timestamps; no automatic speech recognition is used.
- Final MP4 rendering workflow will be added after the browser prototype is reviewed and the input/output contract is validated. Do not commit copyrighted or unreleased audio to this public repository.

## Run locally
Open `index.html` in a modern browser, or serve the folder with any static HTTP server. No build step or API key is required.

## Security and cost
No backend, analytics, third-party JavaScript, or external media service is used by the prototype. The page accepts local files only. GitHub Pages can host this static page, and the public repository's static hosting does not itself incur GitHub Actions render minutes.

## License notes
The application code is provided under the MIT License. Browser APIs and media codecs are provided by the user's browser. Any future FFmpeg-based MP4 workflow must pin a trusted FFmpeg build and review the exact build's codec and FFmpeg licensing obligations before release.
