'use client';

import { useCallback, useRef, useState } from 'react';

interface UseVideoControlsProps {
  isMobile: boolean;
}

export function useVideoControls({ isMobile }: UseVideoControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleMuteToggle = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const handleVideoClick = useCallback(() => {
    if (isMobile) {
      showControlsTemporarily();
    } else {
      handlePlayPause();
    }
  }, [isMobile, showControlsTemporarily, handlePlayPause]);

  const handleVideoTouch = useCallback(() => {
    if (isMobile) {
      showControlsTemporarily();
    }
  }, [isMobile, showControlsTemporarily]);

  const clearControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  }, []);

  return {
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
  };
}