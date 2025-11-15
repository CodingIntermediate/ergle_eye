'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ReactIcon, JavaScriptIcon, FirebaseIcon, MernIcon } from '@/components/icons';
import { renderToString } from 'react-dom/server';
import { Card, CardContent } from '@/components/ui/card';

const tech = [
  { name: 'React', Icon: ReactIcon, color: '#61DAFB' },
  { name: 'JavaScript', Icon: JavaScriptIcon, color: '#F7DF1E' },
  { name: 'Firebase', Icon: FirebaseIcon, color: '#FFCA28' },
  { name: 'MERN', Icon: MernIcon, color: '#FFFFFF' },
];

export default function TechStackVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // We'll import SVGLoader dynamically to avoid TypeScript/module resolution issues during SSR/build
    let isUnmounted = false;

    (async () => {
      const { SVGLoader } = await import('three/examples/jsm/loaders/SVGLoader');
      if (isUnmounted) return;
      const loader = new SVGLoader();

      tech.forEach(({ Icon, color }, index) => {
        const iconString = renderToString(<Icon fill={color} />);
        const data = loader.parse(iconString);
        const paths = data.paths;

        const iconGroup = new THREE.Group();
        iconGroup.scale.multiplyScalar(0.01);
        iconGroup.scale.y *= -1;

        for (const path of paths) {
          const material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false,
          });
          const shapes = (SVGLoader as any).createShapes(path);
          for (const shape of shapes) {
            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            iconGroup.add(mesh);
          }
        }

        const angle = (index / tech.length) * Math.PI * 2;
        const radius = 2.5;
        iconGroup.position.x = Math.cos(angle) * radius;
        iconGroup.position.y = Math.sin(angle) * radius;
        group.add(iconGroup);
      });
    })();

    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.rotation.x += (mouse.y * 0.2 - group.rotation.x) * 0.05;
      group.rotation.y += (mouse.x * 0.2 - group.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!currentMount) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    }
    window.addEventListener('resize', handleResize)

    return () => {
      isUnmounted = true;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if(currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-primary/20 aspect-video w-full">
      <div ref={mountRef} className="w-full h-full" />
    </Card>
  );
}