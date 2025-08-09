'use client';

import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface MobileVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

export function MobileVideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  onPlay,
  onPause,
  onEnd,
}: MobileVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => {
      setIsPlaying(false);
      onEnd?.();
    });

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [onEnd]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      video.play();
      setIsPlaying(true);
      onPlay?.();
    }
  }, [isPlaying, onPause, onPlay]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleSeek = useCallback((value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  }, []);

  const handleTouchStart = useCallback(() => {
    setShowControls(true);
  }, []);

  const currentTimeValue = useMemo(() => [currentTime], [currentTime]);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3000);
    };

    resetTimer();

    return () => clearTimeout(timer);
  }, [currentTime]);

  return (
    <div
      className={cn(
        'relative bg-black rounded-lg overflow-hidden group',
        className
      )}
      onTouchStart={handleTouchStart}
      ref={containerRef}
    >
      <video
        autoPlay={autoPlay}
        className='w-full h-full object-contain'
        muted={isMuted}
        playsInline
        poster={poster}
        ref={videoRef}
        src={src}
        webkit-playsinline='true'
      >
        <track kind='captions' label='English' srcLang='en' />
      </video>

      {/* Controls Overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Center Play Button */}
        <button
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          onClick={togglePlay}
        >
          <div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
            {isPlaying ? (
              <Pause className='w-8 h-8 text-white' />
            ) : (
              <Play className='w-8 h-8 text-white ml-1' />
            )}
          </div>
        </button>

        {/* Bottom Controls */}
        <div className='absolute bottom-0 left-0 right-0 p-4'>
          {/* Progress Bar */}
          <div className='mb-4'>
            <Slider
              className='w-full'
              max={duration}
              onValueChange={handleSeek}
              step={0.1}
              value={currentTimeValue}
            />
            <div className='flex justify-between text-xs text-white mt-1'>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Button
                className='w-10 h-10 text-white hover:bg-white/20'
                onClick={togglePlay}
                size='icon'
                variant='ghost'
              >
                {isPlaying ? (
                  <Pause className='w-5 h-5' />
                ) : (
                  <Play className='w-5 h-5' />
                )}
              </Button>

              <Button
                className='w-10 h-10 text-white hover:bg-white/20'
                onClick={toggleMute}
                size='icon'
                variant='ghost'
              >
                {isMuted ? (
                  <VolumeX className='w-5 h-5' />
                ) : (
                  <Volume2 className='w-5 h-5' />
                )}
              </Button>
            </div>

            <Button
              className='w-10 h-10 text-white hover:bg-white/20'
              onClick={toggleFullscreen}
              size='icon'
              variant='ghost'
            >
              {isFullscreen ? (
                <Minimize2 className='w-5 h-5' />
              ) : (
                <Maximize2 className='w-5 h-5' />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
