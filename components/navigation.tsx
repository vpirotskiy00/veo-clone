'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Play, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme toggle
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (theme === 'dark' || (!theme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About' },
  ];

  return (
    <motion.header
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <motion.div
            className='flex items-center space-x-3'
            whileHover={{ scale: 1.05 }}
          >
            <div className='w-10 h-10 epic-button rounded-xl flex items-center justify-center glow-effect'>
              <Play className='w-5 h-5 text-white' />
            </div>
            <span className='text-2xl font-bold text-gray-900 dark:text-white'>
              Veo<span className='gradient-text-epic'>3</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <NavigationMenu>
              <NavigationMenuList className='space-x-2'>
                {navItems.map(item => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                      href={item.href}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            <Button
              className='w-9 h-9 p-0 hover-scale'
              onClick={toggleTheme}
              size='sm'
              variant='ghost'
            >
              {isDark ? (
                <Sun className='w-4 h-4' />
              ) : (
                <Moon className='w-4 h-4' />
              )}
            </Button>
            <Button className='hover-scale' size='sm' variant='outline'>
              Sign In
            </Button>
            <Button className='epic-button glow-effect' size='sm'>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-2'>
            <Button
              className='w-9 h-9 p-0'
              onClick={toggleTheme}
              size='sm'
              variant='ghost'
            >
              {isDark ? (
                <Sun className='w-4 h-4' />
              ) : (
                <Moon className='w-4 h-4' />
              )}
            </Button>
            <Button
              className='w-9 h-9 p-0'
              onClick={() => setIsOpen(!isOpen)}
              size='sm'
              variant='ghost'
            >
              {isOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              className='md:hidden mt-4 py-4 border-t border-gray-200/20 dark:border-gray-800/20'
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className='flex flex-col space-y-4'>
                {navItems.map(item => (
                  <motion.a
                    className='text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                    href={item.href}
                    key={item.href}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 4 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className='flex flex-col space-y-2 pt-4 border-t border-gray-200/20 dark:border-gray-800/20'>
                  <Button size='sm' variant='outline'>
                    Sign In
                  </Button>
                  <Button className='epic-button glow-effect' size='sm'>
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
