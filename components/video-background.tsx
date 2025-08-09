'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useIsMobile } from '@/hooks/use-mobile';

interface VideoBackgroundProps {
  src: string;
  className?: string;
  overlay?: boolean;
  children?: React.ReactNode;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  mobileDisabled?: boolean;
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
  mobileDisabled = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isMobile = useIsMobile();

  // Disable video on mobile if specified
  const shouldPlayVideo = !mobileDisabled || !isMobile;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = async () => {
      setIsLoaded(true);

      if (autoPlay) {
        try {
          await video.play();
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

  // Memoize styles to prevent recreation on every render
  const videoStyle = useMemo(
    () => ({
      opacity: isLoaded && !hasError ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
    }),
    [isLoaded, hasError]
  );

  const posterStyle = useMemo(
    () => ({
      backgroundImage: `url(${poster})`,
    }),
    [poster]
  );

  return (
    <div className={`video-container ${className}`}>
      {/* Video Element - conditionally rendered based on mobile settings */}
      {shouldPlayVideo ? (
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
          style={videoStyle}
        >
          <track kind='captions' label='English' srcLang='en' />
        </video>
      ) : (
        poster && (
          <div
            aria-label='Background'
            className='absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
            role='img'
            style={posterStyle}
          />
        )
      )}

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
