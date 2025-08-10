import { Play } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProcessingPlaceholderProps {
  status: 'processing' | 'completed' | 'error' | 'sending' | 'sent';
  className?: string;
}

const statusMessages = {
  processing: 'Video is being generated...',
  error: 'Error generating video',
  sending: 'Sending video...',
  sent: 'Video sent',
  completed: 'Video completed',
} as const;

export function ProcessingPlaceholder({ status, className }: ProcessingPlaceholderProps) {
  return (
    <Card className={cn('aspect-video bg-muted flex items-center justify-center', className)}>
      <div className="text-center px-4">
        <div className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
          <Play className="h-5 w-5 md:h-6 md:w-6 text-primary" />
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">
          {statusMessages[status] || 'Video will appear here'}
        </p>
      </div>
    </Card>
  );
}