# Progress log

Read this first in a new session, then `spike-plan.md` (the approved plan) and `decisions.md`.

## ⚠ REMINDER: cancel Meshy Pro before it renews
User subscribed to Meshy Pro (monthly, ₪30 first month, then ₪60/month) on 2026-10-17. Renewal is about 2026-11-17 (confirm exact date in Meshy → account → Subscription/Billing). Remind the user at the start of every session until they confirm it is cancelled. Download all needed files first (Hannibal GLB, building GLB).

## Status as of 2026-10-17 — Gate A PASSED, next: Gate B (asset pipeline)

**Where we are:** Sessions 1-2 and Gate A are done. Live URL: https://daphnoola-web.github.io/hannibal-game/ (public repo `daphnoola-web/hannibal-game`, branch `main`, Pages deploys via GitHub Actions on every push to `main`).

### Done
- Git identity (repo-only): `daphnoola-web` / `344031054+daphnoola-web@users.noreply.github.com`. The first commits still carry the old placeholder email (harmless).
- GitHub account created by user; GitHub CLI (`gh` 2.102.0) installed via winget and logged in. In shells, refresh PATH first (see below) or `gh` is not found.
- Session 2: `history-sources.md` (14 cited facts, uncertainty log) and `assets.csv` (candidates only, nothing downloaded). Clothing/gear is not researched yet; silver-mine figures are secondary-source only.
- Gate A: graybox harbor quay, Rapier kinematic character controller, WASD + Shift + mouse look, third-person camera, fixed 60 Hz physics, fps counter, respawn when falling. Preview scripted checks pass.
- **Gate A measured:** 60 fps in regular Chrome on RTX 3070 (user), smooth, no clipping. Live Pages URL opened fine in a fresh window, user says it looks ok. Not yet measured: exact load time and Intel iGPU fps (do at Gate C/E). Build is 4.9 MB (1.8 MB gzip).

### Gate B: asset pipeline WORKS (session 5, 2026-10-17)
- Meshy (Free→Pro monthly): text-to-3D Hannibal (+texture) and a Punic harbor building. Free plan cannot download any format; Pro needed (₪30 first month, then ₪60).
- Mixamo: FBX from Meshy failed ("unable to map existing skeleton"); a heavy OBJ failed; a ~30k-face OBJ **zip with texture** rigged fine. Idle (with skin) + Walking/Running (without skin, In Place) downloaded as FBX.
- Local pipeline (scripts in `assets/`): FBX2glTF → `merge-anims.mjs` (clips idle/walk/run into one GLB) → gltf-transform webp → `public/models/`. Raw/work files are gitignored.
- In the game: Hannibal (30,792 tris, 2.2 MB) crossfades idle/walk/run; Punic building (33.7k tris, 2.0 MB) placed with collision (player stops at its wall). Preview fps 60. Build: dist ≈ 9 MB total incl. models (JS 4.9 MB, 1.8 MB gzip).
- Gate B remaining: nothing blocking. Not yet pushed/published (public repo concern: Meshy Pro "private license" vs public repo, see below).
- Fixed after user play-test (61 fps, fast load): feet hovered 0.85 m because Box3 on a skinned mesh was wrong; now fitted from posed vertices (feet 0.02 m above ground in idle).
- Known weaknesses: texture has albedo only (no normal/roughness through Mixamo FBX); arms-down A-ish pose rigged OK; Mixamo needs lighter OBJ + texture zip; clothing is reconstruction, not researched.
- **OPEN before pushing:** confirm Meshy Pro terms allow redistributing the models in a public repo / on a public site. Free plan was CC BY 4.0 (credit Meshy); models were generated under Pro. Also Mixamo redistribution of raw animation files not explicit.

### Gate C visuals (session 6, 2026-10-17) - built, awaiting user judgement + fps
- Added: HDRI sky (Poly Haven, 5.5 MB) + IBL, sun direction auto-read from HDRI, shadows following the player, ACES tone mapping, PBR ground/walls (CC0, 4.7 MB), reflective Water (procedural normal map, no download), GTAO ambient occlusion + light bloom (EffectComposer). Extra download about 10 MB.
- **Measured (user, regular Chrome, RTX):** 61 fps standing/walking/running with all effects; user judged look 'ok' after texture swaps. Intel iGPU still not measured.
- Preview pane fps is meaningless (Intel iGPU, 1-8 fps); no console errors. REAL fps must be read by the user in regular Chrome (RTX), then on Intel (Windows Settings > System > Display > Graphics > add Chrome > Options > Power saving).
- Textures swapped after user feedback (too mossy/rough) to dense_sand + beige_wall_002 (smooth). Weak spots: water is a mirror-like sea with no foam/quay edge; building still the only Meshy asset. If fps is low: cut GTAO first, then water reflection size.

### Gate D mission loop (built 2026-10-17, PASSED: user played it in Chrome, 'everything looks fine')
- `src/mission-data.js` (authored dialogue, objectives, history card, citations) + `src/mission.js` (state machine) + UI in index.html. Flow: walk to the officer (blue-tinted clone of Hannibal at x=-5,z=2), E to talk (two topics: Hasdrubal's death, silver; 1/2 or click to choose, E to continue) -> inspect the crate (x=4,z=9.5) with E -> history card (Livy vs Polybius disagreement, fiction label, sources) -> 'Mission complete', R replays. Movement freezes during dialogue/card.
- Scripted check passed in preview: far E does nothing, full run, restart resets, no console errors. User played it start to finish, no issues reported.
- Caveats: Strabo silver figures remain secondary (flagged in dialogue); card text for Polybius 10.8-10 is paraphrase of the verified rows in history-sources.md.

### Gate E (2026-10-17): SPIKE DONE, decision GO (see decisions.md). Intel iGPU 56-60 fps, ~5 user hours. Publishing deliberately deferred: needs user OK + Meshy license check; fresh-profile load time to be measured on the live site then. Cancel Meshy Pro before ~17 Nov 2026.

### Next (Gate C onward)
1. Ask user: OK to push to GitHub Pages? (after license check above).
2. Gate C visual quality (HDRI sky, shadows, PBR textures, water, post-processing), measure iGPU.
3. Gate D mission loop.

### Old Gate B plan (kept for reference)
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
