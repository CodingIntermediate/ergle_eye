'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useEnvironment } from '@/context/environment-context';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { environmentScript } = useEnvironment();
  const modelGroupRef = useRef<THREE.Group>();
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const posArray = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // Mouse movement
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll movement
    const handleScroll = () => {
        camera.position.z = 5 + window.scrollY * 0.005;
    }
    window.addEventListener('scroll', handleScroll);

    // Animation loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      starField.rotation.y += 0.0001;
      starField.rotation.x += 0.0001;
      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.y += 0.0005;
      }
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // Script execution for generated environment
    if (environmentScript) {
      if (modelGroupRef.current) {
        scene.remove(modelGroupRef.current);
        modelGroupRef.current.clear();
      }
      try {
        const modelGroup = new THREE.Group();
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const generatedFunction = new Function('scene', 'THREE', 'modelGroup', environmentScript);
        generatedFunction(scene, THREE, modelGroup);
        scene.add(modelGroup);
        modelGroupRef.current = modelGroup;
      } catch (error) {
        console.error("Error executing generated 3D script:", error);
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      if (modelGroupRef.current) {
        scene.remove(modelGroupRef.current);
      }
    };
  }, [environmentScript]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
}
