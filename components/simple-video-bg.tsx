'use client';

import { useCallback } from 'react';

interface SimpleVideoBgProps {
  src: string;
  className?: string;
}

const fallbackStyles = { zIndex: -1 };

export function SimpleVideoBg({ src, className = '' }: SimpleVideoBgProps) {
  const handleCanPlay = useCallback(() => {}, []);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      console.error('Video error:', e);
      console.error('Video src:', src);
    },
    [src]
  );

  const handleLoadStart = useCallback(() => {}, []);

  const handlePlay = useCallback(() => {}, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <video
        autoPlay
        className='absolute inset-0 w-full h-full object-cover'
        loop
        muted
        onCanPlay={handleCanPlay}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onPlay={handlePlay}
        playsInline
      >
        <source src={src} type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Fallback gradient */}
      <div
        className='absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-slate-900'
        style={fallbackStyles}
      />
    </div>
  );
}
