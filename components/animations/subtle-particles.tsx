'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

function createParticle(id: number, x: number, y: number): Particle {
  return {
    id,
    x: x + (Math.random() - 0.5) * 20,
    y: y + (Math.random() - 0.5) * 20,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1 - 0.5,
    life: 1,
    size: Math.random() * 3 + 1,
    opacity: 0.6,
  };
}

function updateParticle(particle: Particle): Particle {
  return {
    ...particle,
    x: particle.x + particle.vx,
    y: particle.y + particle.vy,
    vy: particle.vy + 0.01,
    life: particle.life - 0.008,
    opacity: particle.opacity * 0.995,
  };
}

interface ParticleComponentProps {
  particle: Particle;
}

function ParticleComponent({ particle }: ParticleComponentProps) {
  const particleStyle = useMemo(
    () => ({
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      opacity: particle.opacity * particle.life,
      filter: 'blur(1px)',
    }),
    [particle.x, particle.y, particle.size, particle.opacity, particle.life]
  );

  return (
    <motion.div
      className='absolute rounded-full bg-gradient-to-r from-blue-400/60 to-purple-400/60'
      style={particleStyle}
    />
  );
}

function useParticleSystem(reducedMotion: boolean, mounted: boolean) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const spawnParticles = useCallback(
    (x: number, y: number) => {
      if (reducedMotion) return;

      const newParticles: Particle[] = [];
      for (let i = 0; i < 3; i++) {
        newParticles.push(createParticle(particleId.current++, x, y));
      }

      setParticles(prev => [...prev, ...newParticles].slice(-20));
    },
    [reducedMotion]
  );

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const update = () => {
      setParticles(prev => prev.map(updateParticle).filter(p => p.life > 0));
      animationFrameRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, reducedMotion]);

  return { particles, spawnParticles };
}

export function SubtleParticles({
  trigger = false,
  className = '',
}: SubtleParticlesProps) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { particles, spawnParticles } = useParticleSystem(
    reducedMotion,
    mounted
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (trigger && mounted && !reducedMotion) {
      const centerX =
        typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
      const centerY =
        typeof window !== 'undefined' ? window.innerHeight / 2 : 300;
      spawnParticles(centerX, centerY);
    }
  }, [trigger, mounted, reducedMotion, spawnParticles]);

  if (!mounted || reducedMotion) return null;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map(particle => (
        <ParticleComponent key={particle.id} particle={particle} />
      ))}
    </div>
  );
}
