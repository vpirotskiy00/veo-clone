'use client';

import { useEffect, useState } from 'react';

import {
  Breakpoint,
  BREAKPOINTS,
  getCurrentBreakpoint,
} from '@/lib/constants/breakpoints';

/**
 * Hook to get current breakpoint based on viewport width
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateBreakpoint = () => {
      setBreakpoint(getCurrentBreakpoint(window.innerWidth));
    };

    // Set initial value
    updateBreakpoint();

    // Add event listener
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Return default value during SSR
  if (!mounted) {
    return 'lg';
  }

  return breakpoint;
}

/**
 * Hook to check if viewport matches specific breakpoint(s)
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const media = window.matchMedia(query);

    const updateMatch = () => {
      setMatches(media.matches);
    };

    // Set initial value
    updateMatch();

    // Add event listener
    if (media.addEventListener) {
      media.addEventListener('change', updateMatch);
    } else {
      // Fallback for older browsers
      media.addListener(updateMatch);
    }

    // Cleanup
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', updateMatch);
      } else {
        media.removeListener(updateMatch);
      }
    };
  }, [query]);

  // Return false during SSR
  if (!mounted) {
    return false;
  }

  return matches;
}

/**
 * Predefined media query hooks for common breakpoints
 */
export function useIsMobileBreakpoint() {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

export function useIsTabletBreakpoint() {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
}

export function useIsDesktopBreakpoint() {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}
