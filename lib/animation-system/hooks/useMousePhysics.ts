import { useCallback, useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

interface UseMousePhysicsOptions {
  damping?: number; // 0-1, higher = more damping
  mass?: number; // virtual mass for inertia
  stiffness?: number; // spring stiffness
  enabled?: boolean;
}

export function useMousePhysics(options: UseMousePhysicsOptions = {}) {
  const {
    damping = 0.1,
    mass = 1,
    stiffness = 0.1,
    enabled = true,
  } = options;

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const rafRef = useRef<number>();

  const animate = useCallback(() => {
    if (!enabled) return;

    const { x: targetX, y: targetY } = targetRef.current;
    const current = currentRef.current;

    // Spring physics
    const dx = targetX - current.x;
    const dy = targetY - current.y;

    // Apply spring force
    const ax = (dx * stiffness) / mass;
    const ay = (dy * stiffness) / mass;

    // Update velocity with damping
    current.vx = (current.vx + ax) * (1 - damping);
    current.vy = (current.vy + ay) * (1 - damping);

    // Update position
    current.x += current.vx;
    current.y += current.vy;

    setPosition({
      x: current.x,
      y: current.y,
      velocityX: current.vx,
      velocityY: current.vy,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [damping, mass, stiffness, enabled]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!enabled) return;
    
    targetRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, animate, enabled]);

  return position;
}

// Parallax mouse hook
export function useMouseParallax(strength: number = 0.1) {
  const mouse = useMousePhysics({ damping: 0.15, stiffness: 0.08 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const x = (mouse.x - centerX) * strength;
    const y = (mouse.y - centerY) * strength;

    setParallax({ x, y });
  }, [mouse.x, mouse.y, strength]);

  return parallax;
}