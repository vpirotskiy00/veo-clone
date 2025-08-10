'use client';

import { motion, type Transition, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

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

  const animations = useMemo(() => {
    const containerTransition: Transition = { duration: 0.6, ease: 'easeOut' };
    const orbTransition: Transition = {
      duration: 2,
      ease: 'easeInOut',
      repeat: isHovered ? Infinity : 0,
    };
    const shimmerTransition: Transition = {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: isHovered ? Infinity : 0,
      repeatDelay: 2,
    };
    const iconTransition: Transition = {
      duration: 0.8,
      ease: 'easeInOut',
    };

    return {
      container: {
        animate: isInView ? { scale: 1, opacity: 1 } : {},
        initial: { scale: 0.8, opacity: 0 },
        transition: containerTransition,
      },
      backgroundOrb: {
        animate:
          !reducedMotion && isHovered
            ? {
                borderRadius: ['16px', '20px', '12px', '18px', '16px'],
                scale: [1, 1.05, 0.98, 1.02, 1],
              }
            : {},
        transition: orbTransition,
      },
      shimmer: {
        animate: !reducedMotion && isHovered ? { x: ['-100%', '100%'] } : {},
        transition: shimmerTransition,
      },
      icon: {
        animate:
          !reducedMotion && isHovered
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }
            : {},
        transition: iconTransition,
      },
    };
  }, [reducedMotion, isHovered, isInView]);

  const handleHoverStart = () => setIsHovered(true);
  const handleHoverEnd = () => setIsHovered(false);

  return (
    <motion.div
      {...animations.container}
      className={`relative ${className}`}
      onHoverEnd={handleHoverEnd}
      onHoverStart={handleHoverStart}
      ref={ref}
    >
      {/* Background orb with liquid morphing */}
      <motion.div
        {...animations.backgroundOrb}
        className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${gradient}`}
      >
        {/* Shimmer effect */}
        <motion.div
          {...animations.shimmer}
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
        />

        {/* Icon */}
        <div className='relative z-10 p-4 flex items-center justify-center'>
          <motion.div {...animations.icon}>
            <Icon className='w-7 h-7 text-white relative z-10' />
          </motion.div>
        </div>

        {/* Liquid particles on hover */}
        {isHovered && !reducedMotion && <LiquidParticles />}
      </motion.div>
    </motion.div>
  );
}

function LiquidParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
      })),
    []
  );

  const particleAnimation = useMemo(() => {
    const baseTransition: Transition = {
      duration: 2,
      ease: 'easeOut',
    };

    return {
      animate: {
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        y: [0, -20],
      },
      initial: { scale: 0, opacity: 0 },
      transition: baseTransition,
    };
  }, []);

  return (
    <>
      {particles.map(particle => (
        <motion.div
          {...particleAnimation}
          className='absolute w-2 h-2 bg-white/40 rounded-full'
          key={particle.id}
          style={{
            left: particle.left,
            top: particle.top,
          }}
          transition={
            {
              ...particleAnimation.transition,
              delay: particle.id * 0.3,
            } as Transition
          }
        />
      ))}
    </>
  );
}
