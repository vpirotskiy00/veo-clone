'use client';

import {
  ArrowRight,
  Brain,
  Download,
  MessageSquare,
  Sparkles,
  Video,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
    <section
      className='py-24 relative overflow-hidden bg-gradient-to-b from-surface-100 dark:from-surface-200 via-background to-surface-50 dark:to-surface-100'
      id='how-it-works'
    >
      {/* Enhanced Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 mesh-bg opacity-15 dark:opacity-25'></div>
        <div className='absolute inset-0 grid-pattern opacity-10 dark:opacity-20'></div>

        {/* Static Background Elements */}
        <div className='absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/8 dark:from-purple-400/12 to-blue-500/8 dark:to-blue-400/12 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/8 dark:from-cyan-400/12 to-teal-500/8 dark:to-teal-400/12 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/6 dark:from-pink-400/10 to-purple-500/6 dark:to-purple-400/10 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto px-6 relative z-10'>
        {/* Enhanced Section Header */}
        <div className='text-center mb-20'>
          <div className='inline-block'>
            <Badge
              className='mb-6 px-6 py-3 text-sm font-semibold glass border-border/30'
              variant='secondary'
            >
              <Sparkles className='w-5 h-5 mr-2' />
              Simple Process
            </Badge>
          </div>

          <h2 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight'>
            <span className='block text-foreground'>How It Works</span>
            <span className='gradient-text-epic block mt-2'>
              In 4 Simple Steps
            </span>
          </h2>

          <p className='text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed'>
            Creating professional videos has never been easier. Our AI-powered
            platform transforms your ideas into stunning videos in minutes, no
            experience required.
          </p>
        </div>

        {/* Steps */}
        <div className='space-y-8 md:space-y-0'>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 py-8`}
                key={index}
              >
                {/* Enhanced Content */}
                <div className='flex-1 text-center md:text-left'>
                  <div className='flex items-center justify-center md:justify-start mb-6'>
                    <div className='flex items-center space-x-6'>
                      <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-300 dark:to-surface-400 flex items-center justify-center text-3xl font-bold text-primary shadow-lg hover:scale-110 transition-transform duration-200'>
                        {index + 1}
                      </div>

                      <div
                        className={`p-5 rounded-3xl bg-gradient-to-br ${step.color} shadow-xl relative overflow-hidden group hover:scale-110 transition-transform duration-200`}
                      >
                        {/* Glow effect */}
                        <div className='absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl' />
                        <IconComponent className='w-10 h-10 text-white relative z-10' />
                      </div>
                    </div>
                  </div>

                  <h3 className='text-3xl md:text-4xl font-bold mb-6 text-foreground'>
                    {step.title}
                  </h3>

                  <p className='text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg'>
                    {step.description}
                  </p>

                  <div className='glass rounded-2xl p-6 border border-border/50 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-200'>
                    {/* Gradient border effect */}
                    <div className='absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl' />

                    <div className='relative'>
                      <div className='flex items-center mb-3'>
                        <div className='w-2 h-2 rounded-full bg-success mr-3' />
                        <span className='text-sm font-semibold text-muted-foreground uppercase tracking-wider'>
                          Example
                        </span>
                      </div>
                      <p className='text-base text-foreground/80 font-medium'>
                        {step.example}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Visual */}
                <div className='flex-1 flex justify-center'>
                  <div className='w-full max-w-md hover:-translate-y-2 transition-transform duration-300'>
                    <Card className='interactive-card group relative overflow-hidden border-0 shadow-xl bg-card/90 dark:bg-card/80 backdrop-blur-sm'>
                      {/* Gradient Border Effect */}
                      <div className='absolute inset-0 bg-gradient-to-br from-border via-transparent to-border opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-xl' />
                      <div className='absolute inset-[1px] bg-card dark:bg-card/95 rounded-[11px]' />

                      <CardContent className='p-8 relative'>
                        {/* Enhanced Visual Area */}
                        <div className='aspect-video bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-200 dark:to-surface-300 rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden group/visual'>
                          {/* Animated background */}
                          <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                          {/* Floating particles */}
                          <div className='absolute inset-0'>
                            {[...Array(5)].map((_, i) => (
                              <div
                                className='absolute w-2 h-2 bg-primary/30 rounded-full'
                                key={i}
                                style={{
                                  left: `${20 + i * 15}%`,
                                  top: `${30 + (i % 2) * 40}%`,
                                }}
                              />
                            ))}
                          </div>

                          {/* Main Icon */}
                          <div
                            className={`p-8 rounded-3xl bg-gradient-to-br ${step.color} shadow-2xl relative z-10 hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className='w-16 h-16 text-white' />

                            {/* Glow effect */}
                            <div className='absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl' />
                          </div>
                        </div>

                        {/* Enhanced Text */}
                        <div className='text-center'>
                          <h4 className='font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300'>
                            {step.title}
                          </h4>
                          <div className='flex items-center justify-center space-x-2'>
                            <div className='w-8 h-1 bg-gradient-to-r from-primary to-accent rounded-full' />
                            <p className='text-sm text-muted-foreground font-medium'>
                              Step {index + 1} of 4
                            </p>
                            <div className='w-8 h-1 bg-gradient-to-r from-accent to-primary rounded-full' />
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none' />
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Enhanced Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 mt-24 z-20'>
                    <div className='w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg group cursor-pointer hover:scale-110 transition-transform duration-300'>
                      <ArrowRight className='w-6 h-6 text-white' />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className='text-center mt-24'>
          <div className='relative max-w-4xl mx-auto'>
            {/* Background glow effects */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 blur-3xl rounded-full scale-150' />
            <div className='absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl' />
            <div className='absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl' />

            {/* Main CTA Card */}
            <div className='relative glass rounded-3xl p-12 md:p-16 border border-border/30 overflow-hidden group'>
              {/* Animated background gradient */}
              <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              {/* Floating particles */}
              <div className='absolute inset-0 overflow-hidden'>
                {[...Array(8)].map((_, i) => (
                  <div
                    className='absolute w-1 h-1 bg-primary/40 rounded-full'
                    key={i}
                    style={{
                      left: `${10 + i * 10}%`,
                      top: `${20 + (i % 3) * 30}%`,
                    }}
                  />
                ))}
              </div>

              <div className='relative z-10'>
                <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground'>
                  Ready to Create Your
                  <span className='gradient-text-epic block mt-2'>
                    First Video?
                  </span>
                </h3>

                <p className='text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
                  Join thousands of creators who are already using AI to bring
                  their ideas to life. Start your journey today.
                </p>

                <div className='hover:scale-105 transition-transform duration-200'>
                  <Button
                    className='epic-button text-white px-12 py-6 rounded-full text-xl font-semibold glow-effect relative overflow-hidden group'
                    size='xl'
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <span className='relative z-10 flex items-center'>
                      <Video className='w-6 h-6 mr-3' />
                      Start Creating Now
                    </span>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className='flex items-center justify-center space-x-8 mt-8 text-muted-foreground text-sm'>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-success rounded-full mr-2' />
                    No credit card required
                  </div>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-success rounded-full mr-2' />
                    Free forever plan
                  </div>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-success rounded-full mr-2' />
                    Cancel anytime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
