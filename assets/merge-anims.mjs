// Merge Mixamo clips (Idle with skin + Walking/Running without skin) into one GLB.
import { NodeIO } from '@gltf-transform/core';
const io = new NodeIO();
const base = await io.read('assets/work/Idle.glb');
const root = base.getRoot();
root.listAnimations()[0].setName('idle');
const byName = new Map(root.listNodes().map((n) => [n.getName(), n]));
for (const [file, name] of [['Walking', 'walk'], ['Running', 'run']]) {
  const src = await io.read(`assets/work/${file}.glb`);
  const srcAnim = src.getRoot().listAnimations()[0];
  const anim = base.createAnimation(name);
  for (const ch of srcAnim.listChannels()) {
    const node = byName.get(ch.getTargetNode().getName());
    if (!node) { console.warn('no node for', ch.getTargetNode().getName()); continue; }
    const s = ch.getSampler();
    const sampler = base.createAnimationSampler()
      .setInput(base.createAccessor().setType('SCALAR').setArray(s.getInput().getArray()))
      .setOutput(base.createAccessor().setType(s.getOutput().getType()).setArray(s.getOutput().getArray()))
      .setInterpolation(s.getInterpolation());
    anim.addSampler(sampler).addChannel(base.createAnimationChannel().setTargetNode(node).setTargetPath(ch.getTargetPath()).setSampler(sampler));
  }
}
await io.write('assets/work/hannibal_merged.glb', base);
