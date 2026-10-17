# Decision log

Newest first. Each entry: date, decision, why, evidence.

## 2026-10-17 - Gate C built (not yet judged)
- **Decision:** Use built-in three.js addons (Water, EffectComposer, GTAO, Bloom, OutputPass) plus 3 CC0 Poly Haven sets; no new npm installs. Total new download ~10 MB.
- **Evidence:** no console errors; user in regular Chrome (RTX): 61 fps in all states, look 'ok' (ground/walls re-textured twice on feedback). Gate C passes on RTX; Intel iGPU fps still to record at Gate E.

## 2026-10-17 — Gate B PASSED (pending license check before publishing)
- **Decision:** AI-generated character + building via Meshy, rigged/animated with Mixamo, is viable. Gate B passes on technical criteria: correct scale/pivot, idle/walk/run blending, ~2 MB per model, 60 fps in preview, collision with building works.
- **Evidence:** screenshots and scripted check (animation state idle→walk→run; player stops at building wall at z=-5.6). Hours: roughly 2-3 h of user+agent time for the asset pipeline.
- **What went badly:** Free Meshy plan cannot download; Mixamo rejected FBX with skeleton and heavy meshes; several round trips. User paid ₪30 (Meshy Pro month 1); renewal reminder at top of progress.md.
- **Open:** license check for public publishing; see progress.md.

## 2026-10-17 — Gate B started: fallback pipeline works
- **Decision:** Use the CC0 Quaternius Universal Animation Library mannequin as the placeholder player and animation test bed while AI-generation accounts are pending.
- **Evidence:** Preview check: animation state idle→walk→run→idle on input, scale/feet pivot correct, no console errors. Gate B not yet passed (no AI-generated asset, building, or compression yet).

## 2026-10-17 — Gate A PASSED
- **Decision:** Gate A passes; stay on Three.js + Rapier (no Godot fallback). Public repo and GitHub Pages are used because free Pages requires a public repo; no secrets are in the repo.
- **Evidence:** 60 fps on RTX in Chrome, smooth, no collision issues; live URL loads in a fresh window.
- **Open:** load time, iGPU fps, Intel check deferred to Gates C/E.

## 2026-10-17 — Gate A code done, awaiting measurement and deploy
- **Decisions:** Rapier kinematic character controller (not dynamic body) for the player; fixed 60 Hz step with accumulator (clamped 0.1 s) and interpolated rendering; git identity is a repo-local placeholder noreply email.
- **Evidence:** Scripted preview checks pass (wall stop, edge fall + respawn, no console errors). Preview fps ~40 on Intel iGPU (not a valid measurement).
- **Measured (user, regular Chrome):** 60 fps on RTX 3070 Laptop, smooth, no collision problems. Remaining for Gate A: working Pages URL. Fallback to Godot only if movement/collision is still unreliable after session 4; currently reliable.
- **History:** Livy (army acclaims) and Polybius (Carthaginians appoint) differ on Hannibal's elevation; game shows both.

## 2026-10-17 — Project skeleton runs
- **Stack pinned:** three 0.186.1, @dimforge/rapier3d-compat 0.21.0, vite 8.3.4, Node 24.22.0.
- **Evidence:** In the Claude app's preview browser, a dynamic box falls and rests on the ground collider (y = 0.50), no console errors.
- **Finding:** WebGL ran on the **Intel UHD iGPU** (ANGLE/D3D11), not the RTX, showing ~20 fps on a trivial scene. The preview pane may throttle, so this is not a valid measurement. Gate A must measure in regular Chrome, with Windows Graphics settings set to the RTX ("High performance") for Chrome. Physics currently steps once per frame; it needs a fixed timestep before movement work.

## 2026-10-16 — Spike scope settled
- **Decision:** Run a 2-week feasibility spike (see `spike-plan.md`) for a third-person 3D browser game set in New Carthage, 221 BCE.
- **Engine:** Three.js + Rapier physics; Godot web export is the fallback if Gate A fails. OpenSA and the GTA-mod route are dropped.
- **Why:** Builder has no coding/3D experience, so a code-only stack the AI agent can build and check in a browser beats editor-driven engines. Browser link + original assets is mandatory.
- **Evidence:** Grilling session answers (see `spike-plan.md`, "Decisions settled"). No runtime tests yet.

## Reference hardware
- NVIDIA GeForce RTX 3070 Laptop GPU + Intel UHD integrated GPU, i7-11800H, 16 GB RAM, Windows 11.
- Targets: 30+ fps on the RTX; record the result on the Intel iGPU.
