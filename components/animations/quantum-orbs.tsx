'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useReducedMotion } from '@/lib/animation-system/hooks/useReducedMotion';

interface QuantumOrbsProps {
  intensity?: 'subtle' | 'medium' | 'full';
  className?: string;
}

export function QuantumOrbs({
  intensity = 'subtle',
  className = '',
}: QuantumOrbsProps) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reducedMotion) return null;

  const intensityConfig = {
    subtle: {
      count: 2,
      opacity: 0.08,
      sizes: [120, 100],
      blur: 'blur-2xl',
      duration: [20, 25],
    },
    medium: {
      count: 3,
      opacity: 0.15,
      sizes: [150, 130, 110],
      blur: 'blur-3xl',
      duration: [15, 20, 18],
    },
    full: {
      count: 4,
      opacity: 0.25,
      sizes: [200, 180, 160, 140],
      blur: 'blur-3xl',
      duration: [12, 16, 14, 18],
    },
  };

  const config = intensityConfig[intensity];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* SVG Filter for subtle liquid effect */}
      <svg className='absolute' style={{ width: 0, height: 0 }}>
        <defs>
          <filter id='quantum-glow'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='8' />
            <feColorMatrix
              values='
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 15 -7
              '
            />
          </filter>
        </defs>
      </svg>

      {Array.from({ length: config.count }, (_, i) => (
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          className={`absolute rounded-full ${config.blur}`}
          key={i}
          style={{
            left: `${20 + ((i * 25) % 60)}%`,
            top: `${15 + ((i * 30) % 70)}%`,
            width: config.sizes[i],
            height: config.sizes[i],
            background: `linear-gradient(135deg, 
              rgba(59, 130, 246, ${config.opacity}), 
              rgba(147, 51, 234, ${config.opacity * 0.8}), 
              rgba(236, 72, 153, ${config.opacity * 0.6})
            )`,
            filter: intensity === 'subtle' ? 'url(#quantum-glow)' : undefined,
          }}
          transition={{
            duration: config.duration[i],
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
