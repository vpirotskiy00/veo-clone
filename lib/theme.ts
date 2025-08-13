'use client';

// React hook for using the theme system
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'auto';

interface ThemeSystem {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

class ThemeManager {
  private static instance: ThemeManager;
  private theme: Theme = 'auto';
  private resolvedTheme: 'light' | 'dark' = 'light';
  private listeners: ((theme: ThemeSystem) => void)[] = [];
  private mediaQuery?: MediaQueryList;

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    // Set up media query listener for system preference
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      this.theme = savedTheme;
    }

    // Calculate initial resolved theme
    this.updateResolvedTheme();
    this.applyTheme();

    // Add time-based theme switching for auto mode
    this.setupTimeBasedTheme();
  }

  private handleSystemThemeChange = () => {
    if (this.theme === 'auto') {
      this.updateResolvedTheme();
      this.applyTheme();
      this.notifyListeners();
    }
  };

  private updateResolvedTheme() {
    if (this.theme === 'auto') {
      // Enhanced auto mode: consider time of day and system preference
      const hour = new Date().getHours();
      const isNightTime = hour < 7 || hour >= 19; // 7 PM to 7 AM
      const systemPrefersDark = this.mediaQuery?.matches || false;

      // Use night time preference with system preference as fallback
      this.resolvedTheme = isNightTime || systemPrefersDark ? 'dark' : 'light';
    } else {
      this.resolvedTheme = this.theme;
    }
  }

  private setupTimeBasedTheme() {
    // Update theme at sunrise (7 AM) and sunset (7 PM)
    const now = new Date();
    const currentHour = now.getHours();

    let nextUpdate: Date;
    if (currentHour < 7) {
      // Before sunrise, update at 7 AM today
      nextUpdate = new Date(now);
      nextUpdate.setHours(7, 0, 0, 0);
    } else if (currentHour < 19) {
      // After sunrise, before sunset, update at 7 PM today
      nextUpdate = new Date(now);
      nextUpdate.setHours(19, 0, 0, 0);
    } else {
      // After sunset, update at 7 AM tomorrow
      nextUpdate = new Date(now);
      nextUpdate.setDate(nextUpdate.getDate() + 1);
      nextUpdate.setHours(7, 0, 0, 0);
    }

    const timeUntilUpdate = nextUpdate.getTime() - now.getTime();

    setTimeout(() => {
      if (this.theme === 'auto') {
        this.updateResolvedTheme();
        this.applyTheme();
        this.notifyListeners();
      }
      // Set up next update (12 hours from now)
      this.setupTimeBasedTheme();
    }, timeUntilUpdate);
  }

  private applyTheme() {
    const root = document.documentElement;

    // Add transition prevention class temporarily
    root.classList.add('no-transition');

    // Remove both theme classes first
    root.classList.remove('light', 'dark');

    // Add the resolved theme class
    root.classList.add(this.resolvedTheme);

    // Update color-scheme for native UI elements
    root.style.colorScheme = this.resolvedTheme;

    // Re-enable transitions after a frame
    requestAnimationFrame(() => {
      root.classList.remove('no-transition');
    });
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.updateResolvedTheme();
    this.applyTheme();
    this.notifyListeners();
  }

  toggleTheme() {
    if (this.theme === 'light') {
      this.setTheme('dark');
    } else if (this.theme === 'dark') {
      this.setTheme('auto');
    } else {
      this.setTheme('light');
    }
  }

  getTheme(): Theme {
    return this.theme;
  }

  getResolvedTheme(): 'light' | 'dark' {
    return this.resolvedTheme;
  }

  subscribe(listener: (theme: ThemeSystem) => void): () => void {
    this.listeners.push(listener);

    // Call immediately with current state
    listener({
      theme: this.theme,
      resolvedTheme: this.resolvedTheme,
      setTheme: this.setTheme.bind(this),
      toggleTheme: this.toggleTheme.bind(this),
    });

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    const themeSystem: ThemeSystem = {
      theme: this.theme,
      resolvedTheme: this.resolvedTheme,
      setTheme: this.setTheme.bind(this),
      toggleTheme: this.toggleTheme.bind(this),
    };

    this.listeners.forEach(listener => listener(themeSystem));
  }
}

export function useTheme(): ThemeSystem {
  const [themeState, setThemeState] = useState<ThemeSystem>(() => {
    const manager = ThemeManager.getInstance();
    return {
      theme: manager.getTheme(),
      resolvedTheme: manager.getResolvedTheme(),
      setTheme: manager.setTheme.bind(manager),
      toggleTheme: manager.toggleTheme.bind(manager),
    };
  });

  useEffect(() => {
    const manager = ThemeManager.getInstance();
    return manager.subscribe(setThemeState);
  }, []);

  return themeState;
}

// Export theme manager for direct access
export const themeManager = ThemeManager.getInstance();
