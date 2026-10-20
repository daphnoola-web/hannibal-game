// Keep only the clips the game uses from a Meshy GLB and give them short names.
import { NodeIO } from '@gltf-transform/core';
const [,, src, dst] = process.argv;
const keep = {
  Idle_3: 'idle', Walking: 'walk', Running: 'run', Sneaky_Walk_inplace: 'crouch',
  Talk_with_Hands_Open: 'talk_open', Talk_Passionately: 'talk_passionate', Wave_One_Hand: 'wave',
};
const io = new NodeIO();
const doc = await io.read(src);
for (const a of doc.getRoot().listAnimations()) {
  if (keep[a.getName()]) a.setName(keep[a.getName()]); else a.dispose();
}
await io.write(dst, doc);
console.log(doc.getRoot().listAnimations().map((a) => a.getName()).join(', '));
