'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

function useVideoState(src: string, autoPlay: boolean) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCanPlay = useCallback(
    async (video: HTMLVideoElement) => {
      setIsLoaded(true);

      if (autoPlay) {
        try {
          await video.play();
        } catch (error) {
          console.warn('Video autoplay failed:', error);
        }
      }
    },
    [autoPlay]
  );

  const handleError = useCallback(
    (e: Event) => {
      console.error('Video error:', e, 'src:', src);
      setHasError(true);
    },
    [src]
  );

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return {
    isLoaded,
    hasError,
    handleCanPlay,
    handleError,
    handleLoadedData,
  };
}

function VideoElement({
  src,
  autoPlay,
  loop,
  muted,
  poster,
  videoStyle,
  videoRef,
  onCanPlay,
  onError,
  onLoadedData,
}: {
  src: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  poster?: string;
  videoStyle: React.CSSProperties;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onCanPlay: (video: HTMLVideoElement) => Promise<void>;
  onError: (e: Event) => void;
  onLoadedData: () => void;
}) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayWrapper = () => onCanPlay(video);

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('canplay', handleCanPlayWrapper);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('canplay', handleCanPlayWrapper);
      video.removeEventListener('error', onError);
    };
  }, [videoRef, onCanPlay, onError, onLoadedData]);

  return (
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
  );
}

function PosterImage({ poster }: { poster: string }) {
  const posterStyle = useMemo(
    () => ({
      backgroundImage: `url(${poster})`,
    }),
    [poster]
  );

  return (
    <div
      aria-label='Background'
      className='absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat'
      role='img'
      style={posterStyle}
    />
  );
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
  const isMobile = useIsMobile();

  const { isLoaded, hasError, handleCanPlay, handleError, handleLoadedData } =
    useVideoState(src, autoPlay);

  const shouldPlayVideo = !mobileDisabled || !isMobile;

  const videoStyle = useMemo(
    () => ({
      opacity: isLoaded && !hasError ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
    }),
    [isLoaded, hasError]
  );

  return (
    <div className={`video-container ${className}`}>
      {shouldPlayVideo ? (
        <VideoElement
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onLoadedData={handleLoadedData}
          poster={poster}
          src={src}
          videoRef={videoRef}
          videoStyle={videoStyle}
        />
      ) : (
        poster && <PosterImage poster={poster} />
      )}

      {hasError && (
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mesh-bg' />
      )}

      {overlay && <div className='video-overlay' />}

      {children && <div className='video-content'>{children}</div>}
    </div>
  );
}
