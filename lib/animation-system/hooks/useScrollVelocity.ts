import { useEffect, useRef, useState } from 'react';

interface ScrollVelocity {
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  position: number;
  progress: number; // 0-1 scroll progress
}

export function useScrollVelocity(threshold: number = 0.1) {
  const [scrollData, setScrollData] = useState<ScrollVelocity>({
    velocity: 0,
    direction: 'idle',
    position: 0,
    progress: 0,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocityTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime.current;
      
      if (timeDiff > 0) {
        const distance = currentScrollY - lastScrollY.current;
        const velocity = Math.abs(distance / timeDiff);
        
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0;

        setScrollData({
          velocity,
          direction: distance > threshold ? 'down' : distance < -threshold ? 'up' : 'idle',
          position: currentScrollY,
          progress: Math.min(1, Math.max(0, progress)),
        });

        // Reset velocity after scrolling stops
        if (velocityTimeout.current) {
          clearTimeout(velocityTimeout.current);
        }
        velocityTimeout.current = setTimeout(() => {
          setScrollData(prev => ({ ...prev, velocity: 0, direction: 'idle' }));
        }, 150);
      }

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (velocityTimeout.current) {
        clearTimeout(velocityTimeout.current);
      }
    };
  }, [threshold]);

  return scrollData;
}