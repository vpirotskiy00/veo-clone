'use client';

import { motion, useAnimationFrame } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useMousePhysics } from '@/lib/animation-system/hooks/useMousePhysics';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export function ParticleStream() {
  const mouse = useMousePhysics({ damping: 0.2, stiffness: 0.15 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const lastSpawn = useRef(0);

  const spawnParticle = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawn.current < 50) return; // Limit spawn rate
    lastSpawn.current = now;

    const newParticle: Particle = {
      id: particleId.current++,
      x: mouse.x,
      y: mouse.y,
      vx: (Math.random() - 0.5) * 2 + mouse.velocityX * 0.5,
      vy: (Math.random() - 0.5) * 2 + mouse.velocityY * 0.5,
      life: 1,
      size: Math.random() * 4 + 2,
    };

    setParticles((prev) => {
      const updated = [...prev, newParticle];
      // Keep max 50 particles for performance
      return updated.slice(-50);
    });
  }, [mouse.x, mouse.y, mouse.velocityX, mouse.velocityY]);

  useAnimationFrame(() => {
    // Spawn new particle if mouse is moving
    if (Math.abs(mouse.velocityX) > 0.5 || Math.abs(mouse.velocityY) > 0.5) {
      spawnParticle();
    }

    // Update existing particles
    setParticles((prev) =>
      prev
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.98,
          vy: p.vy * 0.98 + 0.1, // Add slight gravity
          life: p.life - 0.02,
        }))
        .filter((p) => p.life > 0)
    );
  });

  return (
    <div className='absolute inset-0 pointer-events-none overflow-hidden'>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className='absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400'
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.life,
            filter: `blur(${(1 - particle.life) * 2}px)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      ))}
    </div>
  );
}