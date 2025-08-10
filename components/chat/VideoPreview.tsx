'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, Maximize,Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useCallback,useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface VideoPreviewProps {
  videoUrl: string;
  videoId?: string;
  status: 'processing' | 'completed' | 'error' | 'sending' | 'sent';
  className?: string;
}

export function VideoPreview({ 
  videoUrl, 
  videoId, 
  status, 
  className 
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `generated-video-${videoId || Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenInNewTab = () => {
    window.open(videoUrl, '_blank');
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(console.error);
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(console.error);
    }
  };

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const handleVideoClick = () => {
    if (isMobile) {
      showControlsTemporarily();
    } else {
      handlePlayPause();
    }
  };

  const handleVideoTouch = () => {
    if (isMobile) {
      showControlsTemporarily();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShowControls(true);
      showControlsTemporarily();
    }
  }, [isMobile, showControlsTemporarily]);

  if (status !== 'completed') {
    return (
      <Card className={cn('aspect-video bg-muted flex items-center justify-center', className)}>
        <div className='text-center px-4'>
          <div className='h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center'>
            <Play className='h-5 w-5 md:h-6 md:w-6 text-primary' />
          </div>
          <p className='text-xs md:text-sm text-muted-foreground'>
            {status === 'processing' ? 'Video is being generated...' : 'Video will appear here'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'relative group rounded-lg overflow-hidden',
        isFullscreen && 'fixed inset-0 z-50 rounded-none',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      onClick={handleVideoClick}
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
      onTouchStart={handleVideoTouch}
      ref={containerRef}
      transition={{ duration: 0.3 }}
    >
      <video
        className={cn(
          'w-full aspect-video object-cover bg-black cursor-pointer',
          isFullscreen && 'h-full aspect-auto'
        )}
        loop
        muted={isMuted}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        ref={videoRef}
        src={videoUrl}
      >
        <track kind="captions" src="" srcLang="en" label="English captions" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls Overlay */}
      <motion.div
        animate={{ opacity: showControls ? 1 : 0 }}
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          !isMobile && 'bg-black/20'
        )}
        initial={{ opacity: 0 }}
        style={{ pointerEvents: showControls ? 'auto' : 'none' }}
        transition={{ duration: 0.2 }}
      >
        {/* Play/Pause Button */}
        <Button
          className={cn(
            'rounded-full bg-black/50 hover:bg-black/70 border-0',
            isMobile ? 'h-14 w-14 md:h-16 md:w-16' : 'h-16 w-16'
          )}
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
          size='lg'
        >
          {isPlaying ? (
            <Pause className={cn('text-white', isMobile ? 'h-6 w-6 md:h-8 md:w-8' : 'h-8 w-8')} />
          ) : (
            <Play className={cn('text-white ml-1', isMobile ? 'h-6 w-6 md:h-8 md:w-8' : 'h-8 w-8')} />
          )}
        </Button>
      </motion.div>

      {/* Bottom Controls */}
      <motion.div
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent',
          isMobile ? 'p-3' : 'p-4'
        )}
        initial={{ opacity: 0, y: 10 }}
        style={{ pointerEvents: showControls ? 'auto' : 'none' }}
        transition={{ duration: 0.2 }}
      >
        <div className='flex items-center justify-between'>
          {/* Left controls */}
          <div className='flex items-center gap-1 md:gap-2'>
            <Button
              className={cn(
                'text-white hover:bg-white/20',
                isMobile ? 'h-9 w-9 p-0' : 'h-8 w-8 p-0'
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleMuteToggle();
              }}
              size='sm'
              title={isMuted ? 'Unmute' : 'Mute'}
              variant='ghost'
            >
              {isMuted ? (
                <VolumeX className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
              ) : (
                <Volume2 className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
              )}
            </Button>
          </div>

          {/* Right controls */}
          <div className='flex items-center gap-1 md:gap-2'>
            <Button
              className={cn(
                'text-white hover:bg-white/20',
                isMobile ? 'h-9 w-9 p-0' : 'h-8 w-8 p-0'
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              size='sm'
              title='Download video'
              variant='ghost'
            >
              <Download className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
            </Button>
            {!isMobile && (
              <Button
                className='h-8 w-8 p-0 text-white hover:bg-white/20'
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenInNewTab();
                }}
                size='sm'
                title='Open in new tab'
                variant='ghost'
              >
                <ExternalLink className='h-4 w-4' />
              </Button>
            )}
            <Button
              className={cn(
                'text-white hover:bg-white/20',
                isMobile ? 'h-9 w-9 p-0' : 'h-8 w-8 p-0'
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              size='sm'
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              variant='ghost'
            >
              <Maximize className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* This overlay is not needed since processing status is handled in the early return above */}
    </motion.div>
  );
}