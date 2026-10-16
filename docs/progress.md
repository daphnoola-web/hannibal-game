# Progress log

Read this first in a new session, then `spike-plan.md` (the approved plan) and `decisions.md`.

## Status as of 2026-10-17 — end of session 2 (+ Gate A code)

**Where we are:** Session 1 and 2 done and committed on `setup/project-skeleton`. Gate A code is written and verified in the preview browser. Gate A is NOT passed yet: it needs real fps on the RTX, a GitHub account, and the first Pages deploy.

### Done
- Git identity set for this repo only: name `daphn`, email placeholder `daphn@users.noreply.github.com` (swap for GitHub's private noreply address once the account exists). 3 commits so far.
- Session 2: `history-sources.md` has 14 cited facts, uncertainty log and invented-elements table. Verified by reading Polybius 2.13, 2.36, 10.6-19, Livy 21.3 and Wikipedia (Cartagena). Silver-mine numbers are secondary only; clothing/gear is NOT yet researched (see TODO in that file). Polybius and Livy disagree on who chose Hannibal (army vs Carthaginians): present both.
- `assets.csv`: candidates listed (Poly Haven CC0 verified; Quaternius/Kenney CC0 and Meshy/Tripo free = CC BY 4.0 need re-check at download). Nothing downloaded.
- Gate A code (`src/main.js`): quay with box buildings and crates, sea edge, kinematic capsule + Rapier character controller (autostep, snap to ground), WASD + Shift to run, mouse-look (click canvas to capture), third-person camera, fixed 60 Hz physics step with render interpolation, fps counter, respawn if falling below y=-10.
- Scripted checks in preview (all pass): rests on ground; walks at ~3.5 u/s; stops at building wall (z=-18.63); runs off the quay edge, falls and respawns; no console errors.
- Deploy config ready: `vite.config.js` (base './') and `.github/workflows/deploy.yml` (builds and publishes to Pages on push to `main`). Build works (`npm run build`).

### Not done / blockers for Gate A
1. **You: real fps** in regular Chrome with Windows Graphics settings → Chrome → "High performance" (RTX). Preview pane showed ~40 fps on the Intel iGPU, which is not a valid measure. Run `npm run dev`, open the URL, report the fps counter while walking/running.
2. **You: create a GitHub account** (not done), then I create the repo, push, enable Pages and deploy (needs your OK to publish).
3. Merge `setup/project-skeleton` into `main` before deploying (workflow triggers on `main`).
4. Bundle is 4.8 MB (1.8 MB gzip), mostly Rapier's inlined wasm. Fine for the 150 MB cap.
5. Port 5173 was taken by another dev server; the preview used 5174.

### Findings to carry forward
- **iGPU trap:** WebGL in the app's preview browser ran on the **Intel UHD** chip (ANGLE/D3D11), not the RTX 3070, at ~20 fps on a trivial scene. The preview pane may throttle, so this is not a real measurement. Real fps numbers must come from regular Chrome/Edge, with Windows Settings → Display → Graphics set to "High performance" for the browser. Ask the user to do this and report.
- **Physics timestep:** `world.step()` runs once per rendered frame, so physics slows down when fps drops. Switch to a fixed-timestep accumulator before building character movement.
- **PATH in shells:** The shell may not see Node on PATH until the app restarts. In PowerShell, refresh it first:
  `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`
- Git warns about LF→CRLF on Windows. Harmless.

### Working with this user
- Not technical: no coding or 3D modeling experience. Explain account sign-ups and installs plainly, with click-by-click steps. Prefer doing things yourself; ask before installs, publishing, spending (≤$30 approved), or account steps.
- Wants the best visuals achievable in a browser. History must be cited, and invented parts labeled in-game.
