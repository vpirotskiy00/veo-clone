'use client';

import { Image, Settings, Sparkles, Volume2, Wand2 } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface GenerationProgressProps {
  progress: number;
}

export function GenerationProgress({ progress }: GenerationProgressProps) {
  return (
    <div className='space-y-6'>
      <div className='text-center space-y-4'>
        <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse'>
          <Wand2 className='w-8 h-8 text-blue-600' />
        </div>
        <h1 className='text-2xl font-bold'>Generating Your Video</h1>
        <p className='text-muted-foreground'>
          Please wait while we create your AI-powered video.
        </p>
      </div>

      <Card className='max-w-2xl mx-auto'>
        <div className='p-6 space-y-6'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress className='h-2' value={progress} />
          </div>

          <div className='space-y-4 text-sm text-muted-foreground'>
            <div className='flex items-center space-x-2'>
              <Sparkles
                className={cn('w-4 h-4', progress > 20 && 'text-green-500')}
              />
              <span>Processing prompt...</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Image
                aria-label='Visual elements'
                className={cn('w-4 h-4', progress > 40 && 'text-green-500')}
              />
              <span>Generating visual elements...</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Volume2
                className={cn('w-4 h-4', progress > 70 && 'text-green-500')}
              />
              <span>Adding sound effects...</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Settings
                className={cn('w-4 h-4', progress > 90 && 'text-green-500')}
              />
              <span>Finalizing video...</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}