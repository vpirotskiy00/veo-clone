'use client';

import { motion, Transition } from 'framer-motion';
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
import { useMemo } from 'react';

import { LiquidIcon } from '@/components/animations/liquid-icon';
import { QuantumOrbs } from '@/components/animations/quantum-orbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition: Transition = { duration: 0.6, ease: 'easeOut' };

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const cardClassName = useMemo(
    () => 'h-full group relative overflow-hidden border border-border/50 shadow-lg hover:shadow-xl backdrop-blur-sm transition-shadow duration-300',
    []
  );

  const badgeClassName = useMemo(
    () => 'text-xs font-medium px-3 py-1.5 bg-surface-100 dark:bg-surface-200 text-muted-foreground border-border/50 group-hover:border-primary/50 group-hover:text-primary transition-all duration-300',
    []
  );

  const titleClassName = useMemo(
    () => 'text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300',
    []
  );

  const descriptionClassName = useMemo(
    () => 'text-muted-foreground leading-relaxed text-base group-hover:text-foreground/80 transition-colors duration-300',
    []
  );

  return (
    <motion.div
      key={index}
      transition={itemTransition}
      variants={itemVariants}
    >
      <Card className={cardClassName}>
        {/* Simplified Glass Effect */}
        <div className='absolute inset-0 bg-gradient-to-br from-background/90 to-background/70 dark:from-background/80 dark:to-background/60' />
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

        {/* Content */}
        <div className='relative p-6'>
          <CardHeader className='pb-4 p-0'>
            <div className='flex items-start justify-between mb-4'>
              <LiquidIcon
                className='shadow-xl group-hover:shadow-2xl transition-all duration-200'
                gradient={feature.gradient}
                icon={feature.icon}
              />

              <Badge
                className={badgeClassName}
                variant='outline'
              >
                {feature.badge}
              </Badge>
            </div>

            <CardTitle className={titleClassName}>
              {feature.title}
            </CardTitle>
          </CardHeader>

          <CardContent className='p-0'>
            <CardDescription className={descriptionClassName}>
              {feature.description}
            </CardDescription>
          </CardContent>

          {/* Hover Effect Overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none' />
        </div>
      </Card>
    </motion.div>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

function SectionHeader({ title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className='text-center mb-20'>
      <Badge
        className='mb-6 px-6 py-3 text-sm font-semibold glass inline-block'
        variant='secondary'
      >
        <Sparkles className='w-5 h-5 mr-2' />
        {title}
      </Badge>

      <h2 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight'>
        <span className='block text-foreground'>
          {subtitle}
        </span>
        <span className='gradient-text-epic block mt-2'>
          Create Amazing Videos
        </span>
      </h2>

      <p className='text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed'>
        {description}
      </p>
    </div>
  );
}

function BottomCTA() {
  return (
    <div className='text-center mt-20'>
      <div className='relative'>
        {/* Background glow effect */}
        <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl rounded-full scale-150' />

        <div className='relative glass p-8 md:p-12 rounded-3xl max-w-2xl mx-auto'>
          <h3 className='text-2xl md:text-3xl font-bold mb-4 text-foreground'>
            Ready to experience the future?
          </h3>

          <p className='text-lg text-muted-foreground mb-8 max-w-lg mx-auto'>
            Join thousands of creators who are already using AI to bring
            their ideas to life
          </p>

          <Button
            className='epic-button text-white px-12 py-6 rounded-full text-xl font-semibold glow-effect relative overflow-hidden group hover:scale-105 transition-transform duration-200'
            size='xl'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            <span className='relative z-10 flex items-center'>
              <Sparkles className='w-6 h-6 mr-3' />
              Start Creating for Free
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section
      className='py-24 relative overflow-hidden bg-gradient-to-b from-background via-surface-50 dark:via-surface-100 to-surface-100 dark:to-surface-200'
      id='features'
    >
      {/* Enhanced Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 mesh-bg opacity-20 dark:opacity-30'></div>
        <div className='absolute inset-0 grid-pattern opacity-20 dark:opacity-30'></div>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 dark:from-blue-400/10 to-purple-500/5 dark:to-purple-400/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 dark:from-purple-400/10 to-pink-500/5 dark:to-pink-400/10 rounded-full blur-3xl'></div>
      </div>

      {/* Quantum Flow Background */}
      <QuantumOrbs className='z-5' intensity='medium' />

      <div className='max-w-7xl mx-auto px-6 relative z-10'>

        <SectionHeader
          description='Our comprehensive suite of AI-powered tools makes video creation accessible to everyone, from beginners to professionals. Experience the future of content creation.'
          subtitle='Everything You Need to'
          title='Powerful Features'
        />

        {/* Enhanced Features Grid */}
        <motion.div
          animate='visible'
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
          initial='hidden'
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <FeatureCard feature={feature} index={index} key={index} />
          ))}
        </motion.div>

        <BottomCTA />
      </div>
    </section>
  );
}
