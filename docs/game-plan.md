# Hannibal game — full-game plan and version 1 roadmap

## Context
The 2-week spike ended in GO (Three.js + Rapier + Vite; Meshy Hannibal; one New Carthage graybox mission; 56–61 fps). The user wants to grow it into an immersive, history-true, "GTA-style" game about Hannibal's war and Carthage's fall, built by a non-coder with AI. This plan fixes the scope, story, learning goals, asset strategy, research method, and a session-by-session path to version 1. Decisions come from a grilling session on 2026-10-18.

**Deadline driver:** Meshy Pro renews ~17 Nov 2026 (₪60). All v1 characters must be generated, rigged and downloaded before then, and the user cancels. Remind every session until confirmed.

## Settled decisions
| # | Topic | Decision |
|---|---|---|
| 1 | Story span | Hannibal's career 221–202 BCE; epilogue cards for statesman years, exile, death (183) and Carthage destroyed (146) |
| 2 | "GTA style" | One compact free-roam area per chapter; missions from characters; side activities and history notes; no seamless world |
| 3 | Combat | No melee in v1. Challenge from sneaking, exploring, persuading, logistics. Top-down tactical battle scenes for Trebia/Cannae/Zama later |
| 4 | History vs freedom | Outcomes fixed; each mission has 2–3 ways to complete it plus bonus goals, all reaching the same historical point; "historians debate" cards |
| 5 | Build order | Per chapter: research → design doc → graybox missions → play-test → art pass → polish. Gameplay before art |
| 6 | Audience/language | Curious adults and teens; English; all text in data files (Hebrew possible later); violence off-screen |
| 7 | Time | 2–3 sessions/week, 1–2 h each; v1 in ~2 months; then one chapter per 1–2 months |
| 8 | Main lesson | "Hannibal won the battles but Carthage lost the war — why"; his way of thinking taught through mission mechanics |
| 9 | Chapters | 0 Oath (237, tutorial) · 1 New Carthage (221) · 2 Saguntum (219) · 3 Rhône + Alps (218) · 4 Trebia (tactical) · 5 Trasimene incl. Arno marshes, oxen trick side mission (217) · 6 Cannae (tactical + "march on Rome?" card) · 7 Tarentum + Rome's gates (212–211) · 8 The fall begins: Scipio takes New Carthage, Metaurus (209–207) · 9 Zama (202) · epilogue cards |
| 10 | Version 1 | Chapter 1 New Carthage, finished and published: larger harbor town, 2 main missions ("The Acclamation", "Silver for the War") + 1 side mission, each with 2–3 paths; 3–4 speaking characters; 3–5 sourced history points; save checkpoint; low-quality toggle; title, credits/sources screen, fact-vs-fiction codex |
| 11 | Verbs | Talk (choices unlocked by found info), Explore (clues, items, hidden routes), Sneak (guard view cones, crouch). End-of-mission rating (time, alarms, bonus goals) |
| 12/17 | Characters | One Meshy batch for v1 only: Punic officer, Iberian chief, merchant/harbor official, townswoman, Iberian guard. Clothing research first. **Rig and animate inside Meshy** (idle, walk, run, crouch-walk, 2–3 gestures). Re-rig Hannibal in Meshy. Test one character in-game before the batch. Ask before every credit spend. Crowds = colour/texture variants. Resubscribe for one month later when new chapters need Romans, Gauls, elephants etc. |
| 13 | Buildings | Code-built Punic buildings (flat roofs, mudbrick/stone, courtyards) with CC0 textures; Meshy only for approved landmarks |
| 14 | Mixamo | Dropped (replaced by Meshy rigging, customer-owned on paid plan). Raw source files stay out of git |
| 15 | History research | Now: one-page history spine 221–202 with source passages + clothing/gear for v1 cast. Before each chapter: deep research → design doc. Always read the ancient text itself (Perseus/LacusCurtius) before marking "verified"; user does the final read of every card |
| 16 | First session | Loose ends before new content |
| 18 | Oath tutorial | In v1.1 (needs young Hannibal + Hamilcar); v1 teaches controls inside mission 1 |
| 19 | Sound | Light CC0: sea/harbor ambience, footsteps, UI clicks, one music track, ≤ ~3 MB; no voice |
| 20 | HUD | Compass strip with objective marker + Tab mission log; no minimap in v1 |
| 21 | Testers | 2–3 people, after graybox missions and before v1 release; 5-question feedback form |
| 22 | Publishing | At each milestone with the user's OK; local commit after every working step |

## Facts found this session
- Meshy paid-plan outputs (incl. rigging/animation, ~630 clips, 18 crouch-walks) are "Private & Customer owned". Quadrupeds get only a walk clip; no facial/talk animation. Rights after cancelling are not stated → user emails support@meshy.ai; keep local copies of everything.
- Mixamo: raw-file free distribution not allowed (Adobe community FAQ) → reason for dropping it.

## Version 1 roadmap (~20 sessions)
**Milestone 0 — Loose ends (S1)**
- Copy this plan into `docs/game-plan.md`; update `docs/progress.md` to match what is actually published.
- Measure live-site load time in a fresh browser profile; code-split the 5 MB bundle (Rapier/three loaded separately) and re-measure.
- Draft the Meshy support email for the user to send. Publish (with OK).

**Milestone 1 — Research and cast (S2–S5, S2–S4 must finish before ~14 Nov)**
- S2: `docs/history-spine.md` (timeline + source passages per chapter); clothing/gear research for v1 cast → `docs/cast.md` (look, sources, Meshy prompt per character, "reconstruction" labels).
- S3: Meshy rig test — re-rig Hannibal in Meshy, merge clips with `assets/merge-anims.mjs`, check idle/walk/run/crouch in game; remove Mixamo files.
- S4: generate + rig the 5 cast characters (credits, ask first); download everything; log in `docs/assets.csv`; user cancels Meshy.
- S5: Chapter 1 deep research (Strabo 3.2.10 and Livy 21.2 read directly; acclamation; silver route) → `docs/ch1-design.md`: town layout from Polybius 10.10–13, missions with paths, history points, fiction labels.

**Milestone 2 — Systems and graybox missions (S6–S12)**
- S6: graybox town (hills, isthmus, lagoon, channel bridge) using a first building generator (boxes).
- S7: mission system v2 — extend `src/mission.js` / `src/mission-data.js` to objectives with multiple completion paths, flags, bonus goals, rating; compass + Tab log.
- S8: Talk v2 (conditional choices) + Explore (clues, items).
- S9: Sneak — guards with view cones, crouch, detection → retry from checkpoint.
- S10: Mission 1 "The Acclamation" playable. S11: Mission 2 "Silver for the War" + side mission; save checkpoint (localStorage).
- Play-test 1 (user + 2–3 testers, feedback form); publish with OK. S12: fixes.

**Milestone 3 — Art pass (S13–S17)**
- S13: Punic building generator v1 with CC0 textures; dress the town.
- S14: CC0 props (amphorae, crates, boats, market stalls), existing Meshy building as landmark.
- S15: place cast; crowd variants; NPC idle/patrol animations.
- S16: CC0 sound; lighting polish; low-quality toggle (cuts GTAO, water reflection size, shadows).
- S17: performance pass — fps on RTX and Intel iGPU, load time, download size.

**Milestone 4 — Ship v1 (S18–S20)**
- S18: title screen, credits/sources screen, fact-vs-fiction codex.
- S19: user's final history read; play-test 2.
- S20: fixes; publish v1 with OK; decision record in `docs/decisions.md` with hours and lessons.

**After v1:** v1.1 Oath tutorial (one Meshy month for young Hannibal + Hamilcar). Then each chapter runs the same cycle (~10–15 sessions). Before Chapter 4 (Trebia), a small spike with pass/fail gates for the tactical battle system.

## Working rules (unchanged)
Ask before installs, downloads (name/source/size), pushes, deploys, spending, Meshy generations. Every asset in `docs/assets.csv`, CC0 preferred. Cite all history; label invented content in-game. Verify with screenshots + console checks; commit locally after each working step. Plain language, click-by-click steps.

## Verification per session
- Run the dev server (`.claude/launch.json` preview), check console for errors, scripted checks for new mechanics (e.g. guard sees player → alarm; each mission path reaches completion; save/reload restores checkpoint).
- Screenshots for visual changes; real fps read by the user in regular Chrome (RTX and Intel), since the preview pane's fps is not valid.
- Each milestone: user plays it start to finish; testers at Milestones 2 and 4; live-site check after each publish.
