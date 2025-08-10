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

// Constants
const NAV_ITEMS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
];

const MOTION_CONFIGS = {
  headerAnimate: { y: 0 },
  headerInitial: { y: -100 },
  headerTransition: { duration: 0.6, ease: 'easeOut' as const },
  logoHover: { scale: 1.05 },
};

// Theme button component
function ThemeButton({
  mounted,
  theme,
  resolvedTheme,
  toggleTheme,
  className,
}: {
  mounted: boolean;
  theme: string;
  resolvedTheme: string;
  toggleTheme: () => void;
  className?: string;
}) {
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

  return (
    <Button
      className={`w-11 h-11 p-0 hover-scale ${className || ''}`}
      onClick={toggleTheme}
      size='sm'
      suppressHydrationWarning
      title={getThemeLabel()}
      variant='ghost'
    >
      {getThemeIcon()}
    </Button>
  );
}

// Desktop navigation component
function DesktopNavigation({
  mounted: _mounted,
  theme: _theme,
  resolvedTheme: _resolvedTheme,
  toggleTheme: _toggleTheme,
}: {
  mounted: boolean;
  theme: string;
  resolvedTheme: string;
  toggleTheme: () => void;
}) {
  return (
    <div className='hidden md:flex items-center space-x-8'>
      <NavigationMenu>
        <NavigationMenuList className='space-x-2'>
          {NAV_ITEMS.map(item => (
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
  );
}

// Desktop actions component
function DesktopActions({
  mounted,
  theme,
  resolvedTheme,
  toggleTheme,
}: {
  mounted: boolean;
  theme: string;
  resolvedTheme: string;
  toggleTheme: () => void;
}) {
  return (
    <div className='hidden md:flex items-center space-x-4'>
      <ThemeButton
        mounted={mounted}
        resolvedTheme={resolvedTheme}
        theme={theme}
        toggleTheme={toggleTheme}
      />
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
  );
}

// Mobile menu component
function MobileMenu({
  isOpen,
  setIsOpen,
  mounted,
  theme,
  resolvedTheme,
  toggleTheme,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  mounted: boolean;
  theme: string;
  resolvedTheme: string;
  toggleTheme: () => void;
}) {
  const handleNavClick = useCallback(
    (href: string) => {
      window.location.href = href;
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <div className='md:hidden flex items-center space-x-2'>
      <ThemeButton
        mounted={mounted}
        resolvedTheme={resolvedTheme}
        theme={theme}
        toggleTheme={toggleTheme}
      />

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
            <DrawerDescription>Access all features and pages</DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-col space-y-4 px-4 py-6'>
            {NAV_ITEMS.map(item => {
              return (
                <NavButton
                  item={item}
                  key={item.href}
                  onNavClick={handleNavClick}
                />
              );
            })}
          </div>
          <DrawerFooter className='mt-auto'>
            <Link className='w-full' href='/auth/sign-in'>
              <Button
                className='w-full'
                onClick={handleClose}
                size='lg'
                variant='outline'
              >
                Sign In
              </Button>
            </Link>
            <Link className='w-full' href='/auth/sign-up'>
              <Button
                className='w-full epic-button glow-effect'
                onClick={handleClose}
                size='lg'
              >
                Get Started
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function NavButton({
  item,
  onNavClick,
}: {
  item: { href: string; label: string };
  onNavClick: (href: string) => void;
}) {
  const handleClick = useCallback(
    () => onNavClick(item.href),
    [onNavClick, item.href]
  );
  return (
    <Button
      className='justify-start text-lg h-12'
      onClick={handleClick}
      variant='ghost'
    >
      {item.label}
    </Button>
  );
}

// Logo component
function NavLogo() {
  return (
    <motion.div
      className='flex items-center space-x-3'
      whileHover={MOTION_CONFIGS.logoHover}
    >
      <GeminiLogo animated size={40} />
      <span className='text-2xl font-bold text-gray-900 dark:text-white'>
        Veo<span className='gradient-text-epic'>3</span>
      </span>
    </motion.div>
  );
}

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

  const headerClasses = useMemo(
    () =>
      `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-800/20'
          : 'bg-transparent'
      }`,
    [isScrolled]
  );

  return (
    <motion.header
      animate={MOTION_CONFIGS.headerAnimate}
      className={headerClasses}
      initial={MOTION_CONFIGS.headerInitial}
      transition={MOTION_CONFIGS.headerTransition}
    >
      <nav className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <NavLogo />
          <DesktopNavigation
            mounted={mounted}
            resolvedTheme={resolvedTheme}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <DesktopActions
            mounted={mounted}
            resolvedTheme={resolvedTheme}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <MobileMenu
            isOpen={isOpen}
            mounted={mounted}
            resolvedTheme={resolvedTheme}
            setIsOpen={setIsOpen}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        </div>
      </nav>
    </motion.header>
  );
}
