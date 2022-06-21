import * as THREE from 'THREE';
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'THREE/examples/jsm/loaders/GLTFLoader';

const container = document.getElementById('renderElement')!;
const resX = window.innerWidth;
const resY = window.innerHeight;

export const initThree = (basePath: string) => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, resX / resY);
  camera.zoom = 1.8;
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({
    canvas: container,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(300, 300);
  camera.rotation.z = Math.PI / 180;
  camera.position.setZ(60);
  camera.position.setY(28);
  camera.rotation.z = Math.PI / 35;

  renderer.render(scene, camera);

  const geometry = new THREE.BoxGeometry(50, 50, 2);
  const material = new THREE.MeshStandardMaterial({
    color: '#FF5733',
  });
  const box = new THREE.Mesh(geometry, material);
  box.material.side = THREE.DoubleSide;
  // scene.add(box);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.intensity = 0.75;
  pointLight.position.set(5, 25, 30);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(pointLight, ambientLight);

  // const lightHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(lightHelper);

  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(gridHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const loader = new GLTFLoader();
  let logo = new THREE.Object3D();
  loader.load(`${basePath}/hh-text.glb`, (gltf) => {
    const scale = 20.0;
    logo = gltf.scene.children[2]!;
    if (logo) {
      logo.scale.set(scale, scale, scale);
      logo.position.set(-25, 10, 0);
      logo.castShadow = true;
      logo.position.normalize();
      scene.add(logo);
      // gltf.scene.scale.set(scale, scale, scale);
      // scene.add(gltf.scene);
    }
  });

  function mainLoop() {
    requestAnimationFrame(mainLoop);
    // box.rotation.y += 0.006;
    logo.rotation.z = Math.sin(Date.now() * 0.003) * 0.4;
    controls.update();
    renderer.render(scene, camera);
  }

  mainLoop();
};
