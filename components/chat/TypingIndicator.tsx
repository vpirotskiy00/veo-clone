'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

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
            className='h-2 w-2 rounded-full bg-muted-foreground'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: 0,
            }}
          />
          <motion.div
            className='h-2 w-2 rounded-full bg-muted-foreground'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: 0.2,
            }}
          />
          <motion.div
            className='h-2 w-2 rounded-full bg-muted-foreground'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
        </div>
      </Card>
    </div>
  );
}