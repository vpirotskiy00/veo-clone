'use client';

import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { useReducedMotion } from '@/lib/animation-system/hooks/useReducedMotion';

interface LiquidIconProps {
  icon: LucideIcon;
  gradient: string;
  className?: string;
}

export function LiquidIcon({
  icon: Icon,
  gradient,
  className = '',
}: LiquidIconProps) {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      className={`relative ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      onHoverEnd={() => setIsHovered(false)}
      onHoverStart={() => setIsHovered(true)}
      ref={ref}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Background orb with liquid morphing */}
      <motion.div
        animate={
          !reducedMotion && isHovered
            ? {
                borderRadius: ['16px', '20px', '12px', '18px', '16px'],
                scale: [1, 1.05, 0.98, 1.02, 1],
              }
            : {}
        }
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${gradient}`}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: isHovered ? Infinity : 0,
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          animate={
            !reducedMotion && isHovered
              ? {
                  x: ['-100%', '100%'],
                }
              : {}
          }
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 2,
          }}
        />

        {/* Icon */}
        <div className='relative z-10 p-4 flex items-center justify-center'>
          <motion.div
            animate={
              !reducedMotion && isHovered
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
            }}
          >
            <Icon className='w-7 h-7 text-white relative z-10' />
          </motion.div>
        </div>

        {/* Liquid particles on hover */}
        {isHovered && !reducedMotion && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20],
                }}
                className='absolute w-2 h-2 bg-white/40 rounded-full'
                initial={{ scale: 0, opacity: 0 }}
                key={i}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
