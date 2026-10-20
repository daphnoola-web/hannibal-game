import { NodeIO } from '@gltf-transform/core';
const io = new NodeIO();
for (const f of process.argv.slice(2)) {
  const r = (await io.read(f)).getRoot();
  console.log(f, '| joints', r.listSkins()[0]?.listJoints().length, '|', r.listAnimations().map(a => a.getName() + ' ' + (Math.max(...a.listSamplers().map(s => s.getInput().getMax([0])[0])).toFixed(1)) + 's').join(', '));
}
