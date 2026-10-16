// Skeleton check: Three.js renders, Rapier simulates. A box falls onto the ground.
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

await RAPIER.init();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9cc7e8);
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 500);
camera.position.set(6, 5, 8);
camera.lookAt(0, 0, 0);

scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7354, 1.2));
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 10, 4);
sun.castShadow = true;
scene.add(sun);

const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

// Ground: static collider + sandy plane.
world.createCollider(RAPIER.ColliderDesc.cuboid(20, 0.1, 20).setTranslation(0, -0.1, 0));
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0xd8c39a })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Falling box: dynamic body mirrored by a mesh.
const boxBody = world.createRigidBody(
  RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 6, 0).setRotation({ x: 0.3, y: 0, z: 0.2, w: 1 })
);
world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5), boxBody);
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x8b3a2b })
);
box.castShadow = true;
scene.add(box);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const fpsEl = document.getElementById('fps');
let frames = 0;
let last = performance.now();

renderer.setAnimationLoop(() => {
  world.step();
  box.position.copy(boxBody.translation());
  box.quaternion.copy(boxBody.rotation());
  renderer.render(scene, camera);

  frames++;
  const now = performance.now();
  if (now - last >= 1000) {
    fpsEl.textContent = `${frames} fps`;
    frames = 0;
    last = now;
  }
});

// Exposed for automated checks in the browser.
window.__game = { boxBody };
