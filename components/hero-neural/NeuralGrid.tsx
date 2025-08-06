'use client';

import { motion, useAnimationFrame } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

import { useMousePhysics } from '@/lib/animation-system/hooks/useMousePhysics';

interface Node {
  x: number;
  y: number;
  connections: number[];
  pulsePhase: number;
}

export function NeuralGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouse = useMousePhysics({ damping: 0.1, stiffness: 0.05 });
  const animationTime = useRef(0);

  // Initialize nodes
  useEffect(() => {
    const nodes: Node[] = [];
    const cols = 15;
    const rows = 10;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i / (cols - 1)) * window.innerWidth;
        const y = (j / (rows - 1)) * window.innerHeight;
        
        nodes.push({
          x,
          y,
          connections: [],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    // Create connections
    nodes.forEach((node, i) => {
      const nearbyNodes = nodes
        .map((n, idx) => ({ node: n, idx, distance: Math.hypot(n.x - node.x, n.y - node.y) }))
        .filter(({ distance, idx }) => distance < 200 && distance > 0 && idx !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);
      
      node.connections = nearbyNodes.map(({ idx }) => idx);
    });

    nodesRef.current = nodes;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodes = nodesRef.current;
    const mouseX = mouse.x;
    const mouseY = mouse.y;

    // Draw connections
    ctx.strokeStyle = 'rgba(147, 51, 234, 0.2)'; // purple-600 with opacity
    ctx.lineWidth = 1;

    nodes.forEach((node) => {
      node.connections.forEach((targetIdx) => {
        const target = nodes[targetIdx];
        
        // Calculate distance to mouse
        const distToMouse = Math.hypot(mouseX - node.x, mouseY - node.y);
        const opacity = distToMouse < 200 ? 0.5 - (distToMouse / 400) : 0.2;
        
        ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });
    });

    // Draw nodes
    nodes.forEach((node) => {
      const distToMouse = Math.hypot(mouseX - node.x, mouseY - node.y);
      const scale = distToMouse < 150 ? 1.5 - (distToMouse / 300) : 1;
      const pulse = Math.sin(animationTime.current * 0.002 + node.pulsePhase) * 0.5 + 0.5;
      
      // Node glow
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 10 * scale);
      gradient.addColorStop(0, `rgba(147, 51, 234, ${0.8 * pulse})`);
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 10 * scale, 0, Math.PI * 2);
      ctx.fill();
      
      // Node core
      ctx.fillStyle = `rgba(147, 51, 234, ${0.8 + pulse * 0.2})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3 * scale, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw electric pulses
    const pulseTime = animationTime.current * 0.001;
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)'; // blue-500
    ctx.lineWidth = 2;
    
    nodes.forEach((node, i) => {
      if (i % 5 === Math.floor(pulseTime) % 5) {
        node.connections.forEach((targetIdx) => {
          const target = nodes[targetIdx];
          const progress = (pulseTime % 1);
          
          const pulseX = node.x + (target.x - node.x) * progress;
          const pulseY = node.y + (target.y - node.y) * progress;
          
          const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 15);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 15, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    });
  }, [mouse.x, mouse.y]);

  useAnimationFrame(() => {
    animationTime.current += 16; // Approximate 60fps
    draw();
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full'
      style={{ opacity: 0.6 }}
    />
  );
}