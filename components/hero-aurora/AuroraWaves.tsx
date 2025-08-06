'use client';

import { motion } from 'framer-motion';

import { useMouseParallax } from '@/lib/animation-system/hooks/useMousePhysics';

export function AuroraWaves() {
  const mouseParallax = useMouseParallax(0.03);

  const waves = [
    {
      gradient: 'from-green-400/20 via-blue-400/20 to-purple-400/20',
      duration: 25,
      delay: 0,
      path: 'M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    },
    {
      gradient: 'from-purple-400/20 via-pink-400/20 to-cyan-400/20',
      duration: 30,
      delay: 2,
      path: 'M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    },
    {
      gradient: 'from-cyan-400/20 via-green-400/20 to-blue-400/20',
      duration: 35,
      delay: 4,
      path: 'M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    },
  ];

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {waves.map((wave, index) => (
        <motion.div
          key={index}
          className='absolute inset-0'
          style={{
            transform: `translateX(${mouseParallax.x * (index + 1) * 0.5}px) translateY(${
              mouseParallax.y * (index + 1) * 0.3
            }px)`,
          }}
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: wave.duration,
            delay: wave.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            className='absolute inset-0 w-full h-full'
            viewBox='0 0 1440 320'
            preserveAspectRatio='none'
            style={{
              opacity: 0.4,
              mixBlendMode: 'screen',
            }}
          >
            <defs>
              <linearGradient id={`aurora-gradient-${index}`} x1='0%' y1='0%' x2='100%' y2='0%'>
                <stop offset='0%' className='text-green-400' stopColor='currentColor' stopOpacity='0.3'>
                  <animate
                    attributeName='stop-color'
                    values='#4ade80;#60a5fa;#a78bfa;#4ade80'
                    dur={`${wave.duration}s`}
                    repeatCount='indefinite'
                  />
                </stop>
                <stop offset='50%' className='text-blue-400' stopColor='currentColor' stopOpacity='0.5'>
                  <animate
                    attributeName='stop-color'
                    values='#60a5fa;#a78bfa;#4ade80;#60a5fa'
                    dur={`${wave.duration}s`}
                    repeatCount='indefinite'
                  />
                </stop>
                <stop offset='100%' className='text-purple-400' stopColor='currentColor' stopOpacity='0.3'>
                  <animate
                    attributeName='stop-color'
                    values='#a78bfa;#4ade80;#60a5fa;#a78bfa'
                    dur={`${wave.duration}s`}
                    repeatCount='indefinite'
                  />
                </stop>
              </linearGradient>
              
              <filter id={`aurora-blur-${index}`}>
                <feGaussianBlur in='SourceGraphic' stdDeviation='20' />
              </filter>
            </defs>
            
            <path
              d={wave.path}
              fill={`url(#aurora-gradient-${index})`}
              filter={`url(#aurora-blur-${index})`}
              opacity='0.8'
            >
              <animateTransform
                attributeName='transform'
                type='translate'
                values='0,0; 0,-20; 0,0'
                dur={`${wave.duration}s`}
                repeatCount='indefinite'
              />
            </path>
          </svg>
        </motion.div>
      ))}

      {/* Additional shimmer effect */}
      <div
        className='absolute inset-0 opacity-30'
        style={{
          background: `linear-gradient(
            135deg,
            transparent 25%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 75%
          )`,
          backgroundSize: '200% 200%',
          animation: 'shimmer 15s linear infinite',
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% -200%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
      `}</style>
    </div>
  );
}