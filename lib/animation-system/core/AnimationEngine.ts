import { useCallback, useEffect, useRef } from 'react';

export interface AnimationConfig {
  quality: 'low' | 'medium' | 'high' | 'ultra';
  autoOptimize: boolean;
  targetFPS: 30 | 60;
  reducedMotion: boolean;
}

export class AnimationEngine {
  private rafId: number | null = null;
  private lastFrameTime = 0;
  private fps = 60;
  private fpsHistory: number[] = [];
  private callbacks: Set<(deltaTime: number) => void> = new Set();
  private config: AnimationConfig = {
    quality: 'high',
    autoOptimize: true,
    targetFPS: 60,
    reducedMotion: false,
  };

  constructor(config?: Partial<AnimationConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    this.checkReducedMotion();
  }

  private checkReducedMotion() {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.config.reducedMotion = mediaQuery.matches;
      mediaQuery.addEventListener('change', (e) => {
        this.config.reducedMotion = e.matches;
      });
    }
  }

  public start() {
    if (this.rafId !== null) return;
    this.lastFrameTime = performance.now();
    this.loop();
  }

  public stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private loop = () => {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastFrameTime;
    
    // Calculate FPS
    this.fps = 1000 / deltaTime;
    this.fpsHistory.push(this.fps);
    if (this.fpsHistory.length > 60) {
      this.fpsHistory.shift();
    }

    // Auto-optimize quality based on FPS
    if (this.config.autoOptimize) {
      this.optimizeQuality();
    }

    // Skip frame if reduced motion is enabled
    if (!this.config.reducedMotion) {
      // Execute all registered callbacks
      this.callbacks.forEach(callback => callback(deltaTime));
    }

    this.lastFrameTime = currentTime;
    this.rafId = requestAnimationFrame(this.loop);
  };

  private optimizeQuality() {
    const avgFPS = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
    
    if (avgFPS < 30 && this.config.quality !== 'low') {
      this.config.quality = 'low';
    } else if (avgFPS < 45 && this.config.quality === 'high') {
      this.config.quality = 'medium';
    } else if (avgFPS > 55 && this.config.quality === 'medium') {
      this.config.quality = 'high';
    } else if (avgFPS > 58 && this.config.quality === 'high') {
      this.config.quality = 'ultra';
    }
  }

  public register(callback: (deltaTime: number) => void) {
    this.callbacks.add(callback);
  }

  public unregister(callback: (deltaTime: number) => void) {
    this.callbacks.delete(callback);
  }

  public getConfig() {
    return this.config;
  }

  public getFPS() {
    return Math.round(this.fps);
  }

  public getAverageFPS() {
    if (this.fpsHistory.length === 0) return 60;
    return Math.round(
      this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
    );
  }
}

// Singleton instance
let engineInstance: AnimationEngine | null = null;

export function getAnimationEngine(config?: Partial<AnimationConfig>) {
  if (!engineInstance) {
    engineInstance = new AnimationEngine(config);
  }
  return engineInstance;
}

// React hook for using the animation engine
export function useAnimationEngine(
  callback: (deltaTime: number) => void,
  deps: React.DependencyList = []
) {
  const engine = useRef(getAnimationEngine());
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  useEffect(() => {
    const wrappedCallback = (deltaTime: number) => {
      callbackRef.current(deltaTime);
    };

    engine.current.register(wrappedCallback);
    engine.current.start();

    return () => {
      engine.current.unregister(wrappedCallback);
      // Don't stop the engine as other components might be using it
    };
  }, []);

  return {
    fps: engine.current.getFPS(),
    quality: engine.current.getConfig().quality,
    reducedMotion: engine.current.getConfig().reducedMotion,
  };
}