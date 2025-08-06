'use client';

import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/lib/animation-system/hooks/useReducedMotion';

import { GlitchText } from './GlitchText';
import { NeuralGrid } from './NeuralGrid';

export function HeroNeural() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  if (!mounted) return null;

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-black'>
      {/* Neural Grid Background */}
      {!reducedMotion && <NeuralGrid />}

      {/* Digital rain effect */}
      <div className='absolute inset-0 opacity-10'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute text-green-400 font-mono text-xs'
            style={{ left: `${i * 5}%` }}
            initial={{ y: -100 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          >
            {Array.from({ length: 20 }, () => 
              String.fromCharCode(33 + Math.floor(Math.random() * 94))
            ).join('')}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className='relative z-20 max-w-5xl mx-auto px-6 text-center'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='space-y-8'
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <Badge
              variant='secondary'
              className='px-4 py-2 text-sm font-medium bg-purple-900/50 border-purple-500/50 text-purple-300'
            >
              <Brain className='w-4 h-4 mr-2' />
              Neural Network Interface
            </Badge>
          </motion.div>

          {/* Main Title with Glitch */}
          <div className='space-y-4'>
            <GlitchText
              text='NEURAL PULSE'
              className='text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white'
              delay={0.5}
            />
            
            <motion.h2
              variants={itemVariants}
              className='text-3xl md:text-4xl lg:text-5xl font-bold'
            >
              <span className='bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                Synaptic Connection
              </span>
            </motion.h2>
          </div>

          {/* Description with typewriter effect */}
          <motion.div variants={itemVariants}>
            <p className='text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono'>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                {'> Initializing neural pathways...'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className='grid grid-cols-2 md:grid-cols-4 gap-4 py-8'
          >
            {[
              { icon: Cpu, label: 'Processing', value: '1.21 GW' },
              { icon: Network, label: 'Nodes', value: '150K' },
              { icon: Zap, label: 'Latency', value: '0.3ms' },
              { icon: Brain, label: 'Synapses', value: '∞' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className='bg-purple-900/20 border border-purple-500/30 rounded-lg p-4'
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(147, 51, 234, 0.6)',
                  backgroundColor: 'rgba(147, 51, 234, 0.1)',
                }}
              >
                <stat.icon className='w-6 h-6 text-purple-400 mb-2' />
                <div className='text-2xl font-bold text-white'>{stat.value}</div>
                <div className='text-xs text-purple-300'>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className='flex flex-col sm:flex-row gap-6 justify-center items-center pt-8'
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative group'
            >
              <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200'></div>
              <Button
                size='xl'
                className='relative px-10 py-6 text-xl font-semibold bg-black text-white rounded-full border border-purple-500/50'
              >
                <Zap className='w-6 h-6 mr-3' />
                Initialize System
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size='xl'
                variant='outline'
                className='px-10 py-6 text-xl font-semibold border-purple-500/30 text-purple-300 hover:bg-purple-900/20 rounded-full'
              >
                <Network className='w-6 h-6 mr-3' />
                View Network
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Energy burst effects on hover */}
      <div className='absolute inset-0 pointer-events-none'>
        <motion.div
          className='absolute top-1/4 left-1/4 w-32 h-32'
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-full h-full bg-purple-500 rounded-full blur-3xl' />
        </motion.div>
        
        <motion.div
          className='absolute bottom-1/4 right-1/4 w-40 h-40'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <div className='w-full h-full bg-blue-500 rounded-full blur-3xl' />
        </motion.div>
      </div>
    </section>
  );
}