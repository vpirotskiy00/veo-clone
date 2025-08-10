import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { MouseEvent } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoControlsProps {
  showControls: boolean;
  isPlaying: boolean;
  isMobile: boolean;
  onPlayPause: () => void;
}

const playButtonSize = {
  mobile: 'h-14 w-14 md:h-16 md:w-16',
  desktop: 'h-16 w-16',
} as const;

const iconSize = {
  mobile: 'h-6 w-6 md:h-8 md:w-8',
  desktop: 'h-8 w-8',
} as const;

export function VideoControls({
  showControls,
  isPlaying,
  isMobile,
  onPlayPause,
}: VideoControlsProps) {
  const handlePlayPauseClick = (e: MouseEvent) => {
    e.stopPropagation();
    onPlayPause();
  };

  return (
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
      <Button
        className={cn(
          'rounded-full bg-black/50 hover:bg-black/70 border-0',
          isMobile ? playButtonSize.mobile : playButtonSize.desktop
        )}
        onClick={handlePlayPauseClick}
        size="lg"
      >
        {isPlaying ? (
          <Pause className={cn('text-white', isMobile ? iconSize.mobile : iconSize.desktop)} />
        ) : (
          <Play className={cn('text-white ml-1', isMobile ? iconSize.mobile : iconSize.desktop)} />
        )}
      </Button>
    </motion.div>
  );
}