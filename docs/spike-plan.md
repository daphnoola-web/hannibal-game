# Hannibal game — 2-week feasibility spike plan

## Context
You want a fun, interactive way to learn history by following Hannibal's campaigns for Carthage against Rome, built as a GTA-style 3D browser game written entirely by AI ("vibe coded"). An earlier agent's handoff (`Downloads\hannibal-carthage-game-handoff.md`) covered options but decided nothing. This spike answers one question: **can a non-coder, working with an AI agent, get a good-looking playable slice of the game running in a browser within ~2 weeks part-time?** It ends in a go/no-go decision, not a game.

### Decisions settled in the grilling session
| Topic | Decision |
|---|---|
| Format | Compact 3D region, third-person, on foot (one small area per chapter) |
| Delivery | Browser link; only original or openly licensed assets; no GTA/Rockstar files |
| Purpose | Free hobby project for personal learning; open-sourcing the code is fine |
| Builder | You (no coding or 3D modeling experience) + AI; ~2 weeks part-time |
| Engine | **Three.js + Rapier physics** (an AI can build it and check it in a browser on its own); **Godot is the fallback** if Gate A fails. OpenSA and the GTA-mod route are dropped |
| Episode | New Carthage (Cartagena), 221 BCE: after Hasdrubal the Fair is assassinated, the army acclaims Hannibal (about 26) as commander |
| Visuals | Best achievable in a browser, realistic-leaning; download cap raised to ~150 MB; consistency beats detail |
| Devices | Desktop Chrome/Edge. 30+ fps on your RTX 3070 Laptop GPU, and still playable on its Intel UHD integrated GPU |
| History | AI research with every fact cited (Polybius, Livy, modern scholarship); invented parts labeled in-game; you do a final read |
| Assets | Test 1–2 AI-generated 3D assets (Meshy or Tripo), rigged and animated with Mixamo; free CC0 packs (Poly Haven, Quaternius, Kenney) for the rest |
| Money | Up to ~$30 for one month of an AI 3D tool; everything else free |
| Accounts | You create GitHub, Adobe/Mixamo and Meshy/Tripo accounts when each is needed; I give click-by-click steps |
| Hosting | GitHub Pages; nothing is published without your OK |
| Project folder | `C:\Users\daphn\claude-code\hannibal-game` (outside OneDrive), a git repo from day one |
| Spike mission | Walk the harbor → talk to a veteran officer (a labeled composite character) about the acclamation and the silver mines → inspect a supply crate → history card on Barcid Iberia |

## Pass bar for the spike (all must hold for "GO")
1. A public GitHub Pages URL opens in a fresh Chrome/Edge window, with no installs needed.
2. Hannibal walks and runs around a small New Carthage harbor street with third-person camera and collision, and never falls through the ground.
3. One NPC conversation → objective → crate interaction → history card with citations and a fiction label → completion message; replayable.
4. At least one AI-generated asset (ideally the Hannibal character, animated) appears in the scene.
5. 30+ fps on the RTX during normal play. On the Intel iGPU, the result is recorded (playable or not).
6. Download size and load time are measured and recorded (target ≤150 MB, start-to-play ≤20 s).
7. A written decision record: go/no-go, measured numbers, hours spent, what the AI did well or badly, and a rough estimate for the full MVP.

## Work plan (~8–10 sessions of 1–2 h each)
Each gate has a pass/fail check. A failed gate doesn't mean pushing on regardless: it triggers the listed fallback or a no-go.

**Session 1 — Setup**
- Move this session to `C:\Users\daphn\claude-code\hannibal-game`, run `git init`, and check whether Node.js is installed. If it isn't, you install it from nodejs.org and I walk you through it.
- Scaffold a Vite + Three.js + Rapier project with exact pinned versions.
- Create the tracking files: `docs/decisions.md` (decision log), `docs/assets.csv` (asset manifest: name, author, URL, date, license, credit, changes), `docs/history-sources.md` (facts → citations, plus an uncertainty log).

**Session 2 — Research (no code, can run in parallel)**
- History brief for 221 BCE New Carthage with citations: the founding of New Carthage by Hasdrubal, his assassination, the army's acclamation of Hannibal, the silver mines, what the harbor and town looked like, and appropriate clothing and gear. Mark what is uncertain.
- Asset scouting: Poly Haven skies and textures, Quaternius/Kenney CC0 characters and props, and the Meshy/Tripo free vs paid license terms. Record the candidates in the manifest; no bulk downloads.

**Gate A — Graybox movement (sessions 3–4)**
- Flat ground, box "buildings", a harbor edge, a capsule stand-in for the player, WASD + mouse third-person camera, Rapier collision, and an on-screen fps counter.
- **You create a GitHub account** → first deploy to GitHub Pages.
- Pass: walks smoothly, collides correctly, 60 fps on the RTX, URL works.
- **Kill/fallback:** if movement or collision is still unreliable after session 4, switch to Godot web export and record why.

**Gate B — Asset pipeline (sessions 5–6)**
- **You create Meshy or Tripo + Adobe accounts.** Generate a Hannibal figure and one Punic-style building. Auto-rig the figure in Mixamo (idle, walk, run), export it as GLB and compress it.
- Bring both into the scene, with the character animated and blending between idle, walk and run.
- Pass: correct scale and pivots, animation plays, the file is reasonably sized, fps holds.
- **Fallback:** use a pre-animated CC0 Quaternius character, labeled as a placeholder. Note that AI-generated characters are not yet viable.

**Gate C — Visual quality (session 7)**
- HDRI sky lighting, shadows, PBR ground and wall textures, simple water, and post-processing (tone mapping, light bloom, ambient occlusion).
- You review screenshots: "good enough to be fun?"
- Measure fps on the RTX and on the Intel iGPU. On a two-GPU laptop, Chrome can be forced to the Intel chip in Windows Graphics settings; I'll guide you.

**Gate D — Mission and learning loop (session 8)**
- Officer NPC with authored dialogue (a data file, not live AI), interaction prompt, objective tracker, crate inspection, and a history card with citations and a "composite character / reconstruction" label. Includes restart.
- Pass: you play it start to finish without help.

**Gate E — Measure and decide (sessions 9–10)**
- A 20-minute play test, plus fps, download size and load time on a fresh browser profile.
- Write the decision record. If GO: a scoped roadmap to the full MVP (one 10–15 min mission, 3 NPCs, 3 sourced history points, save checkpoint), with an effort estimate based on real hours spent. If NO-GO: what failed and what the cheapest alternative is (e.g. Godot, or a campaign map with simpler scenes).

## How I verify my own work along the way
- Run the dev server and play-test in the built-in browser: screenshots, console errors, and the fps readout every session.
- Check scripted scenarios in the browser (e.g. walk into a wall → player stops; walk off the edge → respawn).
- Commit after every working step so any AI mistake can be undone.
- Test the deployed GitHub Pages build, not just the local preview.

## Your role
- Create accounts when asked, approve each publish, and play the build at each gate.
- Judge the look and feel, and give the history card a final read.
- Approve any spending (≤$30).

## Out of scope for the spike
Combat, horses, elephants, crowds, save/load, sound polish, multiple missions, mobile, Safari/Firefox, live AI dialogue, any GTA content.
