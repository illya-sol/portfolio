import * as THREE from 'three';
import { OrbitControls } from 'THREE/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import vertexShader from './shaders/vertexShader.glsl';

const container = document.getElementById('renderElement')!;
const resX = window.innerWidth;
const resY = window.innerHeight;

export const initThree = (basePath: string) => {
  const camera = new THREE.PerspectiveCamera(80, resX / resY, 1, 10000);

  const dummyCamera = new THREE.OrthographicCamera(
    resX / -2,
    resX / 2,
    resY / 2,
    resY / -2,
    -10000,
    10000
  );
  dummyCamera.position.z = 1;

  const scene = new THREE.Scene();
  const dummyScene = new THREE.Scene();

  const rtTexture = new THREE.WebGLRenderTarget(
    resX / 20, // resolution x
    resY / 20, // resolution y
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
    }
  );

  const uniforms = {
    tDiffuse: {
      value: rtTexture.texture,
    },
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
  };

  const materialScreen = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader: `#include <common>
 
    uniform vec3 iResolution;
    uniform float iTime;
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    
        vec2 uv = vUv / 1.0;
        fragColor = texture2D(tDiffuse, uv + vec2(sin(iTime*10.0 + uv.y * 10.0) * 0.01, 0.0));
    
    }
    
    void main() {
    
      mainImage(gl_FragColor, gl_FragCoord.xy);
    }`,
    depthWrite: false,
  });

  const plane = new THREE.PlaneGeometry(resX, resY);
  // plane to display rendered texture
  const quad = new THREE.Mesh(plane, materialScreen);
  quad.position.z = -100;
  dummyScene.add(quad);

  // const geometry = new THREE.TorusGeometry(100, 25, 15, 30);

  // const mat1 = new THREE.MeshBasicMaterial({
  //   color: 0x555555,
  // });
  // const mat2 = new THREE.MeshBasicMaterial({
  //   color: 0x550000,
  // });

  // const zmesh1 = new THREE.Mesh(geometry, mat1);
  // zmesh1.position.set(0, 0, 100);
  // zmesh1.scale.set(1.5, 1.5, 1.5);
  // scene.add(zmesh1);

  // const zmesh2 = new THREE.Mesh(geometry, mat2);
  // zmesh2.position.set(0, 150, 100);
  // zmesh2.scale.set(0.75, 0.75, 0.75);
  // zmesh2.rotation.y = Math.PI / 2;
  // scene.add(zmesh2);

  const renderer = new THREE.WebGLRenderer({
    canvas: container,
    alpha: true,
  });
  // renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setClearColor(0xffd7a6);
  renderer.setSize(300, 250);
  renderer.autoClear = false;

  camera.position.setZ(24);
  camera.position.setY(0);
  camera.rotation.z = Math.PI;

  // const geometry = new THREE.BoxGeometry(50, 50, 2);
  // const material = new THREE.MeshStandardMaterial({
  //   color: '#FF5733',
  // });
  // const box = new THREE.Mesh(geometry, material);
  // box.material.side = THREE.DoubleSide;
  // // scene.add(box);

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
      logo.position.set(3.5, -3.5, 0);
      logo.castShadow = true;
      // logo.position.normalize();
      scene.add(logo);
    }
  });

  function render() {
    camera.lookAt(scene.position);
    // requestAnimationFrame(mainLoop);

    // Render first scene into texture

    renderer.setRenderTarget(rtTexture);
    renderer.clear();
    renderer.render(scene, camera);
    // Render full screen quad with generated texture
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(dummyScene, dummyCamera);
    // logo.rotation.z = Math.sin(Date.now() * 0.001) * 0.4;

    controls.update();
  }

  function animate(time: number) {
    const newTime = time * 0.0004;
    uniforms.iResolution.value.set(resX, resY, 1);
    uniforms.iTime.value = newTime;
    requestAnimationFrame(animate);
    render();
  }
  animate(0);
  // render();
};
