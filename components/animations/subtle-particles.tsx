'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useReducedMotion } from '@/lib/animation-system/hooks/useReducedMotion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  opacity: number;
}

interface SubtleParticlesProps {
  trigger?: boolean;
  className?: string;
}

export function SubtleParticles({ trigger = false, className = '' }: SubtleParticlesProps) {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const particleId = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const spawnParticles = useCallback((x: number, y: number) => {
    if (reducedMotion) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < 3; i++) {
      newParticles.push({
        id: particleId.current++,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1 - 0.5, // slight upward bias
        life: 1,
        size: Math.random() * 3 + 1,
        opacity: 0.6,
      });
    }

    setParticles(prev => [...prev, ...newParticles].slice(-20)); // Keep max 20
  }, [reducedMotion]);

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const updateParticles = () => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.01, // gravity
            life: p.life - 0.008,
            opacity: p.opacity * 0.995,
          }))
          .filter(p => p.life > 0)
      );

      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, reducedMotion]);

  // Spawn particles when trigger changes
  useEffect(() => {
    if (trigger && mounted && !reducedMotion) {
      // Spawn from center with some randomness
      const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
      const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;
      spawnParticles(centerX, centerY);
    }
  }, [trigger, mounted, reducedMotion, spawnParticles]);

  if (!mounted || reducedMotion) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className='absolute rounded-full bg-gradient-to-r from-blue-400/60 to-purple-400/60'
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity * particle.life,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}