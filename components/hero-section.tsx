'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { SimpleVideoBg } from './simple-video-bg';

export function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Video Background */}
      <SimpleVideoBg className='z-0' src='/hero-video.mp4' />

      {/* Enhanced Epic Overlay with Dynamic Gradients */}
      <div className='absolute inset-0 z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-purple-900/10 dark:via-purple-900/20 to-black/30 dark:to-black/50'></div>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10 dark:from-blue-900/20 dark:to-purple-900/20'></div>
      </div>

      {/* Enhanced Animated Grid Pattern */}
      <div className='absolute inset-0 z-10 grid-pattern opacity-15 dark:opacity-25'></div>

      {/* Dynamic Mesh Background */}
      <div className='absolute inset-0 z-10 mesh-bg opacity-30 dark:opacity-40'></div>

      {/* Enhanced Floating Orbs with Theme Awareness */}
      <div className='absolute inset-0 z-10 overflow-hidden pointer-events-none'>
        {/* Primary Orb */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          className='absolute top-1/4 left-1/4 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-blue-500/15 dark:from-blue-400/20 to-purple-500/15 dark:to-purple-400/20 rounded-full blur-3xl'
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary Orb */}
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -25, 0],
            scale: [1, 0.9, 1],
          }}
          className='absolute top-3/4 right-1/4 w-40 h-40 md:w-48 md:h-48 bg-gradient-to-r from-purple-500/15 dark:from-purple-400/20 to-pink-500/15 dark:to-pink-400/20 rounded-full blur-3xl'
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Accent Orb */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          className='absolute top-1/2 right-1/3 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-cyan-500/15 dark:from-cyan-400/20 to-blue-500/15 dark:to-blue-400/20 rounded-full blur-3xl'
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

        {/* Additional Ambient Orbs */}
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          className='absolute top-1/3 left-1/2 w-20 h-20 bg-gradient-to-r from-indigo-500/10 dark:from-indigo-400/15 to-violet-500/10 dark:to-violet-400/15 rounded-full blur-2xl'
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <motion.div
          animate={{
            y: [0, -18, 0],
            x: [0, 12, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          className='absolute bottom-1/3 left-1/5 w-28 h-28 bg-gradient-to-r from-emerald-500/10 dark:from-emerald-400/15 to-teal-500/10 dark:to-teal-400/15 rounded-full blur-2xl'
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      {/* Hero Content */}
      <div className='relative z-20 max-w-5xl mx-auto px-6 text-center'>
        <motion.div
          animate='animate'
          className='space-y-8'
          initial='initial'
          variants={staggerChildren}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <Badge
              className='glass px-4 py-2 text-sm font-medium'
              variant='secondary'
            >
              <Sparkles className='w-4 h-4 mr-2' />
              AI Video Generation Powered by Veo
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.div className='space-y-6' variants={fadeInUp}>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight'>
              <span className='block text-white mb-4 text-glow'>
                Veo 3: AI Video Generation
              </span>
              <span className='block gradient-text-epic relative'>
                with Realistic Sound
              </span>
            </h1>
            <p className='text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light'>
              Generate videos with perfectly synced{' '}
              <span className='relative inline-block gradient-text-secondary font-semibold'>
                audio
              </span>
              , including{' '}
              <span className='text-cyan-300 font-medium'>sound effects</span>,
              dialogue, and ambient noise.
              <span className='block mt-2 gradient-text-secondary'>
                Bring your stories to life with Veo 3.
              </span>
            </p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className='flex flex-col sm:flex-row gap-6 justify-center items-center'
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className='epic-button text-white px-10 py-6 rounded-full text-xl font-semibold glow-effect group relative overflow-hidden'
                size='xl'
              >
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className='relative z-10 flex items-center'>
                  <Play className='w-6 h-6 mr-3 group-hover:scale-110 transition-transform' />
                  Start Creating
                </span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className='glass border-white/20 dark:border-white/10 text-white hover:text-white px-10 py-6 rounded-full text-xl font-semibold group backdrop-blur-xl shadow-lg hover:shadow-xl'
                size='xl'
                variant='outline'
              >
                <Zap className='w-6 h-6 mr-3 group-hover:rotate-12 transition-transform' />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className='grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10'
            variants={fadeInUp}
          >
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold gradient-text-accent'>
                10M+
              </div>
              <div className='text-gray-300 text-sm mt-1'>Videos Created</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold gradient-text-secondary'>
                4K
              </div>
              <div className='text-gray-300 text-sm mt-1'>Ultra HD Quality</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl md:text-4xl font-bold gradient-text'>
                24/7
              </div>
              <div className='text-gray-300 text-sm mt-1'>AI Processing</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ opacity: 1 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'
        initial={{ opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className='flex flex-col items-center space-y-2'>
          <div className='text-white/60 text-sm'>Scroll to explore</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center'
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className='w-1 h-3 bg-white/60 rounded-full mt-2' />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
