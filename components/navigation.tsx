'use client';

import { motion } from 'framer-motion';
import { Menu, Moon, Sun, SunMoon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { GeminiLogo } from '@/components/ui/gemini-logo';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useTheme } from '@/lib/theme';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className='w-4 h-4' />;
      case 'dark':
        return <Moon className='w-4 h-4' />;
      case 'auto':
        return <SunMoon className='w-4 h-4' />;
    }
  };

  const getThemeLabel = () => {
    if (!mounted) return 'Theme';
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'auto':
        return `Auto mode (${resolvedTheme})`;
      default:
        return 'Theme';
    }
  };

  const navItems = useMemo(
    () => [
      { href: '#features', label: 'Features' },
      { href: '#how-it-works', label: 'How it Works' },
    ],
    []
  );

  const headerAnimateProps = useMemo(() => ({ y: 0 }), []);
  const headerInitialProps = useMemo(() => ({ y: -100 }), []);
  const headerTransitionProps = useMemo(
    () => ({ duration: 0.6, ease: 'easeOut' as const }),
    []
  );
  const logoHoverProps = useMemo(() => ({ scale: 1.05 }), []);

  const handleNavClick = useCallback((href: string) => {
    window.location.href = href;
    setIsOpen(false);
  }, []);

  return (
    <motion.header
      animate={headerAnimateProps}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20'
          : 'bg-transparent'
      }`}
      initial={headerInitialProps}
      transition={headerTransitionProps}
    >
      <nav className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <motion.div
            className='flex items-center space-x-3'
            whileHover={logoHoverProps}
          >
            <GeminiLogo animated size={40} />
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
              className='w-11 h-11 p-0 hover-scale'
              onClick={toggleTheme}
              size='sm'
              suppressHydrationWarning
              title={getThemeLabel()}
              variant='ghost'
            >
              {getThemeIcon()}
            </Button>
            <Link href='/auth/sign-in'>
              <Button className='hover-scale' size='sm' variant='outline'>
                Sign In
              </Button>
            </Link>
            <Link href='/auth/sign-up'>
              <Button className='epic-button glow-effect' size='sm'>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-2'>
            <Button
              className='w-11 h-11 p-0'
              onClick={toggleTheme}
              size='sm'
              suppressHydrationWarning
              title={getThemeLabel()}
              variant='ghost'
            >
              {getThemeIcon()}
            </Button>

            {/* Drawer for Mobile Navigation */}
            <Drawer onOpenChange={setIsOpen} open={isOpen}>
              <DrawerTrigger asChild>
                <Button
                  aria-label='Toggle menu'
                  className='w-11 h-11 p-0'
                  size='sm'
                  variant='ghost'
                >
                  <Menu className='w-5 h-5' />
                </Button>
              </DrawerTrigger>
              <DrawerContent className='h-[85vh]'>
                <DrawerHeader className='text-left'>
                  <DrawerTitle>Navigation</DrawerTitle>
                  <DrawerDescription>
                    Access all features and pages
                  </DrawerDescription>
                </DrawerHeader>
                <div className='flex flex-col space-y-4 px-4 py-6'>
                  {navItems.map(item => (
                    <Button
                      className='justify-start text-lg h-12'
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      variant='ghost'
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
                <DrawerFooter className='mt-auto'>
                  <Link className='w-full' href='/auth/sign-in'>
                    <Button
                      className='w-full'
                      onClick={() => setIsOpen(false)}
                      size='lg'
                      variant='outline'
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link className='w-full' href='/auth/sign-up'>
                    <Button
                      className='w-full epic-button glow-effect'
                      onClick={() => setIsOpen(false)}
                      size='lg'
                    >
                      Get Started
                    </Button>
                  </Link>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
