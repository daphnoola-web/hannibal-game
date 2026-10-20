// Rename Meshy clips (Idle_3 -> idle, Walking -> walk, Running -> run, ...) in one GLB.
import { NodeIO } from '@gltf-transform/core';
const [,, src, dst] = process.argv;
const map = { Idle_3: 'idle', Walking: 'walk', Running: 'run' };
const io = new NodeIO();
const doc = await io.read(src);
for (const a of doc.getRoot().listAnimations()) a.setName(map[a.getName()] ?? a.getName());
await io.write(dst, doc);
