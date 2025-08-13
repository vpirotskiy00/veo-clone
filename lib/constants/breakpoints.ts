/**
 * Centralized breakpoint system for responsive design
 * These values align with Tailwind CSS default breakpoints
 */

export const BREAKPOINTS = {
  xs: 475, // Extra small devices
  sm: 640, // Small devices (landscape phones)
  md: 768, // Medium devices (tablets)
  lg: 1024, // Large devices (desktops)
  xl: 1280, // Extra large devices (large desktops)
  '2xl': 1536, // 2X large devices (larger desktops)
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Device categories based on breakpoints
 */
export const DEVICE_SIZES = {
  mobile: BREAKPOINTS.md, // < 768px
  tablet: BREAKPOINTS.lg, // 768px - 1023px
  desktop: BREAKPOINTS.xl, // >= 1024px
} as const;

/**
 * Helper function to check if current viewport is mobile
 */
export const isMobileViewport = (width: number): boolean => {
  return width < DEVICE_SIZES.mobile;
};

/**
 * Helper function to check if current viewport is tablet
 */
export const isTabletViewport = (width: number): boolean => {
  return width >= DEVICE_SIZES.mobile && width < DEVICE_SIZES.tablet;
};

/**
 * Helper function to check if current viewport is desktop
 */
export const isDesktopViewport = (width: number): boolean => {
  return width >= DEVICE_SIZES.desktop;
};

/**
 * Get current breakpoint based on viewport width
 */
export const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width < BREAKPOINTS.xs) return 'xs';
  if (width < BREAKPOINTS.sm) return 'sm';
  if (width < BREAKPOINTS.md) return 'md';
  if (width < BREAKPOINTS.lg) return 'lg';
  if (width < BREAKPOINTS.xl) return 'xl';
  return '2xl';
};
