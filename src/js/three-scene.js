import * as THREE from 'three';

export function initThreeScene() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  const goldColor = new THREE.Color(0xd4af37);
  const whiteColor = new THREE.Color(0xffffff);
  const grayColor = new THREE.Color(0x5b5b5b);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

    const colorChoice = Math.random();
    let color;
    if (colorChoice < 0.15) color = goldColor;
    else if (colorChoice < 0.6) color = whiteColor;
    else color = grayColor;

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = Math.random() * 2 + 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const vertexShader = `
    attribute float size;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (200.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float alpha = 1.0 - smoothstep(0.3, 0.5, d);
      gl_FragColor = vec4(vColor, alpha * 0.6);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  const ribbonCount = 5;
  const ribbons = [];
  for (let i = 0; i < ribbonCount; i++) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-8 + Math.random() * 4, -5 + Math.random() * 10, -3 + Math.random() * 2),
      new THREE.Vector3(-3 + Math.random() * 3, -2 + Math.random() * 4, -1 + Math.random() * 2),
      new THREE.Vector3(0 + Math.random() * 3, 1 + Math.random() * 3, 0 + Math.random() * 2),
      new THREE.Vector3(3 + Math.random() * 3, 3 + Math.random() * 4, -1 + Math.random() * 2),
      new THREE.Vector3(6 + Math.random() * 3, 0 + Math.random() * 5, -2 + Math.random() * 2),
    ]);

    const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.015 + Math.random() * 0.02, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0xd4af37 : 0xffffff,
      transparent: true,
      opacity: 0.08 + Math.random() * 0.07,
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    ribbons.push({ mesh: tube, curve, offset: Math.random() * Math.PI * 2 });
    scene.add(tube);
  }

  camera.position.z = 5;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    particles.rotation.y = time * 0.03 + mouseX * 0.1;
    particles.rotation.x = mouseY * 0.05;
    particles.position.y = scrollY * 0.001;

    const posAttr = geometry.getAttribute('position');
    for (let i = 0; i < particleCount; i++) {
      posAttr.array[i * 3 + 1] += Math.sin(time + i * 0.01) * 0.0005;
    }
    posAttr.needsUpdate = true;

    ribbons.forEach((ribbon, i) => {
      ribbon.mesh.rotation.y = time * 0.02 + ribbon.offset;
      ribbon.mesh.rotation.x = Math.sin(time * 0.3 + ribbon.offset) * 0.1;
    });

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
