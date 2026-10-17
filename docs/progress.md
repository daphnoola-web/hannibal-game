# Progress log

Read this first in a new session, then `spike-plan.md` (the approved plan) and `decisions.md`.

## Status as of 2026-10-17 — Gate A PASSED, next: Gate B (asset pipeline)

**Where we are:** Sessions 1-2 and Gate A are done. Live URL: https://daphnoola-web.github.io/hannibal-game/ (public repo `daphnoola-web/hannibal-game`, branch `main`, Pages deploys via GitHub Actions on every push to `main`).

### Done
- Git identity (repo-only): `daphnoola-web` / `344031054+daphnoola-web@users.noreply.github.com`. The first commits still carry the old placeholder email (harmless).
- GitHub account created by user; GitHub CLI (`gh` 2.102.0) installed via winget and logged in. In shells, refresh PATH first (see below) or `gh` is not found.
- Session 2: `history-sources.md` (14 cited facts, uncertainty log) and `assets.csv` (candidates only, nothing downloaded). Clothing/gear is not researched yet; silver-mine figures are secondary-source only.
- Gate A: graybox harbor quay, Rapier kinematic character controller, WASD + Shift + mouse look, third-person camera, fixed 60 Hz physics, fps counter, respawn when falling. Preview scripted checks pass.
- **Gate A measured:** 60 fps in regular Chrome on RTX 3070 (user), smooth, no clipping. Live Pages URL opened fine in a fresh window, user says it looks ok. Not yet measured: exact load time and Intel iGPU fps (do at Gate C/E). Build is 4.9 MB (1.8 MB gzip).

### Gate B in progress (session 5)
- Done: CC0 Quaternius mannequin (placeholder, 6.7 MB GLB, not yet compressed) loaded in `src/main.js` with Idle/Walk/Sprint crossfade; scripted preview check passed (idle→walk→run→idle, no console errors). Commit 2060ece. Pipeline code is reusable: swap the GLB + clip names for a Mixamo-rigged Hannibal.
- Still needs the user: Meshy/Tripo + Adobe accounts, license check, spend approval (≤$30). Then: generate Hannibal + Punic building, Mixamo rig, GLB compress (gltf-transform, ask before installing), load building, measure fps.
- Note: the UAL zip has no Hannibal-specific look; mannequin is a stand-in only.

### Next (Gate B, sessions 5-6)
1. User creates Meshy or Tripo account + Adobe (Mixamo) account (click-by-click steps; confirm license text on the vendor site; budget up to ~$30, ask first).
2. Generate Hannibal figure + one Punic-style building, rig in Mixamo (idle/walk/run), export GLB, compress, load into scene with animation blending.
3. Fallback if it fails: animated CC0 Quaternius character labeled placeholder.
4. Record every asset in `assets.csv` with license and credit.
5. Remaining history TODO: clothing/gear sources (Quesada Sanz), read Livy 21.2, Polybius 3.13, Strabo 3.2.10.

### Findings to carry forward
- **iGPU trap:** WebGL in the app's preview browser ran on the **Intel UHD** chip (ANGLE/D3D11), not the RTX 3070, at ~20 fps on a trivial scene. The preview pane may throttle, so this is not a real measurement. Real fps numbers must come from regular Chrome/Edge, with Windows Settings → Display → Graphics set to "High performance" for the browser. Ask the user to do this and report.
- **Physics timestep:** `world.step()` runs once per rendered frame, so physics slows down when fps drops. Switch to a fixed-timestep accumulator before building character movement.
- **PATH in shells:** The shell may not see Node on PATH until the app restarts. In PowerShell, refresh it first:
  `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`
- Git warns about LF→CRLF on Windows. Harmless.

### Working with this user
- Not technical: no coding or 3D modeling experience. Explain account sign-ups and installs plainly, with click-by-click steps. Prefer doing things yourself; ask before installs, publishing, spending (≤$30 approved), or account steps.
- Wants the best visuals achievable in a browser. History must be cited, and invented parts labeled in-game.
