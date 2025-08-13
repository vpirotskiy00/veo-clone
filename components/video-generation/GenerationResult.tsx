'use client';

import { Download, Play, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GenerationResultProps {
  formData: {
    prompt: string;
    duration: string;
    quality: string;
    includeSound: boolean;
  };
  calculateCredits: () => number;
  onGenerateAnother: () => void;
}

export function GenerationResult({
  formData,
  calculateCredits,
  onGenerateAnother,
}: GenerationResultProps) {
  return (
    <div className='space-y-6'>
      <div className='text-center space-y-4'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
          <Sparkles className='w-8 h-8 text-green-600' />
        </div>
        <h1 className='text-2xl font-bold'>Video Generated Successfully!</h1>
        <p className='text-muted-foreground'>
          Your AI-generated video is ready for download.
        </p>
      </div>

      <Card className='max-w-2xl mx-auto'>
        <div className='p-6'>
          <div className='aspect-video bg-muted rounded-lg flex items-center justify-center mb-6'>
            <div className='text-center space-y-2'>
              <Play className='w-12 h-12 text-muted-foreground mx-auto' />
              <p className='text-sm text-muted-foreground'>Video Preview</p>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold'>Generated Video</h3>
              <p className='text-sm text-muted-foreground'>
                {formData.prompt || 'AI-generated video'}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div>
                <span className='text-muted-foreground'>Duration:</span>
                <span className='ml-2'>{formData.duration}s</span>
              </div>
              <div>
                <span className='text-muted-foreground'>Quality:</span>
                <span className='ml-2'>{formData.quality}</span>
              </div>
              <div>
                <span className='text-muted-foreground'>Sound:</span>
                <span className='ml-2'>
                  {formData.includeSound ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div>
                <span className='text-muted-foreground'>Credits Used:</span>
                <span className='ml-2'>{calculateCredits()}</span>
              </div>
            </div>

            <div className='flex space-x-2 pt-4'>
              <Button className='flex-1'>
                <Download className='w-4 h-4 mr-2' />
                Download Video
              </Button>
              <Button onClick={onGenerateAnother} variant='outline'>
                Generate Another
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}