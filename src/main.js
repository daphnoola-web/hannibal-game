// Gate A graybox: third-person walk/run around a harbor street with Rapier collision.
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

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
addBox(10, 2.5, -8, 10, 5, 6, wallMat);
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
let vy = 0, facing = 0;
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
window.__game = { playerBody, keys, respawn, setYaw: (v) => { yaw = v; } };
