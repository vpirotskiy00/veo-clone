'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlay?: boolean;
  children?: React.ReactNode;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
}

export function VideoBackground({
  src,
  className = '',
  overlay = true,
  children,
  poster,
  muted = true,
  loop = true,
  autoPlay = true,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = async () => {
      console.log('Video can play, src:', src);
      setIsLoaded(true);

      if (autoPlay) {
        try {
          await video.play();
          console.log('Video is playing');
        } catch (error) {
          console.warn('Video autoplay failed:', error);
          // Fallback: show video without autoplay
        }
      }
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e, 'src:', src);
      setHasError(true);
    };

    const handleLoadedData = () => {
      console.log('Video data loaded');
      setIsLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [src, autoPlay]);

  return (
    <div className={`video-container ${className}`}>
      {/* Video Element */}
      <video
        autoPlay={autoPlay}
        className='absolute inset-0 w-full h-full object-cover'
        loop={loop}
        muted={muted}
        playsInline
        poster={poster}
        preload='metadata'
        ref={videoRef}
        src={src}
        style={{
          opacity: isLoaded && !hasError ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <track kind='captions' label='English' srcLang='en' />
      </video>

      {/* Fallback Background */}
      {hasError && (
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mesh-bg' />
      )}

      {/* Video Overlay */}
      {overlay && <div className='video-overlay' />}

      {/* Content */}
      {children && <div className='video-content'>{children}</div>}
    </div>
  );
}
