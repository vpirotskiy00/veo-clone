import { motion } from 'framer-motion';
import { Download, ExternalLink, Maximize, Volume2, VolumeX } from 'lucide-react';
import { MouseEvent } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BottomControlsProps {
  showControls: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  isMobile: boolean;
  onMuteToggle: () => void;
  onDownload: () => void;
  onOpenInNewTab: () => void;
  onFullscreen: () => void;
}

const buttonSize = {
  mobile: 'h-9 w-9 p-0',
  desktop: 'h-8 w-8 p-0',
} as const;

const iconSize = {
  mobile: 'h-5 w-5',
  desktop: 'h-4 w-4',
} as const;

export function BottomControls({
  showControls,
  isMuted,
  isFullscreen,
  isMobile,
  onMuteToggle,
  onDownload,
  onOpenInNewTab,
  onFullscreen,
}: BottomControlsProps) {
  const stopPropagation = (callback: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    callback();
  };

  return (
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
      <div className="flex items-center justify-between">
        {/* Left controls */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            className={cn(
              'text-white hover:bg-white/20',
              isMobile ? buttonSize.mobile : buttonSize.desktop
            )}
            onClick={stopPropagation(onMuteToggle)}
            size="sm"
            title={isMuted ? 'Unmute' : 'Mute'}
            variant="ghost"
          >
            {isMuted ? (
              <VolumeX className={isMobile ? iconSize.mobile : iconSize.desktop} />
            ) : (
              <Volume2 className={isMobile ? iconSize.mobile : iconSize.desktop} />
            )}
          </Button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            className={cn(
              'text-white hover:bg-white/20',
              isMobile ? buttonSize.mobile : buttonSize.desktop
            )}
            onClick={stopPropagation(onDownload)}
            size="sm"
            title="Download video"
            variant="ghost"
          >
            <Download className={isMobile ? iconSize.mobile : iconSize.desktop} />
          </Button>
          {!isMobile && (
            <Button
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
              onClick={stopPropagation(onOpenInNewTab)}
              size="sm"
              title="Open in new tab"
              variant="ghost"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          <Button
            className={cn(
              'text-white hover:bg-white/20',
              isMobile ? buttonSize.mobile : buttonSize.desktop
            )}
            onClick={stopPropagation(onFullscreen)}
            size="sm"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            variant="ghost"
          >
            <Maximize className={isMobile ? iconSize.mobile : iconSize.desktop} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}