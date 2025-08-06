'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Play, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/lib/animation-system/hooks/useReducedMotion';

import { LiquidOrbs } from './LiquidOrbs';
import { ParticleStream } from './ParticleStream';

export function HeroQuantum() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1], // Spring easing
      },
    }),
  };

  const liquidFillVariants = {
    hidden: { 
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      opacity: 0,
    },
    visible: {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        delay: 0.5,
      },
    },
  };

  if (!mounted) return null;

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900'>
      {/* Background Layers */}
      {!reducedMotion && (
        <>
          <LiquidOrbs />
          <ParticleStream />
        </>
      )}

      {/* Grid Pattern Overlay */}
      <div 
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className='relative z-20 max-w-5xl mx-auto px-6 text-center'>
        <motion.div
          initial='hidden'
          animate='visible'
          className='space-y-8'
        >
          {/* Badge */}
          <motion.div custom={0} variants={textVariants}>
            <Badge
              variant='secondary'
              className='px-4 py-2 text-sm font-medium backdrop-blur-xl bg-white/10 border-white/20'
            >
              <Sparkles className='w-4 h-4 mr-2' />
              Quantum Flow Experience
            </Badge>
          </motion.div>

          {/* Main Title with Liquid Fill */}
          <motion.div className='relative'>
            {/* Background text (outline) */}
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent'>
              <span 
                className='block mb-4'
                style={{
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
                }}
              >
                Liquid Motion
              </span>
            </h1>

            {/* Liquid fill overlay */}
            <motion.h1 
              className='absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight'
              variants={liquidFillVariants}
              initial='hidden'
              animate='visible'
            >
              <span className='block mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
                Liquid Motion
              </span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div custom={2} variants={textVariants}>
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white/90'>
              <span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                Quantum Flow Design
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p 
            custom={3} 
            variants={textVariants}
            className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
          >
            Experience the future of web animations with liquid morphing effects,
            particle physics, and quantum-inspired motion design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            custom={4} 
            variants={textVariants}
            className='flex flex-col sm:flex-row gap-6 justify-center items-center pt-8'
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size='xl'
                className='px-10 py-6 text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300'
              >
                <Play className='w-6 h-6 mr-3' />
                Start Creating
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size='xl'
                variant='outline'
                className='px-10 py-6 text-xl font-semibold border-white/20 text-white hover:bg-white/10 rounded-full backdrop-blur-xl'
              >
                <Zap className='w-6 h-6 mr-3' />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles decoration */}
      <AnimatePresence>
        {!reducedMotion && mounted && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-2 h-2 bg-blue-400/50 rounded-full'
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                }}
                animate={{ 
                  y: -100,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: 'linear',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </section>
  );
}