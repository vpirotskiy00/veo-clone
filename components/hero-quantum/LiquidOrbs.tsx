'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useMouseParallax } from '@/lib/animation-system/hooks/useMousePhysics';

interface OrbConfig {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export function LiquidOrbs() {
  const mouseParallax = useMouseParallax(0.05);
  const containerRef = useRef<HTMLDivElement>(null);

  const orbs: OrbConfig[] = [
    {
      id: 1,
      x: 25,
      y: 20,
      size: 300,
      color: 'from-blue-500/20 to-purple-500/20',
      duration: 20,
      delay: 0,
    },
    {
      id: 2,
      x: 75,
      y: 60,
      size: 400,
      color: 'from-purple-500/20 to-pink-500/20',
      duration: 25,
      delay: 2,
    },
    {
      id: 3,
      x: 50,
      y: 40,
      size: 250,
      color: 'from-cyan-500/20 to-blue-500/20',
      duration: 18,
      delay: 4,
    },
  ];

  return (
    <div className='absolute inset-0 overflow-hidden' ref={containerRef}>
      {/* SVG Filter for liquid effect */}
      <svg className='absolute' style={{ width: 0, height: 0 }}>
        <defs>
          <filter id='liquid-filter'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='10' />
            <feColorMatrix
              values='
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
              '
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid Orbs */}
      <div className='absolute inset-0' style={{ filter: 'url(#liquid-filter)' }}>
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full bg-gradient-to-r ${orb.color} blur-xl`}
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              x: mouseParallax.x * (orb.id * 0.5),
              y: mouseParallax.y * (orb.id * 0.5),
            }}
            animate={{
              x: [
                mouseParallax.x * (orb.id * 0.5),
                mouseParallax.x * (orb.id * 0.5) + 50,
                mouseParallax.x * (orb.id * 0.5) - 50,
                mouseParallax.x * (orb.id * 0.5),
              ],
              y: [
                mouseParallax.y * (orb.id * 0.5),
                mouseParallax.y * (orb.id * 0.5) - 30,
                mouseParallax.y * (orb.id * 0.5) + 30,
                mouseParallax.y * (orb.id * 0.5),
              ],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Wave Ripple Effect */}
      <motion.div
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2, 3],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeOut',
        }}
      >
        <div className='w-96 h-96 rounded-full border-2 border-blue-400/30' />
      </motion.div>
    </div>
  );
}