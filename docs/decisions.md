# Decision log

Newest first. Each entry: date, decision, why, evidence.

## 2026-10-17 — Gate A code done, awaiting measurement and deploy
- **Decisions:** Rapier kinematic character controller (not dynamic body) for the player; fixed 60 Hz step with accumulator (clamped 0.1 s) and interpolated rendering; git identity is a repo-local placeholder noreply email.
- **Evidence:** Scripted preview checks pass (wall stop, edge fall + respawn, no console errors). Preview fps ~40 on Intel iGPU (not a valid measurement).
- **Open:** Gate A pass bar (60 fps on RTX, working URL) not yet measured. Fallback to Godot only if movement/collision is still unreliable after session 4; currently reliable.
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
