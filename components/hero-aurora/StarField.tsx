'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

import { useMouseParallax } from '@/lib/animation-system/hooks/useMousePhysics';
import { useScrollVelocity } from '@/lib/animation-system/hooks/useScrollVelocity';

interface Star {
  id: number;
  x: number;
  y: number;
  z: number; // depth for 3D effect
  size: number;
  twinkleDelay: number;
  twinkleDuration: number;
}

export function StarField() {
  const mouseParallax = useMouseParallax(0.02);
  const scrollData = useScrollVelocity();

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random(), // 0 = far, 1 = close
      size: Math.random() * 3 + 1,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: 2 + Math.random() * 3,
    }));
  }, []);

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* 3D Star layers */}
      {[0.3, 0.6, 1].map((layerDepth, layerIndex) => (
        <div
          key={layerIndex}
          className='absolute inset-0'
          style={{
            transform: `
              translateX(${mouseParallax.x * layerDepth * 2}px)
              translateY(${mouseParallax.y * layerDepth * 2}px)
              translateZ(0)
            `,
          }}
        >
          {stars
            .filter((star) => Math.abs(star.z - layerDepth) < 0.3)
            .map((star) => (
              <motion.div
                key={star.id}
                className='absolute rounded-full'
                style={{
                  left: `${star.x}%`,
                  top: `${star.y - scrollData.position * 0.1 * star.z}%`,
                  width: star.size * star.z,
                  height: star.size * star.z,
                  background: `radial-gradient(circle, 
                    rgba(255, 255, 255, ${0.8 + star.z * 0.2}) 0%, 
                    rgba(255, 255, 255, ${0.3 * star.z}) 50%, 
                    transparent 100%
                  )`,
                  boxShadow: `0 0 ${10 * star.z}px rgba(255, 255, 255, ${0.5 * star.z})`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: star.twinkleDuration,
                  delay: star.twinkleDelay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </div>
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className='absolute w-1 h-1 bg-white'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            x: [0, -200],
            y: [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 5 + Math.random() * 5,
            repeat: Infinity,
            repeatDelay: 10,
            ease: 'easeOut',
          }}
        >
          {/* Shooting star trail */}
          <div
            className='absolute h-px bg-gradient-to-l from-white to-transparent'
            style={{
              width: '100px',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%) rotate(-25deg)',
            }}
          />
        </motion.div>
      ))}

      {/* Nebula clouds */}
      <div className='absolute inset-0'>
        <motion.div
          className='absolute top-1/4 left-1/3 w-96 h-96 rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className='absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full'
          style={{
            background: 'radial-gradient(circle, rgba(30, 144, 255, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
      </div>
    </div>
  );
}