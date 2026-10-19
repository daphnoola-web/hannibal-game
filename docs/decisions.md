# Decision log

Newest first. Each entry: date, decision, why, evidence.

## 2026-10-19 - Full-game plan approved
- **Decision:** Scope, chapters, v1 contents and roadmap as in `game-plan.md` (22 decisions from the planning session). Highlights: Hannibal's career 221–202 BCE in 10 compact free-roam chapters; no melee in v1; fixed historical outcomes with 2–3 ways through each mission; gameplay graybox before art; v1 = the New Carthage chapter, finished.
- **Assets:** Mixamo dropped because Adobe's community FAQ forbids free distribution of raw character/animation files and the repo is public. Characters are rigged and animated inside Meshy (paid-plan output is "Private & Customer owned" per meshy.ai/pricing). Buildings are code-built with CC0 textures.
- **Evidence:** vendor pages read 2026-10-18 (meshy.ai/terms-of-use, meshy.ai/pricing, docs.meshy.ai rigging/animation; Adobe community Mixamo FAQ thread; the official Mixamo FAQ returned 403). Rights to Meshy outputs after cancelling are not stated: ask support@meshy.ai.

## 2026-10-17 - Gate E: spike decision record - GO (publishing deferred)
**Recommendation: GO** on Three.js + Rapier + AI-generated assets for a full MVP, with conditions below.

Pass bar:
| # | Criterion | Result |
|---|---|---|
| 1 | Public Pages URL opens in fresh Chrome | Passed at Gate A (earlier build). **Current build is NOT yet published**; user chose to leave publishing for later (needs OK + Meshy license check) |
| 2 | Walk/run, third-person camera, collision, no falling through | Pass (user play-tested) |
| 3 | NPC -> objective -> crate -> history card with citations + fiction label -> completion, replayable | Pass (user played start to finish, no issues) |
| 4 | AI-generated asset in scene | Pass: Meshy Hannibal (rigged/animated via Mixamo) + Meshy Punic building |
| 5 | 30+ fps on RTX; Intel iGPU recorded | RTX: 61 fps all states (user, Chrome). Intel iGPU (Windows Graphics = Power saving, user): 56-60 fps, playable. Preview-pane Intel readings were 1-35 fps but that pane is throttled, not a valid measure |
| 6 | Size and load time | Build 17.9 MB on disk (JS 4.8 MB = 1.85 MB gzip, sky 5.2, models 2.0 + 1.9, textures ~4.5). ~15 MB over the wire, far under the 150 MB cap. Load to playable: 3.5 s on localhost (no network delay) = lower bound; estimate ~6 s at 50 Mbps, ~13 s at 10 Mbps. Fresh-profile measurement from the live site: **TODO after publishing** |
| 7 | Written decision record | This entry; user hours about 5 |

What the AI did well: scaffold, physics/movement, rendering stack, post-processing, mission system, verification by scripted browser checks, fast iteration on feedback (textures swapped twice). What went badly: Meshy/Mixamo pipeline needed several round trips (FBX rejected, heavy meshes rejected); free Meshy plan cannot download; preview pane gives no real fps; feet-hover bug needed a fix; first ground/wall textures looked wrong and needed swaps.

Risks for the full game: (1) Meshy/Mixamo license for public redistribution unconfirmed; (2) AI-generated characters have albedo only and look generic, every extra character costs credits + manual Mixamo steps; (3) history content is only as good as sourcing (some rows still 're-verify', clothing/gear unresearched); (4) 5 MB JS bundle (could be code-split); (5) Intel iGPU performed fine at this scene size (56-60 fps), but a bigger level may need a low-quality toggle for post-processing.

Rough MVP estimate (one 10-15 min mission, 3 NPCs, 3 sourced history points, save checkpoint): about 8-12 further sessions of 1-2 h (levels/props 3-4, 2 more NPCs + animations 2-3, dialogue/history research and cards 2-3, quality toggle + save + polish 2). Spike itself took about 10 sessions (about 5 user hours; agent time not counted). If NO-GO were chosen the cheapest alternative would be a 2D/illustrated campaign map with the same cards.

## 2026-10-17 - Gate D PASSED (user played it, no issues)
- **Decision:** Mission content lives in a data file (`src/mission-data.js`), logic in `src/mission.js`; DOM overlay UI, no framework. NPC is a recoloured clone of the Hannibal model (no extra asset).
- **Evidence:** Scripted playthrough in preview passes (talk, choices, crate, card, complete, replay); no console errors. Pass still requires the user to play it start to finish without help.

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
