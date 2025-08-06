'use client';

import { motion } from 'framer-motion';
import { Brain, Home, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function DemoNavigation() {
  const pathname = usePathname();

  const links = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      description: 'Original design',
    },
    {
      href: '/demo-quantum',
      label: 'Quantum Flow',
      icon: Sparkles,
      description: 'Liquid morphing effects',
    },
    {
      href: '/demo-neural',
      label: 'Neural Pulse',
      icon: Brain,
      description: 'Neural network grid',
    },
    {
      href: '/demo-aurora',
      label: 'Aurora Symphony',
      icon: Star,
      description: 'Cosmic aurora waves',
    },
    {
      href: '/demo-compare',
      label: 'Compare All',
      icon: () => (
        <div className='flex gap-1'>
          <div className='w-1 h-4 bg-blue-400 rounded' />
          <div className='w-1 h-4 bg-purple-400 rounded' />
          <div className='w-1 h-4 bg-green-400 rounded' />
        </div>
      ),
      description: 'Side by side comparison',
    },
  ];

  const isDemo = pathname.startsWith('/demo');

  if (!isDemo) return null;

  return (
    <motion.div
      className='fixed bottom-6 left-6 z-50'
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <Card className='p-4 bg-black/80 backdrop-blur-xl border-white/10'>
        <div className='flex flex-col gap-2'>
          <div className='text-xs text-gray-400 mb-2 px-2'>Navigation</div>
          {links.map((link) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;
            
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant='ghost'
                  size='sm'
                  className={`justify-start w-full text-left h-auto p-3 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <IconComponent className='w-4 h-4' />
                    <div>
                      <div className='font-medium'>{link.label}</div>
                      <div className='text-xs opacity-60'>{link.description}</div>
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}