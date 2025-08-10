'use client';

import { useEffect, useState } from 'react';

import { QuantumOrb } from '@/components/animations/QuantumOrb';
import { QuantumSvgFilter } from '@/components/animations/QuantumSvgFilter';
import { useReducedMotion } from '@/lib/animation-system/hooks/useReducedMotion';

interface QuantumOrbsProps {
  intensity?: 'subtle' | 'medium' | 'full';
  className?: string;
}

const intensityConfigs = {
  subtle: {
    count: 2,
    opacity: 0.08,
    sizes: [120, 100] as number[],
    blur: 'blur-2xl',
    duration: [20, 25] as number[],
  },
  medium: {
    count: 3,
    opacity: 0.15,
    sizes: [150, 130, 110] as number[],
    blur: 'blur-3xl',
    duration: [15, 20, 18] as number[],
  },
  full: {
    count: 4,
    opacity: 0.25,
    sizes: [200, 180, 160, 140] as number[],
    blur: 'blur-3xl',
    duration: [12, 16, 14, 18] as number[],
  },
};

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

  const config = intensityConfigs[intensity];
  const animateConfig = {
    x: [0, 30, -20, 0],
    y: [0, -25, 20, 0],
    scale: [1, 1.1, 0.95, 1],
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <QuantumSvgFilter />

      {Array.from({ length: config.count }, (_, i) => (
        <QuantumOrb
          animateConfig={animateConfig}
          config={config}
          index={i}
          intensity={intensity}
          key={i}
        />
      ))}
    </div>
  );
}
