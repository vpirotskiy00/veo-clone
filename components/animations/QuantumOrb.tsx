'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface QuantumOrbProps {
  index: number;
  config: {
    sizes: number[];
    duration: number[];
    opacity: number;
    blur: string;
  };
  intensity: 'subtle' | 'medium' | 'full';
  animateConfig: {
    x: number[];
    y: number[];
    scale: number[];
  };
}

export function QuantumOrb({
  index,
  config,
  intensity,
  animateConfig,
}: QuantumOrbProps) {
  const configSizes = config.sizes;
  const configDuration = config.duration;
  
  // Safe array access
  const size = index < configSizes.length ? configSizes[index] : 100;
  const duration = index < configDuration.length ? configDuration[index] : 20;

  const orbStyle = useMemo(() => ({
    left: `${20 + ((index * 25) % 60)}%`,
    top: `${15 + ((index * 30) % 70)}%`,
    width: size,
    height: size,
    background: `linear-gradient(135deg, 
      rgba(59, 130, 246, ${config.opacity}), 
      rgba(147, 51, 234, ${config.opacity * 0.8}), 
      rgba(236, 72, 153, ${config.opacity * 0.6})
    )`,
    filter: intensity === 'subtle' ? 'url(#quantum-glow)' : undefined,
  }), [index, size, config.opacity, intensity]);

  const transitionConfig = useMemo(() => ({
    duration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay: index * 2,
  }), [duration, index]);

  return (
    <motion.div
      animate={animateConfig}
      className={`absolute rounded-full ${config.blur}`}
      style={orbStyle}
      transition={transitionConfig}
    />
  );
}