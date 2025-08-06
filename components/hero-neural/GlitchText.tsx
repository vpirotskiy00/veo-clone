'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function GlitchText({ text, className = '', delay = 0 }: GlitchTextProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const glitchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={glitchVariants}
      initial='hidden'
      animate='visible'
    >
      {/* Main text */}
      <span className='relative z-10'>{text}</span>

      {/* Glitch layers */}
      {glitchActive && (
        <>
          <span
            className='absolute inset-0 text-cyan-400 z-0'
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translateX(-2px)',
            }}
          >
            {text}
          </span>
          <span
            className='absolute inset-0 text-red-400 z-0'
            style={{
              clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)',
              transform: 'translateX(2px)',
            }}
          >
            {text}
          </span>
          <span
            className='absolute inset-0 text-green-400 z-0'
            style={{
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translateX(-1px)',
            }}
          >
            {text}
          </span>
        </>
      )}

      {/* Scanlines effect */}
      <div
        className='absolute inset-0 pointer-events-none opacity-10'
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          )`,
          animation: 'scanlines 8s linear infinite',
        }}
      />

      <style jsx>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </motion.div>
  );
}