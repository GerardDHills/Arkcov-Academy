'use client';

import { useEffect, useRef, useState } from 'react';
import s from './atlas.module.css';

// Rotatable 3D anatomy built from open BodyParts3D meshes (CC BY-SA 2.1 JP).
// `parts` maps mesh names in the GLB to { label, color, topic }.
// `focus` is a list of mesh names to highlight; others fade back.
export default function Body3D({ src, parts, focus = [], onPick, height = 520 }) {
  const mount = useRef(null);
  const api = useRef({});
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        if (disposed || !mount.current) return;
        const el = mount.current;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(el.clientWidth, el.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        el.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, el.clientWidth / el.clientHeight, 0.01, 50);
        scene.add(new THREE.HemisphereLight(0xfff4e0, 0x0a1430, 1.1));
        const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(1.5, 2, 3); scene.add(key);
        const rim = new THREE.DirectionalLight(0xe6c27a, 0.9); rim.position.set(-2, 1, -2); scene.add(rim);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; controls.enablePan = false;
        controls.minDistance = 0.6; controls.maxDistance = 4.5;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        controls.autoRotate = !reduce; controls.autoRotateSpeed = 0.8;
        controls.addEventListener('start', () => { controls.autoRotate = false; });

        const gltf = await new GLTFLoader().loadAsync(src);
        if (disposed) return;
        const root = gltf.scene;
        const meshes = {};
        root.traverse((o) => {
          if (!o.isMesh) return;
          const name = o.name || o.parent?.name;
          const cfg = parts[name] || {};
          o.geometry.computeVertexNormals();
          o.material = new THREE.MeshStandardMaterial({ color: cfg.color || '#e8dcc4', roughness: 0.62, metalness: 0.05, transparent: true, opacity: 1 });
          o.userData.part = name;
          meshes[name] = o;
        });
        scene.add(root);
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        controls.target.copy(center);
        camera.position.set(center.x, center.y + size.y * 0.05, center.z + size.y * 1.9);
        controls.update();

        const ray = new THREE.Raycaster();
        const ptr = new THREE.Vector2();
        let down = null;
        const onDown = (e) => { down = { x: e.clientX, y: e.clientY }; };
        const onUp = (e) => {
          if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
          const r = renderer.domElement.getBoundingClientRect();
          ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
          ray.setFromCamera(ptr, camera);
          const hit = ray.intersectObjects(Object.values(meshes).filter((m) => m.visible), false)[0];
          if (hit && api.current.onPick) api.current.onPick(hit.object.userData.part);
        };
        renderer.domElement.addEventListener('pointerdown', onDown);
        renderer.domElement.addEventListener('pointerup', onUp);

        const onResize = () => {
          if (!el.clientWidth) return;
          renderer.setSize(el.clientWidth, el.clientHeight);
          camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(onResize); ro.observe(el);

        let raf; let t = 0;
        const loop = () => {
          t += 0.03;
          const pulse = 0.35 + 0.25 * Math.sin(t);
          Object.values(meshes).forEach((m) => {
            if (m.userData.glow) m.material.emissiveIntensity = pulse;
          });
          controls.update();
          renderer.render(scene, camera);
          raf = requestAnimationFrame(loop);
        };
        loop();

        api.current = { THREE, meshes, onPick: api.current.onPick };
        setReady(true);
        cleanup = () => {
          cancelAnimationFrame(raf); ro.disconnect(); controls.dispose();
          renderer.domElement.removeEventListener('pointerdown', onDown);
          renderer.domElement.removeEventListener('pointerup', onUp);
          renderer.dispose(); el.innerHTML = '';
        };
      } catch (e) {
        setFailed(true);
      }
    })();
    return () => { disposed = true; cleanup(); };
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { api.current.onPick = onPick; }, [onPick]);

  // Apply highlighting whenever focus changes.
  useEffect(() => {
    const { meshes, THREE } = api.current;
    if (!meshes || !THREE) return;
    const any = focus.length > 0;
    Object.entries(meshes).forEach(([name, m]) => {
      const on = focus.includes(name);
      const cfg = parts[name] || {};
      m.material.color.set(on && cfg.focusColor ? cfg.focusColor : cfg.color || '#e8dcc4');
      m.material.opacity = !any || on ? 1 : cfg.organ ? 0.25 : 0.14;
      m.material.depthWrite = !any || on;
      m.material.emissive = new THREE.Color(on ? cfg.glow || '#000000' : '#000000');
      m.userData.glow = on && Boolean(cfg.glow);
      m.renderOrder = on ? 2 : 1;
    });
  }, [focus, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.body3d} style={{ height }}>
      <div ref={mount} className={s.canvas} role="img" aria-label="Interactive 3D model of the skeleton and blood-related organs. Drag to rotate, pinch to zoom, tap a part to learn about it." />
      {!ready && !failed && <div className={s.loading3d}>Assembling the body…</div>}
      {failed && <div className={s.loading3d}>3D view isn’t available on this device. Use the list of structures instead.</div>}
      <p className={s.credit3d}>3D anatomy: BodyParts3D, © 2008 Life Science Integrated Database Center, CC BY-SA 2.1 JP. Simplified for the web.</p>
    </div>
  );
}
