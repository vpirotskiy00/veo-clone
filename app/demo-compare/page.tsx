'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

import { HeroAurora } from '@/components/hero-aurora/HeroAurora';
import { HeroNeural } from '@/components/hero-neural/HeroNeural';
import { HeroQuantum } from '@/components/hero-quantum/HeroQuantum';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type VariantType = 'quantum' | 'neural' | 'aurora';

export default function DemoComparePage() {
  const [selectedVariant, setSelectedVariant] = useState<VariantType>('quantum');
  const [fps, setFps] = useState(60);

  const variants = [
    {
      id: 'quantum' as const,
      name: 'Quantum Flow',
      description: 'Liquid morphing with particle physics',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-500',
      component: <HeroQuantum />,
      features: [
        'Liquid morphing orbs',
        'Particle stream cursor trail',
        'Wave propagation effects',
        'SVG filter animations',
      ],
    },
    {
      id: 'neural' as const,
      name: 'Neural Pulse',
      description: 'Dynamic neural network with glitch effects',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      component: <HeroNeural />,
      features: [
        'Canvas neural network',
        'Electric pulse animations',
        'Glitch text effects',
        'Digital rain background',
      ],
    },
    {
      id: 'aurora' as const,
      name: 'Aurora Symphony',
      description: 'Cosmic aurora with 3D star fields',
      icon: Star,
      color: 'from-green-500 to-blue-500',
      component: <HeroAurora />,
      features: [
        'SVG aurora waves',
        '3D parallax star field',
        'Chromatic aberration',
        'Breathing animations',
      ],
    },
  ];

  const currentVariant = variants.find(v => v.id === selectedVariant)!;

  // FPS monitoring (simplified)
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    
    const updateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round(frameCount * 1000 / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(updateFPS);
    };
    
    requestAnimationFrame(updateFPS);
  }, []);

  return (
    <main className='min-h-screen bg-black'>
      {/* Variant Selector */}
      <div className='fixed top-4 left-4 right-4 z-50 flex justify-center'>
        <Card className='flex items-center gap-4 p-4 bg-black/80 backdrop-blur-xl border-white/10'>
          {variants.map((variant) => (
            <Button
              key={variant.id}
              onClick={() => setSelectedVariant(variant.id)}
              variant={selectedVariant === variant.id ? 'default' : 'ghost'}
              className={`flex items-center gap-2 ${
                selectedVariant === variant.id
                  ? `bg-gradient-to-r ${variant.color} text-white`
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <variant.icon className='w-4 h-4' />
              {variant.name}
            </Button>
          ))}
        </Card>
      </div>

      {/* Performance Monitor */}
      <div className='fixed top-4 right-4 z-50'>
        <Card className='p-3 bg-black/80 backdrop-blur-xl border-white/10'>
          <div className='flex items-center gap-2 text-sm text-white'>
            <Zap className='w-4 h-4' />
            <span>{fps} FPS</span>
            <div className={`w-2 h-2 rounded-full ${fps >= 55 ? 'bg-green-400' : fps >= 30 ? 'bg-yellow-400' : 'bg-red-400'}`} />
          </div>
        </Card>
      </div>

      {/* Current Variant Display */}
      <motion.div
        key={selectedVariant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='min-h-screen'
      >
        {currentVariant.component}
      </motion.div>

      {/* Variant Info Panel */}
      <div className='fixed bottom-4 left-4 right-4 z-50 flex justify-center'>
        <motion.div
          key={selectedVariant}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className='max-w-2xl bg-black/90 backdrop-blur-xl border-white/10 p-6'>
            <div className='flex items-start gap-4'>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${currentVariant.color}`}>
                <currentVariant.icon className='w-6 h-6 text-white' />
              </div>
              
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <h3 className='text-xl font-bold text-white'>
                    {currentVariant.name}
                  </h3>
                  <Badge variant='secondary' className='text-xs'>
                    Active
                  </Badge>
                </div>
                
                <p className='text-gray-400 mb-4'>
                  {currentVariant.description}
                </p>
                
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <h4 className='text-sm font-semibold text-gray-300 mb-2'>Features</h4>
                    <ul className='space-y-1'>
                      {currentVariant.features.map((feature, i) => (
                        <li key={i} className='text-xs text-gray-500 flex items-center gap-2'>
                          <div className='w-1 h-1 bg-gray-500 rounded-full' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className='flex flex-col gap-2'>
                    <Button
                      size='sm'
                      className={`bg-gradient-to-r ${currentVariant.color} text-white hover:opacity-90`}
                      onClick={() => {
                        // Here you would implement the selection logic
                        alert(`Selected: ${currentVariant.name}`);
                      }}
                    >
                      Choose This Variant
                    </Button>
                    
                    <Button
                      size='sm'
                      variant='outline'
                      className='border-white/20 text-gray-300 hover:bg-white/5'
                      onClick={() => {
                        window.open(`/demo-${selectedVariant}`, '_blank');
                      }}
                    >
                      View Full Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}