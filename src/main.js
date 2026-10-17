// Gate A graybox: third-person walk/run around a harbor street with Rapier collision.
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

await RAPIER.init();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9cc7e8);
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 500);

scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7354, 1.2));
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(20, 30, 10);
sun.castShadow = true;
sun.shadow.camera.left = -40; sun.shadow.camera.right = 40;
sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -40;
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun);

const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

// ---- Level: quay (ground) z in [-30, 12], sea beyond z > 12 ----
const sandMat = new THREE.MeshStandardMaterial({ color: 0xd8c39a });
const wallMat = new THREE.MeshStandardMaterial({ color: 0xb59a74 });

function addBox(x, y, z, w, h, d, mat, visible = true) {
  world.createCollider(RAPIER.ColliderDesc.cuboid(w / 2, h / 2, d / 2).setTranslation(x, y, z));
  if (!visible) return;
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  scene.add(m);
}

addBox(0, -0.5, -9, 60, 1, 42, sandMat);           // quay, top at y = 0
// Sea (visual only): player falling in triggers respawn.
const sea = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0x2a6f8f })
);
sea.rotation.x = -Math.PI / 2;
sea.position.set(0, -1.5, 112);
scene.add(sea);

// Buildings along the north side and two cross-street blocks.
addBox(-18, 3, -24, 16, 6, 10, wallMat);
addBox(0, 4, -24, 12, 8, 10, wallMat);
addBox(16, 3, -24, 18, 6, 10, wallMat);
addBox(-12, 2, -6, 8, 4, 6, wallMat);
// Punic harbor building (Meshy AI model): scaled to 7 m tall, box collider from its bounds.
new GLTFLoader().load(import.meta.env.BASE_URL + 'models/punic_building.glb', (gltf) => {
  const b = gltf.scene;
  let box = new THREE.Box3().setFromObject(b);
  const k = 7 / (box.max.y - box.min.y);
  b.scale.setScalar(k);
  box = new THREE.Box3().setFromObject(b);
  b.position.set(10 - (box.min.x + box.max.x) / 2, -box.min.y, -8 - (box.min.z + box.max.z) / 2);
  b.traverse((o) => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
  scene.add(b);
  const w = box.max.x - box.min.x, h = box.max.y - box.min.y, d = box.max.z - box.min.z;
  addBox(10, h / 2, -8, w, h, d, wallMat, false);
}, undefined, () => addBox(10, 2.5, -8, 10, 5, 6, wallMat)); // fallback: grey box
// Crates and a bollard cluster on the quay edge.
for (let i = 0; i < 5; i++) addBox(-8 + i * 1.2, 0.5, 8, 1, 1, 1, new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
// Boundary walls (invisible) on the other sides.
addBox(-30.5, 3, -9, 1, 6, 42, wallMat, false);
addBox(30.5, 3, -9, 1, 6, 42, wallMat, false);
addBox(0, 3, -30.5, 60, 6, 1, wallMat, false);

// ---- Player: kinematic capsule + Rapier character controller ----
const HALF = 0.5, RADIUS = 0.35; // capsule: total height 1.7
const SPAWN = { x: 0, y: 1.2, z: 2 };
const playerBody = world.createRigidBody(
  RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(SPAWN.x, SPAWN.y, SPAWN.z)
);
const playerCol = world.createCollider(RAPIER.ColliderDesc.capsule(HALF, RADIUS), playerBody);
const controller = world.createCharacterController(0.02);
controller.enableAutostep(0.3, 0.2, false);
controller.enableSnapToGround(0.3);
controller.setSlideEnabled(true);
controller.setMaxSlopeClimbAngle(Math.PI / 4);

const player = new THREE.Mesh(
  new THREE.CapsuleGeometry(RADIUS, HALF * 2, 6, 12),
  new THREE.MeshStandardMaterial({ color: 0xa83232 })
);
player.castShadow = true;
scene.add(player);
// Nose marker so facing direction is visible on a plain capsule.
const nose = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.3), new THREE.MeshStandardMaterial({ color: 0xffffff }));
nose.position.set(0, 0.5, -RADIUS);
player.add(nose);

// ---- Character model (Meshy AI model rigged and animated with Mixamo) ----
// Idle/walk/run clips crossfade on movement state; falls back to the capsule if loading fails.
let mixer = null, actions = {}, currentAction = null;
function playState(name) {
  const next = actions[name];
  if (!next || next === currentAction) return;
  next.reset().fadeIn(0.2).play();
  if (currentAction) currentAction.fadeOut(0.2);
  currentAction = next;
}
new GLTFLoader().load(import.meta.env.BASE_URL + 'models/hannibal.glb', (gltf) => {
  const model = gltf.scene;
  model.rotation.y = Math.PI; // model faces +z; player faces -z
  model.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  player.add(model);
  player.material.visible = false;
  nose.visible = false;
  mixer = new THREE.AnimationMixer(model);
  const clip = (n) => mixer.clipAction(THREE.AnimationClip.findByName(gltf.animations, n));
  actions = { idle: clip('idle'), walk: clip('walk'), run: clip('run') };
  playState('idle');
  // Fit to the capsule using the posed skinned vertices (Box3 on a skinned mesh is unreliable).
  mixer.update(0.3); // finish the idle fade-in so the measured pose is the real one
  const measure = () => {
    player.updateMatrixWorld(true);
    let lo = Infinity, hi = -Infinity;
    const v = new THREE.Vector3();
    model.traverse((o) => {
      if (!o.isSkinnedMesh) return;
      o.skeleton.update();
      for (let i = 0; i < o.geometry.attributes.position.count; i++) {
        o.getVertexPosition(i, v).applyMatrix4(o.matrixWorld);
        player.worldToLocal(v);
        lo = Math.min(lo, v.y); hi = Math.max(hi, v.y);
      }
    });
    return [lo, hi];
  };
  let [lo, hi] = measure();
  model.scale.multiplyScalar((2 * (HALF + RADIUS)) / (hi - lo));
  [lo] = measure();
  model.position.y -= lo + (HALF + RADIUS); // feet at the capsule bottom
}, undefined, (e) => console.warn('Character model failed to load; using capsule', e));

// ---- Input ----
const keys = new Set();
addEventListener('keydown', (e) => keys.add(e.code));
addEventListener('keyup', (e) => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
let yaw = 0, pitch = 0.35;
renderer.domElement.addEventListener('click', () => renderer.domElement.requestPointerLock());
addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== renderer.domElement) return;
  yaw -= e.movementX * 0.0025;
  pitch = Math.min(1.2, Math.max(-0.2, pitch + e.movementY * 0.0025));
});

// ---- Fixed-timestep simulation ----
const DT = 1 / 60;
world.timestep = DT;
const WALK = 3.5, RUN = 7, GRAVITY = -20;
let vy = 0, facing = 0, moveState = 'idle';
const prev = new THREE.Vector3(SPAWN.x, SPAWN.y, SPAWN.z);
const curr = prev.clone();

function simulate() {
  prev.copy(curr);
  const f = (keys.has('KeyW') ? 1 : 0) - (keys.has('KeyS') ? 1 : 0);
  const r = (keys.has('KeyD') ? 1 : 0) - (keys.has('KeyA') ? 1 : 0);
  const speed = keys.has('ShiftLeft') || keys.has('ShiftRight') ? RUN : WALK;
  // Camera-relative move direction (forward = -z rotated by yaw).
  let dx = -Math.sin(yaw) * f + Math.cos(yaw) * r;
  let dz = -Math.cos(yaw) * f - Math.sin(yaw) * r;
  const len = Math.hypot(dx, dz);
  if (len > 0) {
    dx /= len; dz /= len;
    facing = Math.atan2(-dx, -dz);
  }
  moveState = len > 0 ? (speed === RUN ? 'run' : 'walk') : 'idle';
  vy = controller.computedGrounded() ? 0 : vy + GRAVITY * DT;
  const desired = { x: dx * speed * DT * (len > 0 ? 1 : 0), y: vy * DT, z: dz * speed * DT * (len > 0 ? 1 : 0) };
  controller.computeColliderMovement(playerCol, desired);
  const m = controller.computedMovement();
  const p = playerBody.translation();
  const next = { x: p.x + m.x, y: p.y + m.y, z: p.z + m.z };
  playerBody.setNextKinematicTranslation(next);
  world.step();
  curr.set(next.x, next.y, next.z);
  if (next.y < -10) respawn();
}

function respawn() {
  playerBody.setTranslation(SPAWN, true);
  playerBody.setNextKinematicTranslation(SPAWN);
  curr.set(SPAWN.x, SPAWN.y, SPAWN.z);
  prev.copy(curr);
  vy = 0;
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ---- Loop ----
const fpsEl = document.getElementById('fps');
let frames = 0, fpsLast = performance.now();
let acc = 0, lastT = performance.now();
const camTarget = new THREE.Vector3();
const camPos = new THREE.Vector3();
const render = new THREE.Vector3();

renderer.setAnimationLoop(() => {
  const now = performance.now();
  if (mixer) { playState(moveState); mixer.update(Math.min((now - lastT) / 1000, 0.1)); }
  acc += Math.min((now - lastT) / 1000, 0.1); // clamp to avoid spiral after tab switch
  lastT = now;
  while (acc >= DT) { simulate(); acc -= DT; }

  render.lerpVectors(prev, curr, acc / DT); // smooth between physics ticks
  player.position.copy(render);
  player.rotation.y = facing;

  camTarget.set(render.x, render.y + 0.8, render.z);
  const dist = 6;
  camPos.set(
    camTarget.x + Math.sin(yaw) * Math.cos(pitch) * dist,
    camTarget.y + Math.sin(pitch) * dist,
    camTarget.z + Math.cos(yaw) * Math.cos(pitch) * dist
  );
  camera.position.copy(camPos);
  camera.lookAt(camTarget);

  renderer.render(scene, camera);

  frames++;
  if (now - fpsLast >= 1000) {
    fpsEl.textContent = `${frames} fps`;
    frames = 0;
    fpsLast = now;
  }
});

// Exposed for automated checks in the browser.
window.__game = { scene, player, getAnim: () => currentAction && currentAction.getClip().name, playerBody, keys, respawn, setYaw: (v) => { yaw = v; } };
