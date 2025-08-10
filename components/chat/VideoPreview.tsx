'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

import { BottomControls } from '@/components/chat/video-preview/BottomControls';
import { ProcessingPlaceholder } from '@/components/chat/video-preview/ProcessingPlaceholder';
import { VideoControls } from '@/components/chat/video-preview/VideoControls';
import { useFullscreen } from '@/hooks/use-fullscreen';
import { useIsMobile } from '@/hooks/use-mobile';
import { useVideoActions } from '@/hooks/use-video-actions';
import { useVideoControls } from '@/hooks/use-video-controls';
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
  className,
}: VideoPreviewProps) {
  const isMobile = useIsMobile();
  const { isFullscreen, containerRef, handleFullscreen } = useFullscreen();
  const { handleDownload, handleOpenInNewTab } = useVideoActions({
    videoUrl,
    videoId,
  });

  const {
    isPlaying,
    setIsPlaying,
    isMuted,
    showControls,
    setShowControls,
    videoRef,
    handlePlayPause,
    handleMuteToggle,
    handleVideoClick,
    handleVideoTouch,
    showControlsTemporarily,
    clearControlsTimeout,
  } = useVideoControls({ isMobile });

  useEffect(() => {
    if (isMobile) {
      setShowControls(true);
      showControlsTemporarily();
    }
  }, [isMobile, setShowControls, showControlsTemporarily]);

  useEffect(() => {
    return clearControlsTimeout;
  }, [clearControlsTimeout]);

  if (status !== 'completed') {
    return <ProcessingPlaceholder className={className} status={status} />;
  }

  const containerClasses = cn(
    'relative group rounded-lg overflow-hidden',
    isFullscreen && 'fixed inset-0 z-50 rounded-none',
    className
  );

  const videoClasses = cn(
    'w-full aspect-video object-cover bg-black cursor-pointer',
    isFullscreen && 'h-full aspect-auto'
  );

  const motionProps = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  };

  const interactionProps = {
    onClick: handleVideoClick,
    onMouseEnter: () => !isMobile && setShowControls(true),
    onMouseLeave: () => !isMobile && setShowControls(false),
    onTouchStart: handleVideoTouch,
  };

  return (
    <motion.div
      {...motionProps}
      {...interactionProps}
      className={containerClasses}
      ref={containerRef}
    >
      <video
        className={videoClasses}
        loop
        muted={isMuted}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        ref={videoRef}
        src={videoUrl}
      >
        <track kind='captions' label='English captions' src='' srcLang='en' />
        Your browser does not support the video tag.
      </video>

      <VideoControls
        isMobile={isMobile}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        showControls={showControls}
      />

      <BottomControls
        isFullscreen={isFullscreen}
        isMobile={isMobile}
        isMuted={isMuted}
        onDownload={handleDownload}
        onFullscreen={handleFullscreen}
        onMuteToggle={handleMuteToggle}
        onOpenInNewTab={handleOpenInNewTab}
        showControls={showControls}
      />
    </motion.div>
  );
}
