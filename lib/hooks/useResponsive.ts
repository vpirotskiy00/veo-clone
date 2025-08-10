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

  const breakpointOrder: readonly Breakpoint[] = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
  ] as const;

  const safeValues = new Map<Breakpoint, T>();
  breakpointOrder.forEach(bp => {
    const value = values[bp as keyof typeof values];
    if (value !== undefined) {
      safeValues.set(bp, value);
    }
  });

  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  // Look for value from current breakpoint downward, then upward
  const searchIndexes = [
    ...Array.from({ length: currentIndex + 1 }, (_, i) => currentIndex - i),
    ...Array.from(
      { length: breakpointOrder.length - currentIndex - 1 },
      (_, i) => currentIndex + i + 1
    ),
  ];

  for (const index of searchIndexes) {
    const bp = breakpointOrder.at(index);
    if (bp && safeValues.has(bp)) {
      const value = safeValues.get(bp);
      if (value !== undefined) {
        return value;
      }
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
