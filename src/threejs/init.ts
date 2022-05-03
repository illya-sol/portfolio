import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const initThree = (basePath: string) => {
  const scene = new three.Scene();

  const camera = new three.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight
  );

  const renderer = new three.WebGLRenderer({
    canvas: document.getElementById('renderElement')!,
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(300, 300);
  camera.position.setZ(80);

  renderer.render(scene, camera);

  const geometry = new three.BoxGeometry(50, 50, 2);
  const material = new three.MeshStandardMaterial({
    color: '#FF5733',
  });
  const box = new three.Mesh(geometry, material);
  box.material.side = three.DoubleSide;
  // scene.add(box);

  const pointLight = new three.PointLight(0xffffff);
  pointLight.position.set(30, 30, 20);

  const ambientLight = new three.AmbientLight(0x404040);
  scene.add(pointLight, ambientLight);

  const lightHelper = new three.PointLightHelper(pointLight);
  scene.add(lightHelper);

  const gridHelper = new three.GridHelper(200, 50);
  scene.add(gridHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const loader = new GLTFLoader();
  let logo = new three.Object3D();
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
    box.rotation.y += 0.006;
    logo.rotation.z += 0.006;
    controls.update();
    renderer.render(scene, camera);
  }

  mainLoop();
};
