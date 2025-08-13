import { motion } from 'framer-motion';
import { Download, ExternalLink, Maximize, Volume2, VolumeX } from 'lucide-react';
import { MouseEvent, useCallback, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BottomControlsProps {
  isFullscreen: boolean;
  isMobile: boolean;
  isMuted: boolean;
  onDownload: () => void;
  onFullscreen: () => void;
  onMuteToggle: () => void;
  onOpenInNewTab: () => void;
  showControls: boolean;
}

const BUTTON_SIZE_MOBILE = 'h-9 w-9 p-0';
const BUTTON_SIZE_DESKTOP = 'h-8 w-8 p-0';
const ICON_SIZE_MOBILE = 'h-5 w-5';
const ICON_SIZE_DESKTOP = 'h-4 w-4';

const motionTransition = { duration: 0.2 };
const motionInitial = { opacity: 0, y: 10 };
const containerBaseClass = 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent';
const flexContainerClass = 'flex items-center justify-between';
const actionButtonsClass = 'flex items-center gap-1 md:gap-2';
const muteButtonsClass = 'flex items-center gap-1 md:gap-2';

function getButtonSize(isMobile: boolean) {
  return isMobile ? BUTTON_SIZE_MOBILE : BUTTON_SIZE_DESKTOP;
}

function getIconSize(isMobile: boolean) {
  return isMobile ? ICON_SIZE_MOBILE : ICON_SIZE_DESKTOP;
}

function MuteButton({ isMuted, isMobile, onMuteToggle }: {
  isMuted: boolean;
  isMobile: boolean;
  onMuteToggle: (e: MouseEvent) => void;
}) {
  return (
    <Button
      className={cn('text-white hover:bg-white/20', getButtonSize(isMobile))}
      onClick={onMuteToggle}
      size="sm"
      title={isMuted ? 'Unmute' : 'Mute'}
      variant="ghost"
    >
      {isMuted ? (
        <VolumeX className={getIconSize(isMobile)} />
      ) : (
        <Volume2 className={getIconSize(isMobile)} />
      )}
    </Button>
  );
}

function ActionButtons({ 
  isMobile, 
  onDownload, 
  onOpenInNewTab, 
  onFullscreen, 
  isFullscreen 
}: {
  isMobile: boolean;
  onDownload: (e: MouseEvent) => void;
  onOpenInNewTab: (e: MouseEvent) => void;
  onFullscreen: (e: MouseEvent) => void;
  isFullscreen: boolean;
}) {
  return (
    <>
      <Button
        className={cn('text-white hover:bg-white/20', getButtonSize(isMobile))}
        onClick={onDownload}
        size="sm"
        title="Download video"
        variant="ghost"
      >
        <Download className={getIconSize(isMobile)} />
      </Button>
      {!isMobile && (
        <Button
          className="h-8 w-8 p-0 text-white hover:bg-white/20"
          onClick={onOpenInNewTab}
          size="sm"
          title="Open in new tab"
          variant="ghost"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
      <Button
        className={cn('text-white hover:bg-white/20', getButtonSize(isMobile))}
        onClick={onFullscreen}
        size="sm"
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        variant="ghost"
      >
        <Maximize className={getIconSize(isMobile)} />
      </Button>
    </>
  );
}

export function BottomControls({
  isFullscreen,
  isMobile,
  isMuted,
  onDownload,
  onFullscreen,
  onMuteToggle,
  onOpenInNewTab,
  showControls,
}: BottomControlsProps) {
  const handleMuteToggle = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onMuteToggle();
  }, [onMuteToggle]);

  const handleDownload = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onDownload();
  }, [onDownload]);

  const handleOpenInNewTab = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onOpenInNewTab();
  }, [onOpenInNewTab]);

  const handleFullscreen = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onFullscreen();
  }, [onFullscreen]);

  const containerClassName = useMemo(
    () => cn(containerBaseClass, isMobile ? 'p-3' : 'p-4'),
    [isMobile]
  );

  const motionAnimate = useMemo(
    () => ({ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }),
    [showControls]
  );

  const motionStyle = useMemo(
    () => ({ pointerEvents: showControls ? 'auto' as const : 'none' as const }),
    [showControls]
  );

  return (
    <motion.div
      animate={motionAnimate}
      className={containerClassName}
      initial={motionInitial}
      style={motionStyle}
      transition={motionTransition}
    >
      <div className={flexContainerClass}>
        <div className={muteButtonsClass}>
          <MuteButton 
            isMobile={isMobile}
            isMuted={isMuted}
            onMuteToggle={handleMuteToggle}
          />
        </div>

        <div className={actionButtonsClass}>
          <ActionButtons
            isFullscreen={isFullscreen}
            isMobile={isMobile}
            onDownload={handleDownload}
            onFullscreen={handleFullscreen}
            onOpenInNewTab={handleOpenInNewTab}
          />
        </div>
      </div>
    </motion.div>
  );
}