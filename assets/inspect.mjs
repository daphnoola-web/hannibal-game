import { NodeIO } from '@gltf-transform/core';
const io = new NodeIO();
for (const f of process.argv.slice(2)) {
  const d = await io.read(f); const r = d.getRoot();
  const tris = r.listMeshes().flatMap(m=>m.listPrimitives()).reduce((s,p)=>s+(p.getIndices()?.getCount()||0)/3,0);
  console.log(f, 'nodes', r.listNodes().length, 'skins', r.listSkins().length, 'joints', r.listSkins()[0]?.listJoints().length, 'anims', r.listAnimations().map(a=>a.getName()+':'+a.listChannels().length), 'tris', tris, 'tex', r.listTextures().map(t=>t.getName()+' '+t.getSize()), 'mats', r.listMaterials().length);
}
