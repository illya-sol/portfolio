import * as three from 'three';

export const initThree = () => {
  const scene = new three.Scene();

  const camera = new three.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight
  );

  const renderer = new three.WebGLRenderer({
    canvas: document.getElementById('renderElement')!,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(300, 300);
  camera.position.setZ(80);

  renderer.render(scene, camera);

  const geometry = new three.BoxGeometry(50, 50, 1);
  const material = new three.MeshStandardMaterial({
    color: '#FF5733',
  });
  const box = new three.Mesh(geometry, material);
  box.material.side = three.DoubleSide;
  scene.add(box);

  const pointLight = new three.PointLight(0xffffff);
  pointLight.position.set(20, 20, 20);
  scene.add(pointLight);

  function mainLoop() {
    requestAnimationFrame(mainLoop);
    box.rotation.y += 0.006;
    renderer.render(scene, camera);
  }

  mainLoop();
};
