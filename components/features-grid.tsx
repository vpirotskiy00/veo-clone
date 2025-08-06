'use client';

import { motion } from 'framer-motion';
import {
  Camera,
  Clock,
  Download,
  Layers,
  Palette,
  Settings,
  Shield,
  Sparkles,
  Users,
  Video,
  Wand2,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Generation',
    description:
      'Transform text prompts into stunning videos with our advanced AI technology',
    badge: 'New',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate professional videos in minutes, not hours or days',
    badge: 'Fast',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Palette,
    title: 'Unlimited Styles',
    description: 'Choose from hundreds of artistic styles and visual effects',
    badge: 'Creative',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    icon: Camera,
    title: '4K Ultra HD',
    description:
      'Export your videos in crystal-clear 4K resolution for any platform',
    badge: 'Quality',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Video,
    title: 'Multiple Formats',
    description: 'Support for all major video formats and aspect ratios',
    badge: 'Flexible',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Layers,
    title: 'Advanced Editing',
    description:
      'Fine-tune your videos with built-in editing tools and effects',
    badge: 'Pro',
    gradient: 'from-pink-500 to-red-500',
  },
  {
    icon: Clock,
    title: 'Real-time Preview',
    description: 'See your video come to life as you make changes in real-time',
    badge: 'Live',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Your content is protected with enterprise-grade security and privacy',
    badge: 'Secure',
    gradient: 'from-slate-500 to-gray-500',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team on video projects seamlessly',
    badge: 'Team',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    icon: Download,
    title: 'Easy Export',
    description: 'Download your videos or share directly to social platforms',
    badge: 'Simple',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Settings,
    title: 'Custom Controls',
    description:
      'Fine-grained control over every aspect of your video generation',
    badge: 'Control',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Magic Effects',
    description: 'Add stunning visual effects and transitions with one click',
    badge: 'Magic',
    gradient: 'from-cyan-500 to-blue-500',
  },
];

export function FeaturesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className='py-24 mesh-bg relative overflow-hidden' id='features'>
      {/* Background Grid */}
      <div className='absolute inset-0 grid-pattern opacity-30'></div>

      <div className='max-w-7xl mx-auto px-6 relative z-10'>
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
            Powerful Features
          </Badge>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
            Everything You Need to Create
            <span className='gradient-text block mt-2'>Amazing Videos</span>
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
            Our comprehensive suite of AI-powered tools makes video creation
            accessible to everyone, from beginners to professionals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          initial='hidden'
          variants={containerVariants}
          viewport={{ once: true, margin: '-100px' }}
          whileInView='visible'
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className='h-full epic-card group'>
                  <CardHeader className='pb-4'>
                    <div className='flex items-start justify-between mb-3'>
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-200`}
                      >
                        <IconComponent className='w-6 h-6 text-white' />
                      </div>
                      <Badge
                        className='text-xs border-current opacity-60 group-hover:opacity-100 transition-opacity'
                        variant='outline'
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className='text-lg font-semibold group-hover:gradient-text transition-all duration-300'>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className='text-gray-600 dark:text-gray-400 leading-relaxed'>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
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
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Ready to experience the future of video creation?
          </p>
          <motion.button
            className='px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Creating for Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
