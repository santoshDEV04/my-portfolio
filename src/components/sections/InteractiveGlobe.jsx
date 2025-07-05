import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const InteractiveGlobe = () => {
  const mountRef = useRef(null);
  const frameIdRef = useRef(null);
  const handleMouseMoveRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Prevent double initialization (React StrictMode)
    if (mount.childElementCount) return;

    const width = mount.offsetWidth;
    const height = mount.offsetHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- Globe Wireframe ---
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);

    // --- Particle Ring ---
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);

    scene.add(wireframeSphere, particles);

    // --- Mouse Interaction ---
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mount.addEventListener("mousemove", handleMouseMove);
    handleMouseMoveRef.current = handleMouseMove;

    // --- Animation Loop ---
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Continuous spin
      wireframeSphere.rotation.y += 0.004;
      particles.rotation.y += 0.002;

      // Interactivity
      const targetX = mouse.y * 0.3;
      const targetY = mouse.x * 0.3;
      wireframeSphere.rotation.x += (targetX - wireframeSphere.rotation.x) * 0.05;
      wireframeSphere.rotation.y += (targetY - wireframeSphere.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup on Unmount ---
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      mount.removeEventListener("mousemove", handleMouseMoveRef.current);
      mount.removeChild(renderer.domElement);

      sphereGeo.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-[400px] h-[400px] sm:w-[360px] sm:h-[360px] xs:w-[300px] xs:h-[300px]"
      style={{ cursor: "grab" }}
    />
  );
};

export default InteractiveGlobe;