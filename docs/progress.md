# Progress log

Read this first in a new session, then `spike-plan.md` (the approved plan) and `decisions.md`.

## Status as of 2026-10-17 — end of session 1

**Where we are:** Session 1 (Setup) of the spike plan is done, except the first git commit. Next up: Session 2 (Research) and Gate A (Graybox movement).

### Done
- **Planning:** A grilling session settled every open decision from the original handoff (`handoff-original.md`). The results are in `spike-plan.md` → "Decisions settled", and the user approved the plan.
- **Project folder:** `C:\Users\daphn\claude-code\hannibal-game` (outside OneDrive on purpose, because OneDrive sync chokes on node_modules).
- **Git:** repo initialized; working branch `setup/project-skeleton` (`main` has no commits yet).
- **Node.js:** v24.22.0 / npm 11.19.1, installed by the user at `C:\Program Files\nodejs`.
- **Scaffold:** Vite + Three.js + Rapier with exact pinned versions (see `package.json`): three 0.186.1, @dimforge/rapier3d-compat 0.21.0, vite 8.3.4.
- **Test scene** (`src/main.js`, `index.html`): sandy ground, sun and sky light with shadows, and a Rapier dynamic box that falls and rests on a ground collider, plus an on-screen fps counter. `window.__game` exposes objects for automated browser checks.
- **Dev server:** `.claude/launch.json` → config `dev` (port 5173). Start it with the browser preview tool (`preview_start` name `dev`).
- **Verified:** In the preview browser the box rests at y = 0.50 and the console shows no errors.
- **Tracking docs:** `decisions.md` (decision log), `assets.csv` (asset license manifest, empty), `history-sources.md` (fact → citation table plus uncertainty log, empty), `README.md`.

### Not done / blockers
1. **Nothing is committed.** `git commit` failed: no git identity is configured. Ask the user which name and email to use. Their email will be public once pushed to GitHub; suggest setting it **for this repo only** (`git config user.name/user.email`, not `--global`), or a placeholder until they have GitHub's private noreply address. Then commit everything currently staged or untracked.
2. GitHub account not created yet (needed at Gate A for GitHub Pages).

### Findings to carry forward
- **iGPU trap:** WebGL in the app's preview browser ran on the **Intel UHD** chip (ANGLE/D3D11), not the RTX 3070, at ~20 fps on a trivial scene. The preview pane may throttle, so this is not a real measurement. Real fps numbers must come from regular Chrome/Edge, with Windows Settings → Display → Graphics set to "High performance" for the browser. Ask the user to do this and report.
- **Physics timestep:** `world.step()` runs once per rendered frame, so physics slows down when fps drops. Switch to a fixed-timestep accumulator before building character movement.
- **PATH in shells:** The shell may not see Node on PATH until the app restarts. In PowerShell, refresh it first:
  `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`
- Git warns about LF→CRLF on Windows. Harmless.

### Working with this user
- Not technical: no coding or 3D modeling experience. Explain account sign-ups and installs plainly, with click-by-click steps. Prefer doing things yourself; ask before installs, publishing, spending (≤$30 approved), or account steps.
- Wants the best visuals achievable in a browser. History must be cited, and invented parts labeled in-game.
