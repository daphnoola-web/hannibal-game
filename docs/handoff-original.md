# Hannibal / Carthage browser game — agent handoff

Prepared: 16 October 2026  
Source conversation: **Historical GTA Mods**, ID `6acf938a-5800-83eb-8ecb-bc12fd6ea0c1`  
Working title: **Hannibal: Rise of Carthage** (suggested title, not finalized)

## 1. Purpose and evidence status

Continue planning a historical, GTA-style third-person game starring Hannibal. This document summarizes the available conversation and adds a proposed implementation roadmap; it is not evidence that a game has been built.

The source conversation was retrieved, but several assistant messages remained truncated. No project files, working builds, downloaded assets, benchmark results, or completed engine evaluations were provided. Do not reconstruct missing text as agreed requirements.

Evidence labels used below:

- **User goal:** directly expressed in the conversation or current handoff request.
- **Prior suggestion:** proposed by the previous assistant, not necessarily approved.
- **Documented:** supported by an official source checked for this handoff; not independently runtime-tested.
- **Proposed:** a recommendation for the next agent, not a recorded decision.
- **Unverified:** needs inspection, testing, historical research, or rights review.

## 2. Vision and desired experience

**User goal:** Create an experience inspired by GTA San Andreas, replacing its setting with ancient Carthage, making Hannibal the protagonist, and teaching Carthaginian history through play. The user wants custom maps, characters, NPCs (non-player characters), missions, weapons, and other assets, with AI-assisted or “vibe-coded” development. They want to reuse downloadable assets instead of modeling everything themselves.

**Current brief:** Browser delivery through a link. A standalone historical game and a modification of the original GTA are alternative technical routes; the engine has not been selected. “GTA-style” describes camera, movement, exploration, and mission structure, not a requirement to copy Rockstar content or branding.

**Prior suggestions:** Explore markets and the harbor, speak to merchants and political figures, fight, ride horses, and follow chapters of Hannibal’s life. Optional desktop delivery was mentioned. These are aspirations, not all MVP requirements.

**Proposed core loop:** Explore a compact district → talk to an NPC → receive a historically grounded objective → complete a traversal or interaction challenge → receive narrative feedback and a short historical explanation.

## 3. Historical setting and content

The earlier assistant framed the campaign around approximately **247–183 BCE**, Hannibal’s lifetime, with Carthage in North Africa as the home setting and later chapters in Iberia and Italy. Treat these as the project’s working historical frame; precise dates, geography, and event interpretations require a separate sourced research pass.

Do not compress the entire life into one supposedly authentic city map. Choose a specific year and Hannibal’s age for each chapter. Proposed long-term coverage includes childhood, military rise in Iberia, the expedition into Italy, and the consequences of the Second Punic War.

| Content | Desired direction | First playable scope |
|---|---|---|
| Maps | Carthage streets, market, harbor, civic spaces; later campaign locations | One compact fictionalized district inspired by Carthage |
| Player | Recognizable custom Hannibal, with suitable clothing and animation | One rigged character; clearly labeled placeholder allowed initially |
| NPCs | Merchants, civilians, soldiers, officials, relevant historical figures | Three named interactive NPCs with distinct roles |
| Missions | Original storylines that teach history through actions and consequences | One complete 10–15 minute mission |
| Weapons | Period-appropriate equipment; candidate spear, sword, shield, javelin | One training weapon and target interaction |
| Other assets | Buildings, pottery, ships, plants, signage, clothing, ambient sound | Small coherent reusable set |
| Travel/combat | Walking, potentially horses and broader combat | Walking/running and simple training interaction |

These weapon types and architectural ideas are research candidates, not a validated equipment list. Avoid treating medieval European buildings or generic Roman equipment as Punic historical evidence. Label composite NPCs, invented dialogue, compressed geography, and speculative reconstructions. Harbor layout and monumental architecture must match the chosen period rather than a generic later reconstruction.

## 4. Engine candidates and decision gate

### OpenSA — exploratory candidate

**Documented repository statements:** The [OpenSA repository](https://github.com/Avatarchik/opensa) describes a TypeScript/Three.js browser engine using Rapier, with RenderWare-related DFF/TXD/COL/IMG and IPL/IDE support. It claims compatibility with San Andreas assets and total conversions. These are maintainer claims, not verified capabilities for this project.

Its README identifies the code as **AGPL-3.0**, with source-sharing obligations, including modified network-served versions. It excludes Rockstar assets from that license and describes the project as an unofficial, non-commercial fan project. Review the actual license and dependencies at the selected commit; the fan-project description is not a substitute for license terms.

**Tradeoff:** Potentially useful GTA-like foundations, but uncertain maintenance, conversion effort, and gameplay completeness. NPC behavior, mission scripting, custom animation, saves, browser performance, and operation using entirely original assets remain unverified. The earlier “built with Claude in three weeks” story is an author claim, not an estimate for this game. Do not assume GLB imports or complete mod compatibility.

### Godot — proposed baseline for a standalone game

**Documented:** Godot supports browser export. Current stable documentation specifies WebAssembly and WebGL 2, the Compatibility renderer, and limitations including no Godot 4 C# web export. Threaded builds have hosting/header requirements; start with a single-threaded GDScript prototype unless testing demonstrates a reason otherwise. Browser support still needs testing on the selected version. [Web export documentation](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html)

Godot uses the **MIT license**. Include required notices and review bundled third-party notices; imported assets and plugins have their own terms. [Godot license](https://godotengine.org/license/)

**Tradeoff:** A general-purpose editor and documented import/export path, but GTA-style controls, missions, crowd behavior, and city streaming are project work. Godot does not supply a finished Carthage or GTA game. Recommended as the comparison baseline, not a finalized selection.

### Original GTA San Andreas mod — alternative if browser delivery changes

**Prior option:** Replace content and implement missions within the original game. Potential advantage: reuse its existing gameplay behavior. Dependencies include the exact game edition, mod tooling, supported file formats, and compatible scripts; none were tested here.

**Tradeoff:** Installation and ownership requirements conflict with a simple browser link. No browser export path for the original executable has been established. A mod working in the original game is not proof it works in OpenSA.

**License caveat:** Treat the base game as proprietary. Do not bundle its executable, music, textures, or other copyrighted content without permission. Owning a copy is not redistribution permission. Inspect the applicable edition’s EULA and mod/tool licenses before choosing this route. The [Rockstar legal portal](https://www.rockstargames.com/legal) was reachable, but applicable agreement text was not retrieved; no legal clearance is claimed.

### Proposed selection test

Time-box a small comparison before building a city. In each viable browser candidate, prove: an original room/street, one custom animated character, collision, third-person movement, one NPC interaction, and a web build on intended hosting. Record engine version/commit, dependencies, setup instructions, missing features, import effort, performance, and licensing obligations.

Choose the route with the lowest demonstrated effort to the first mission. Stop exploring OpenSA if original-content operation or the required import path cannot be demonstrated within the agreed evaluation budget. Keep the native mod route only if the user accepts installation as a change in delivery goal.

## 5. Asset sourcing and import pipeline

Reusable assets can accelerate production; no complete, historically accurate, compatible Carthage map was established in the conversation. A model library is not a playable world: layout, collision, navigation, lighting, interaction, animation, and optimization remain necessary.

| Source | Suggested use | License and validation notes |
|---|---|---|
| [Quaternius](https://quaternius.com/packs/medievalvillagemegakit.html) | Modular prototype environment pieces | Check the exact free/paid tier and included license/formats. CC0 labeling does not mean every advertised item is in the free download. Medieval styling needs replacement or adaptation. |
| [Kenney Fantasy Town Kit](https://kenney.nl/assets/fantasy-town-kit) | Simple stylized blockout and modular town pieces | Listed as CC0. Verify downloaded files and visual fit; fantasy buildings are placeholders, not historical reconstructions. |
| [Poly Haven](https://polyhaven.com/license) | Materials, lighting environments, selected props | Asset library uses CC0; site text, logos, and other content are distinct. Test texture sizes and polygon costs before browser use. |
| [Sketchfab](https://sketchfab.com/features/free-3d-models) | Specific artifacts, scans, architectural references | Availability and licenses vary by model; some links lead to Fab. Download access is not blanket reuse permission. Capture attribution and modification/commercial conditions. See [official CC guidance](https://www.sketchfab.com/blogs/community/an-introduction-to-creative-commons-licenses/). |
| [OpenGameArt](https://opengameart.org/content/faq) | Props, sound, music, supplementary art | Mixed licenses; record the selected license for each item. Check attribution, share-alike obligations, and compatibility with distribution plans. |

Prefer clearly licensed, cohesive assets. Keep a manifest containing asset name, author, source URL, download date, license/version, required credit, modifications, and in-game location. Check rights for sounds, fonts, textures, and animations as well as meshes. “Free,” “royalty-free,” and “open source” are not interchangeable. Obtain clarification or replace assets with unclear provenance.

**Proposed import workflow:**

1. Select one building, one rigged person, and one prop before acquiring a large library.
2. For Godot, prefer glTF 2.0/GLB as the exchange target. Its [format documentation](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_3d_scenes/available_formats.html) describes supported import paths; verify behavior in the chosen version. OBJ suits static geometry, not a skeletal animation pipeline. FBX conversions need validation.
3. For an SA-format route, identify and test the exact converters and exporter versions. A `.glb`, `.fbx`, or `.obj` download is not automatically compatible with a RenderWare pipeline.
4. Check scale, axes, pivots, materials, transparency, UVs, texture paths, skeleton, animation clips, and weapon attachments. Retargeting means adapting animation to a different skeleton; budget for it.
5. Add simple collision and navigation data. Reduce geometry/material count and texture resolution; introduce LODs (simpler distant models) when measurements justify them.
6. Test the exported browser build, not just the editor preview. Retain source files, licenses, and repeatable conversion instructions.

Do not assume support for glTF extensions, compressed textures, shader effects, animation rigs, or importer plugins merely because the base format is supported.

## 6. AI-assisted / vibe-coding approach

Use an AI coding agent to accelerate small, reviewable tasks: movement, camera behavior, dialogue data, mission state, asset-processing helpers, build setup, and tests. Keep the human responsible for play feel, historical interpretation, rights decisions, and final quality.

Each task should state the desired player behavior and a pass/fail check. Work in version control with reversible changes. Review generated code, test the web build after integration, and maintain an issues list. Avoid treating generated facts, models, or code as automatically correct or licensed. Runtime AI dialogue is not required: authored dialogue is the proposed MVP default, avoiding additional cost, latency, and factual inconsistency.

## 7. Phased prototype-to-release roadmap

| Phase | Work | Exit evidence / dependency |
|---|---|---|
| 0 — Brief and research | Choose year, chapter, audience, style, reference hardware, and historical sources; resolve distribution intent | One-page scope, historical uncertainty log, asset/license manifest template |
| 1 — Technical proof | Compare browser candidates using the small scene above | Reproducible hosted build, import results, measured performance, engine decision |
| 2 — Graybox prototype | Build a rough district from simple shapes; implement camera, traversal, interaction, mission start/completion/retry | Entire mission playable with placeholders; no major progression blockers |
| 3 — Vertical slice | Replace key placeholders; add Hannibal, three NPCs, dialogue, weapon training, historical notes, sound, and local checkpoint | One polished representative mission meets acceptance criteria |
| 4 — Content expansion | Add districts and missions in small batches; research each period/location | Reusable production workflow and stable performance before each expansion |
| 5 — Alpha/beta | Test with new players; repair usability, progression, browser compatibility, accessibility, and loading problems | Recorded test results, resolved blocking bugs, reviewed credits/history |
| 6 — Release | Prepare hosting, versioned build, credits/licenses, controls, compatibility notice, feedback route, and rollback copy | Public URL verified on clean browsers; release package and source obligations satisfied |
| 7 — Maintenance | Triage feedback, fix regressions, then consider horses or later campaigns | Stable released baseline before new scope |

No schedule or budget has been approved. Estimate after the technical proof and one mission reveal actual effort. A whole-life open world is a long-term aspiration, not the first release commitment.

## 8. Proposed MVP acceptance criteria

The following are proposed measurable targets, not prior user-approved promises:

- Opens at an HTTPS URL without requiring a GTA installation or proprietary game-file upload.
- Contains one bounded explorable district, one controllable Hannibal character, and three named interactive NPCs.
- Supports keyboard/mouse third-person movement, reliable ground collision, camera control, pause, and understandable controls.
- Provides one 10–15 minute mission with a clear objective, completion state, and restart/retry; a new tester can complete it without developer help.
- Includes one usable training weapon, with observable hit feedback; full combat is not necessary.
- Teaches at least three sourced historical points through mission events or concise optional notes; fictionalization is visibly disclosed.
- Saves one local checkpoint and restores it after refresh in supported normal browsing; handles unavailable storage with an explanation and playable retry.
- Meets a provisional target of at least 30 FPS for 95% of measured active play on agreed reference hardware, at a fixed test resolution. Record hardware, browser version, scene, and measurement method.
- Targets an initial compressed download of at most 50 MB and start-to-play within 15 seconds under a documented 50 Mbps test connection; revise targets explicitly if the measured engine baseline makes them unrealistic.
- Passes an agreed desktop browser matrix; select versions during Phase 0. Safari and mobile support must be explicitly tested before being advertised.
- Has readable dialogue, subtitles for essential speech, keyboard-accessible menus, visible interaction cues, and volume controls.
- Completes a 20-minute test without crashes, progression blockers, repeated critical runtime errors, or falling through required paths.
- Contains a complete asset/third-party credit list and a reproducible build record. No unreviewed proprietary placeholder content reaches release.

**Outside the proposed MVP:** full Carthage, all of Hannibal’s life, multiplayer, live AI NPCs, extensive crowds, cavalry, elephants, naval simulation, large battles, mobile touch controls, voice acting, and procedural worlds. These remain possible later decisions.

## 9. Risks and dependencies

| Risk | Impact | Mitigation / decision dependency |
|---|---|---|
| Unproven engine claims | Project becomes engine repair work | Require a reproducible technical proof before committing |
| Asset/import mismatch | Lost time converting or re-rigging content | Test representative assets and exact exporter/importer versions first |
| Browser limits | Slow loading, memory exhaustion, poor frame rate | Small district, measured budgets, optimized assets, explicit supported devices |
| Scope expansion | No finished release | Finish one mission before expanding locations or systems |
| Rights and license conflicts | Distribution blocked or obligations missed | Keep provenance records; review engine, plugins, assets, and release terms separately |
| Historical inaccuracies | Educational goal undermined | Source notes, expert review where feasible, clear uncertainty/fiction labels |
| Mixed visual styles | Incoherent environment | Choose one style and palette; use placeholders deliberately |
| Overreliance on AI output | Fragile code and incorrect content | Small tasks, human review, gameplay tests, source verification |
| Tool/maintainer changes | Builds become hard to reproduce | Pin versions/commits and preserve permitted source assets and build instructions |

## 10. Open decisions

1. Is a browser link mandatory, or is an installed GTA mod acceptable?
2. Is the release free, commercial, educational, or undecided? Is publishing project source acceptable if required?
3. Which engine passes the technical proof, and which exact version/commit will be used?
4. Which year and episode anchor the first mission? How much fictionalization is acceptable?
5. Stylized low-poly or more realistic visuals? What asset budget is available?
6. Who is the audience, which languages are needed, and what level of violence is appropriate?
7. Which devices/browsers are required, and what hardware defines the performance baseline?
8. Who handles historical review and any custom modeling/animation that reusable assets cannot cover?
9. What time, team size, hosting budget, and maintenance commitment are available?

## 11. Concrete next steps for the receiving agent

1. Confirm the browser requirement, first historical episode, visual style, and distribution intent. Use the proposed small MVP to keep decisions concrete.
2. Inspect OpenSA’s exact current license, setup, feature documentation, and code at a pinned commit. Mark every claimed feature as tested, partial, missing, or unknown; do not use repository marketing as acceptance evidence.
3. Build a minimal Godot browser comparison and test original-content operation in OpenSA if still viable. Report actual results before recommending an engine.
4. Create a tiny asset manifest and test one building, rigged character, and weapon through the selected pipeline. Do not bulk-download assets first.
5. Write a one-page mission outline with three learning objectives, source notes, dialogue roles, and completion/retry conditions.
6. Deliver a playable graybox URL plus a concise decision record: engine/version, asset sources/licenses, supported browser, measured limits, unresolved risks, and next milestone.

This handoff authorizes no assumption that an engine or asset combination has already been validated. Current completed work is research and planning only; implementation, historical verification, rights clearance, and performance testing remain outstanding.
