'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

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
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

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
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative group rounded-lg overflow-hidden',
        isFullscreen && 'fixed inset-0 z-50 rounded-none',
        className
      )}
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
      onClick={handleVideoClick}
      onTouchStart={handleVideoTouch}
    >
      <video
        ref={videoRef}
        className={cn(
          'w-full aspect-video object-cover bg-black cursor-pointer',
          isFullscreen && 'h-full aspect-auto'
        )}
        src={videoUrl}
        muted={isMuted}
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        Your browser does not support the video tag.
      </video>

      {/* Video Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          !isMobile && 'bg-black/20'
        )}
        style={{ pointerEvents: showControls ? 'auto' : 'none' }}
      >
        {/* Play/Pause Button */}
        <Button
          size='lg'
          className={cn(
            'rounded-full bg-black/50 hover:bg-black/70 border-0',
            isMobile ? 'h-14 w-14 md:h-16 md:w-16' : 'h-16 w-16'
          )}
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent',
          isMobile ? 'p-3' : 'p-4'
        )}
        style={{ pointerEvents: showControls ? 'auto' : 'none' }}
      >
        <div className='flex items-center justify-between'>
          {/* Left controls */}
          <div className='flex items-center gap-1 md:gap-2'>
            <Button
              size='sm'
              variant='ghost'
              className={cn(
                'text-white hover:bg-white/20',
                isMobile ? 'h-9 w-9 p-0' : 'h-8 w-8 p-0'
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleMuteToggle();
              }}
              title={isMuted ? 'Unmute' : 'Mute'}
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
              size='sm'
              variant='ghost'
              className={cn(
                'text-white hover:bg-white/20',
                isMobile ? 'h-9 w-9 p-0' : 'h-8 w-8 p-0'
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              title='Download video'
            >
              <Download className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
            </Button>
            {!isMobile && (
              <Button
                size='sm'
                variant='ghost'
                className='h-8 w-8 p-0 text-white hover:bg-white/20'
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenInNewTab();
                }}
                title='Open in new tab'
              >
                <ExternalLink className='h-4 w-4' />
              </Button>
            )}
            <Button
              size='sm'
              variant='ghost'
              className={cn(
                'text-white hover:bg-white/20',
                isMobile ? 'h-9 w-9 p-0' : 'h-8 w-8 p-0'
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <Maximize className={isMobile ? 'h-5 w-5' : 'h-4 w-4'} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Loading overlay for processing state */}
      {status === 'processing' && (
        <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
          <div className='text-center text-white px-4'>
            <div className='animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-white mx-auto mb-2' />
            <p className='text-xs md:text-sm'>Processing...</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}