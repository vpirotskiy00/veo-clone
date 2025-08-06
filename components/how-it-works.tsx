'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Download,
  MessageSquare,
  Sparkles,
  Video,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { staggerContainer, staggerItem } from '@/lib/animations';

const steps = [
  {
    icon: MessageSquare,
    title: 'Describe Your Vision',
    description:
      'Simply type what you want to see. Be as creative and detailed as you like.',
    example: 'A golden retriever playing in a sunlit garden with butterflies',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'AI Processing',
    description:
      'Our advanced AI analyzes your prompt and generates a unique video concept.',
    example: 'Understanding context, style, and visual elements',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Video,
    title: 'Video Generation',
    description:
      'Watch as your idea transforms into a high-quality video in real-time.',
    example: 'Creating frames, adding motion, and applying effects',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: Download,
    title: 'Export & Share',
    description:
      'Download in your preferred format or share directly to social platforms.',
    example: '4K, HD, or optimized for Instagram, TikTok, YouTube',
    color: 'from-orange-500 to-red-500',
  },
];

export function HowItWorks() {
  return (
    <section className='py-24 bg-white dark:bg-gray-900' id='how-it-works'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Badge className='mb-4 px-4 py-2' variant='secondary'>
            <Sparkles className='w-4 h-4 mr-2' />
            Simple Process
          </Badge>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
            How It Works
            <span className='gradient-text block mt-2'>In 4 Simple Steps</span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
            Creating professional videos has never been easier. Our AI-powered
            platform transforms your ideas into stunning videos in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className='space-y-8 md:space-y-0'
          initial='initial'
          variants={staggerContainer}
          viewport={{ once: true, margin: '-100px' }}
          whileInView='animate'
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 py-8`}
                key={index}
                variants={staggerItem}
              >
                {/* Content */}
                <div className='flex-1 text-center md:text-left'>
                  <div className='flex items-center justify-center md:justify-start mb-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-gray-600 dark:text-gray-400'>
                        {index + 1}
                      </div>
                      <div
                        className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                      >
                        <IconComponent className='w-8 h-8 text-white' />
                      </div>
                    </div>
                  </div>

                  <h3 className='text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
                    {step.title}
                  </h3>

                  <p className='text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed'>
                    {step.description}
                  </p>

                  <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-gradient-to-b from-purple-500 to-blue-500'>
                    <p className='text-sm text-gray-600 dark:text-gray-400 italic'>
                      Example: {step.example}
                    </p>
                  </div>
                </div>

                {/* Visual */}
                <div className='flex-1 flex justify-center'>
                  <Card className='w-full max-w-md hover-lift'>
                    <CardContent className='p-8'>
                      <div className='aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center mb-6'>
                        <div
                          className={`p-6 rounded-full bg-gradient-to-br ${step.color} shadow-lg`}
                        >
                          <IconComponent className='w-12 h-12 text-white' />
                        </div>
                      </div>
                      <div className='text-center'>
                        <h4 className='font-semibold text-lg mb-2'>
                          {step.title}
                        </h4>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          Step {index + 1} of 4
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-24'>
                    <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
                      <ArrowRight className='w-4 h-4 text-white' />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className='bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8'>
            <h3 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
              Ready to Create Your First Video?
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              Join thousands of creators who are already using AI to bring their
              ideas to life.
            </p>
            <motion.button
              className='px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Creating Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
