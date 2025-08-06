'use client';

import { motion } from 'framer-motion';
import { Moon, Sparkles, Star, Stars } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/lib/animation-system/hooks/useReducedMotion';

import { AuroraWaves } from './AuroraWaves';
import { StarField } from './StarField';

export function HeroAurora() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const breathingVariants = {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const chromaticTextVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  if (!mounted) return null;

  return (
    <motion.section 
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
      style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 35%, #0f3460 100%)',
      }}
      variants={breathingVariants}
      animate='animate'
    >
      {/* Background Layers */}
      {!reducedMotion && (
        <>
          <StarField />
          <AuroraWaves />
        </>
      )}

      {/* Content */}
      <div className='relative z-20 max-w-5xl mx-auto px-6 text-center'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='space-y-8'
        >
          {/* Badge */}
          <motion.div variants={chromaticTextVariants}>
            <Badge
              variant='secondary'
              className='px-4 py-2 text-sm font-medium bg-emerald-900/30 border-emerald-400/30 text-emerald-300'
            >
              <Stars className='w-4 h-4 mr-2' />
              Aurora Symphony
            </Badge>
          </motion.div>

          {/* Main Title with Chromatic Aberration */}
          <motion.div variants={chromaticTextVariants} className='relative'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight relative'>
              {/* Chromatic layers */}
              <span 
                className='absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent'
                style={{ transform: 'translate(-2px, -1px)' }}
              >
                COSMIC AURORA
              </span>
              <span 
                className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
                style={{ transform: 'translate(2px, 1px)' }}
              >
                COSMIC AURORA
              </span>
              <span className='relative bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent'>
                COSMIC AURORA
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.h2 
            variants={chromaticTextVariants}
            className='text-3xl md:text-4xl lg:text-5xl font-bold'
          >
            <span className='bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent'>
              Celestial Symphony
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={chromaticTextVariants}
            className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed'
          >
            Immerse yourself in the ethereal beauty of northern lights combined with
            the infinite mystery of deep space. A harmonious dance of light and stars.
          </motion.p>

          {/* Cosmic Stats */}
          <motion.div 
            variants={chromaticTextVariants}
            className='grid grid-cols-2 md:grid-cols-4 gap-6 py-12'
          >
            {[
              { label: 'Light Years', value: '∞', color: 'from-green-400 to-emerald-400' },
              { label: 'Aurora Waves', value: '7', color: 'from-blue-400 to-cyan-400' },
              { label: 'Star Systems', value: '1M+', color: 'from-purple-400 to-violet-400' },
              { label: 'Dimensions', value: '∞D', color: 'from-pink-400 to-rose-400' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className='text-center'
                whileHover={{ scale: 1.1 }}
              >
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className='text-sm text-gray-400 mt-1'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={chromaticTextVariants}
            className='flex flex-col sm:flex-row gap-6 justify-center items-center pt-8'
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative group'
            >
              <div 
                className='absolute -inset-1 rounded-full opacity-70 group-hover:opacity-100 blur transition duration-300'
                style={{
                  background: 'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6, #10b981)',
                  backgroundSize: '400% 400%',
                  animation: 'aurora-glow 4s ease infinite',
                }}
              />
              <Button
                size='xl'
                className='relative px-10 py-6 text-xl font-semibold bg-slate-900 text-white rounded-full border border-emerald-400/50 hover:bg-slate-800'
              >
                <Star className='w-6 h-6 mr-3' />
                Explore Universe
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size='xl'
                variant='outline'
                className='px-10 py-6 text-xl font-semibold border-cyan-400/30 text-cyan-300 hover:bg-cyan-900/20 rounded-full backdrop-blur-xl'
              >
                <Moon className='w-6 h-6 mr-3' />
                Night Mode
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient light effects */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute top-0 left-0 w-full h-full'
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes aurora-glow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </motion.section>
  );
}