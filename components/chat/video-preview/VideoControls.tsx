import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { MouseEvent, useCallback, useMemo } from 'react';

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

const motionContainerStyles = { pointerEvents: 'auto' as const };
const motionContainerStylesDisabled = { pointerEvents: 'none' as const };
const motionTransition = { duration: 0.2 };
const motionInitial = { opacity: 0 };

export function VideoControls({
  showControls,
  isPlaying,
  isMobile,
  onPlayPause,
}: VideoControlsProps) {
  const handlePlayPauseClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onPlayPause();
  }, [onPlayPause]);

  const containerClassName = useMemo(
    () => cn(
      'absolute inset-0 flex items-center justify-center',
      !isMobile && 'bg-black/20'
    ),
    [isMobile]
  );

  const buttonClassName = useMemo(
    () => cn(
      'rounded-full bg-black/50 hover:bg-black/70 border-0',
      isMobile ? playButtonSize.mobile : playButtonSize.desktop
    ),
    [isMobile]
  );

  const iconClassName = useMemo(
    () => cn(
      'text-white',
      isMobile ? iconSize.mobile : iconSize.desktop
    ),
    [isMobile]
  );

  const playIconClassName = useMemo(
    () => cn(
      'text-white ml-1',
      isMobile ? iconSize.mobile : iconSize.desktop
    ),
    [isMobile]
  );

  const motionAnimateOpacity = useMemo(
    () => ({ opacity: showControls ? 1 : 0 }),
    [showControls]
  );

  const motionStyle = useMemo(
    () => showControls ? motionContainerStyles : motionContainerStylesDisabled,
    [showControls]
  );

  return (
    <motion.div
      animate={motionAnimateOpacity}
      className={containerClassName}
      initial={motionInitial}
      style={motionStyle}
      transition={motionTransition}
    >
      <Button
        className={buttonClassName}
        onClick={handlePlayPauseClick}
        size="lg"
      >
        {isPlaying ? (
          <Pause className={iconClassName} />
        ) : (
          <Play className={playIconClassName} />
        )}
      </Button>
    </motion.div>
  );
}