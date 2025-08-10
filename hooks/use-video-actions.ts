'use client';

import { useCallback } from 'react';

interface UseVideoActionsProps {
  videoUrl: string;
  videoId?: string;
}

export function useVideoActions({ videoUrl, videoId }: UseVideoActionsProps) {
  const handleDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `generated-video-${videoId || Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [videoUrl, videoId]);

  const handleOpenInNewTab = useCallback(() => {
    window.open(videoUrl, '_blank');
  }, [videoUrl]);

  return {
    handleDownload,
    handleOpenInNewTab,
  };
}