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

      {/* Epic Overlay */}
      <div className='absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-purple-900/20 to-black/40'></div>

      {/* Animated Grid Pattern */}
      <div className='absolute inset-0 z-10 grid-pattern opacity-20'></div>

      {/* Floating Orbs */}
      <div className='absolute inset-0 z-10 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl float-animation'></div>
        <div
          className='absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl float-animation'
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className='absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl float-animation'
          style={{ animationDelay: '4s' }}
        ></div>
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
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className='block text-white mb-4 text-glow'
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Veo 3: AI Video Generation
              </motion.span>
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className='block text-shimmer relative'
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(79,160,255,0)',
                      '0 0 20px rgba(79,160,255,0.5)',
                      '0 0 40px rgba(79,160,255,0.3)',
                      '0 0 20px rgba(79,160,255,0.5)',
                      '0 0 0px rgba(79,160,255,0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  with Realistic
                </motion.span>{' '}
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1],
                    textShadow: [
                      '0 0 0px rgba(52,107,241,0)',
                      '0 0 30px rgba(52,107,241,0.8)',
                      '0 0 60px rgba(52,107,241,0.4)',
                      '0 0 30px rgba(52,107,241,0.8)',
                      '0 0 0px rgba(52,107,241,0)',
                    ],
                  }}
                  className='relative inline-block'
                  transition={{
                    duration: 2.5,
                    delay: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Sound
                  {/* Sound wave animation */}
                  <motion.div
                    animate={{ opacity: 1 }}
                    className='absolute -right-8 top-1/2 -translate-y-1/2 flex items-center space-x-1'
                    initial={{ opacity: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        animate={{
                          height: [8, 16, 24, 16, 8],
                          opacity: [0.3, 0.7, 1, 0.7, 0.3],
                        }}
                        className='w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full'
                        key={i}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.span>
              </motion.span>
            </h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className='text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-light'
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Generate videos with perfectly synced{' '}
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px rgba(249,134,255,0)',
                    '0 0 15px rgba(249,134,255,0.6)',
                    '0 0 30px rgba(249,134,255,0.3)',
                    '0 0 15px rgba(249,134,255,0.6)',
                    '0 0 0px rgba(249,134,255,0)',
                  ],
                }}
                className='relative inline-block gradient-text-secondary font-semibold'
                transition={{
                  duration: 4,
                  delay: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                audio
                {/* Audio wave visualization */}
                <motion.div
                  animate={{ opacity: 1 }}
                  className='absolute -top-2 -right-6 flex items-end space-x-0.5'
                  initial={{ opacity: 0 }}
                  transition={{ delay: 2.5 }}
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      animate={{
                        height: [2, 6, 10, 6, 2],
                        opacity: [0.4, 0.8, 1, 0.8, 0.4],
                      }}
                      className='w-0.5 bg-gradient-to-t from-pink-400 to-purple-300 rounded-full'
                      key={i}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 2.5 + i * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </motion.div>
              </motion.span>
              , including{' '}
              <motion.span
                animate={{
                  color: [
                    'rgb(103 232 249)',
                    'rgb(59 130 246)',
                    'rgb(147 51 234)',
                    'rgb(103 232 249)',
                  ],
                }}
                className='text-cyan-300 font-medium'
                transition={{
                  duration: 5,
                  delay: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                sound effects
              </motion.span>
              , dialogue, and ambient noise.
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className='block mt-2 gradient-text-secondary'
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                Bring your stories to life with Veo 3.
              </motion.span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className='flex flex-col sm:flex-row gap-6 justify-center items-center'
            variants={fadeInUp}
          >
            <Button
              className='epic-button text-white px-10 py-5 rounded-full text-xl font-semibold glow-effect group'
              size='lg'
            >
              <Play className='w-6 h-6 mr-3 group-hover:scale-110 transition-transform' />
              Start Creating
            </Button>
            <Button
              className='epic-card border-white/30 text-white hover:bg-white/10 px-10 py-5 rounded-full text-xl font-semibold backdrop-blur-xl'
              size='lg'
              variant='outline'
            >
              <Zap className='w-6 h-6 mr-3' />
              Watch Demo
            </Button>
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
