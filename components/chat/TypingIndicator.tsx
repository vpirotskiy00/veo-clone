'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

// Animation configurations
const dotAnimations = {
  first: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
    },
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: 0,
    },
  },
  second: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
    },
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: 0.2,
    },
  },
  third: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
    },
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: 0.4,
    },
  },
};

const dotClassName = 'h-2 w-2 rounded-full bg-muted-foreground';

export function TypingIndicator() {
  return (
    <div className='flex w-full gap-3 px-4 py-6'>
      {/* Avatar */}
      <Avatar className='h-8 w-8 shrink-0'>
        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600'>
          <Bot className='h-4 w-4 text-white' />
        </div>
      </Avatar>

      {/* Typing Animation */}
      <Card className='px-4 py-3 bg-muted max-w-[120px]'>
        <div className='flex items-center gap-1'>
          <motion.div
            {...dotAnimations.first}
            className={dotClassName}
          />
          <motion.div
            {...dotAnimations.second}
            className={dotClassName}
          />
          <motion.div
            {...dotAnimations.third}
            className={dotClassName}
          />
        </div>
      </Card>
    </div>
  );
}