'use client';

import { Breakpoint } from '@/lib/constants/breakpoints';

import { useBreakpoint } from './useBreakpoint';

/**
 * Hook for responsive values based on current breakpoint
 */
export function useResponsive<T>(
  values: Partial<Record<Breakpoint, T>>
): T | undefined {
  const currentBreakpoint = useBreakpoint();

  // Breakpoints in order of priority (mobile-first)
  const breakpointOrder: readonly Breakpoint[] = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
  ] as const;

  // Create a safe map for lookups
  const safeValues = new Map<Breakpoint, T>();

  // Populate the map with defined values only
  if (values.xs !== undefined) safeValues.set('xs', values.xs);
  if (values.sm !== undefined) safeValues.set('sm', values.sm);
  if (values.md !== undefined) safeValues.set('md', values.md);
  if (values.lg !== undefined) safeValues.set('lg', values.lg);
  if (values.xl !== undefined) safeValues.set('xl', values.xl);
  if (values['2xl'] !== undefined) safeValues.set('2xl', values['2xl']);

  // Find the value for current breakpoint or fall back to smaller ones
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  // Check from current breakpoint down to smallest
  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (bp && safeValues.has(bp)) {
      return safeValues.get(bp);
    }
  }

  // If no smaller breakpoint has a value, check larger ones
  for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (bp && safeValues.has(bp)) {
      return safeValues.get(bp);
    }
  }

  return undefined;
}

/**
 * Hook to conditionally render components based on breakpoints
 */
export function useResponsiveRender(config: {
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}): boolean {
  const breakpoint = useBreakpoint();

  const isMobile = ['xs', 'sm'].includes(breakpoint);
  const isTablet = ['md'].includes(breakpoint);
  const isDesktop = ['lg', 'xl', '2xl'].includes(breakpoint);

  return (
    (config.mobile && isMobile) ||
    (config.tablet && isTablet) ||
    (config.desktop && isDesktop) ||
    false
  );
}
