import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 3000;

function GlitterParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const [particles] = useState(() => {
    return Array.from({ length: MAX_PARTICLES }, () => ({
      position: new THREE.Vector3(0, -9999, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      color: new THREE.Color(),
      life: 0,
      maxLife: Math.random() * 80 + 40,
      size: Math.random() * 1.5 + 0.5,
      targetSize: 0,
    }));
  });

  const positions = useMemo(() => new Float32Array(MAX_PARTICLES * 3), []);
  const colors = useMemo(() => new Float32Array(MAX_PARTICLES * 3), []);
  const sizes = useMemo(() => new Float32Array(MAX_PARTICLES), []);

  const palette = useMemo(() => [
    new THREE.Color('#00ffff'), // Cyan
    new THREE.Color('#ff00ff'), // Magenta
    new THREE.Color('#ffff00'), // Yellow
    new THREE.Color('#00ffcc'), // Teal
    new THREE.Color('#ff3366'), // Neon Pink
    new THREE.Color('#3366ff')  // Neon Blue
  ], []);

  const particleIndex = useRef(0);
  const mouse = useRef(new THREE.Vector2(-9999, -9999));
  const prevMouse = useRef(new THREE.Vector2(-9999, -9999));
  const targetMouse = useRef(new THREE.Vector2(-9999, -9999));

  // Custom shader for round glowing particles
  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      attribute float size;
      attribute vec3 customColor;
      varying vec3 vColor;
      void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float ll = length(xy);
        if (ll > 0.5) discard;
        // Soft glowing circle
        float alpha = pow((0.5 - ll) * 2.0, 1.5);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending, // NormalBlending makes it visible on light backgrounds too
  }), []);

  // Track mouse globally so it works even if DOM elements are covering the canvas
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Convert to normalized device coordinates
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouse.current.set(nx, ny);
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    shaderMaterial.uniforms.time.value = state.clock.elapsedTime;

    // Convert normalized device coordinates to world space
    const x = (targetMouse.current.x * viewport.width) / 2;
    const y = (targetMouse.current.y * viewport.height) / 2;

    
    // Only spawn particles if mouse is actively moving and on screen
    const isMouseActive = Math.abs(targetMouse.current.x) < 2 && Math.abs(targetMouse.current.y) < 2;

    if (isMouseActive && mouse.current.x !== -9999) {
      mouse.current.set(x, y);

      const dist = mouse.current.distanceTo(prevMouse.current);
      // Spawn extra based on distance, but always spawn at least a couple for full continuous trail
      const numToSpawn = Math.max(2, Math.min(Math.floor(dist * 200), 50)); 
      
      for (let i = 0; i < numToSpawn; i++) {
        const p = particles[particleIndex.current];
        
        const lerpFactor = numToSpawn > 1 ? i / (numToSpawn - 1) : 1;
        p.position.lerpVectors(prevMouse.current as unknown as THREE.Vector3, mouse.current as unknown as THREE.Vector3, lerpFactor);
        
        // Spread effect
        p.position.x += (Math.random() - 0.5) * 0.5;
        p.position.y += (Math.random() - 0.5) * 0.5;
        p.position.z = (Math.random() - 0.5) * 2;
        
        // Swirling velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.05 + 0.01;
        p.velocity.set(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5) * 0.05
        );
        
        const color = palette[Math.floor(Math.random() * palette.length)];
        p.color.copy(color);
        
        p.targetSize = p.size;
        p.life = p.maxLife;
        
        particleIndex.current = (particleIndex.current + 1) % MAX_PARTICLES;
      }
      prevMouse.current.copy(mouse.current);
    } else if (isMouseActive) {
      // First frame mouse init
      mouse.current.set(x, y);
      prevMouse.current.set(x, y);
    }

    if (pointsRef.current) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles[i];
        const idx = i * 3;
        
        if (p.life > 0) {
          p.life--;
          
          // Fluid swirly movement using time and position
          p.velocity.x += Math.sin(state.clock.elapsedTime * 2 + p.position.y) * 0.001;
          p.velocity.y += Math.cos(state.clock.elapsedTime * 2 + p.position.x) * 0.001;
          
          // Friction
          p.velocity.multiplyScalar(0.98);
          p.position.add(p.velocity);
          
          positions[idx] = p.position.x;
          positions[idx + 1] = p.position.y;
          positions[idx + 2] = p.position.z;

          colors[idx] = p.color.r;
          colors[idx + 1] = p.color.g;
          colors[idx + 2] = p.color.b;

          // Fade out size
          sizes[i] = p.targetSize * (p.life / p.maxLife);
        } else {
          positions[idx] = 0;
          positions[idx + 1] = -9999;
          positions[idx + 2] = 0;
          sizes[i] = 0;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.customColor.needsUpdate = true;
      pointsRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={MAX_PARTICLES}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-customColor"
          args={[colors, 3]}
          count={MAX_PARTICLES}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={MAX_PARTICLES}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <GlitterParticles />
      </Canvas>
    </div>
  );
}
