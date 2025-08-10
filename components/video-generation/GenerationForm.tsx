'use client';

import { Clock, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormData {
  prompt: string;
  preset: string;
  duration: string;
  quality: string;
  includeSound: boolean;
  soundStyle: string;
}

interface GenerationFormProps {
  formData: FormData;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDurationChange: (value: string) => void;
  onQualityChange: (value: string) => void;
  onPresetClick: (presetId: string) => void;
  onSoundToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSoundStyleChange: (value: string) => void;
  onGenerate: () => void;
  calculateCredits: () => number;
}

const presets = [
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Professional film-quality visuals',
    icon: '🎬',
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Landscapes and natural environments',
    icon: '🌲',
  },
  {
    id: 'urban',
    name: 'Urban',
    description: 'City scenes and modern environments',
    icon: '🏙️',
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Artistic and creative visuals',
    icon: '🎨',
  },
];

const durations = [
  { value: '15', label: '15 seconds', credits: 5 },
  { value: '30', label: '30 seconds', credits: 8 },
  { value: '60', label: '1 minute', credits: 12 },
  { value: '120', label: '2 minutes', credits: 20 },
];

const qualities = [
  { value: '720p', label: '720p HD', credits: 0 },
  { value: '1080p', label: '1080p Full HD', credits: 3 },
  { value: '4k', label: '4K Ultra HD', credits: 8 },
];

export function GenerationForm({
  formData,
  onPromptChange,
  onDurationChange,
  onQualityChange,
  onPresetClick,
  onSoundToggle,
  onSoundStyleChange,
  onGenerate,
  calculateCredits,
}: GenerationFormProps) {
  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Credits Info */}
      <Card className='p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Sparkles className='w-5 h-5 text-blue-600' />
            <span className='font-medium'>Generation Credits</span>
          </div>
          <div className='text-right'>
            <div className='font-semibold'>42 remaining</div>
            <div className='text-sm text-muted-foreground'>
              This generation will use {calculateCredits()} credits
            </div>
          </div>
        </div>
      </Card>

      <div className='grid lg:grid-cols-3 gap-8'>
        {/* Form */}
        <div className='lg:col-span-2 space-y-6'>
          <Card className='p-6'>
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-semibold mb-4'>Video Details</h2>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='prompt'>Video Description</Label>
                    <Textarea
                      className='min-h-[100px]'
                      id='prompt'
                      onChange={onPromptChange}
                      placeholder='Describe the video you want to generate... (e.g., "A peaceful sunset over a calm lake with gentle ripples")'
                      value={formData.prompt}
                    />
                    <p className='text-xs text-muted-foreground'>
                      Be specific and descriptive for best results
                    </p>
                  </div>

                  <div className='grid md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='duration'>Duration</Label>
                      <Select
                        onValueChange={onDurationChange}
                        value={formData.duration}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select duration' />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map(duration => (
                            <SelectItem
                              key={duration.value}
                              value={duration.value}
                            >
                              <div className='flex justify-between items-center w-full'>
                                <span>{duration.label}</span>
                                <span className='text-xs text-muted-foreground ml-2'>
                                  {duration.credits} credits
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='quality'>Quality</Label>
                      <Select
                        onValueChange={onQualityChange}
                        value={formData.quality}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {qualities.map(quality => (
                            <SelectItem
                              key={quality.value}
                              value={quality.value}
                            >
                              <div className='flex justify-between items-center w-full'>
                                <span>{quality.label}</span>
                                {quality.credits > 0 && (
                                  <span className='text-xs text-muted-foreground ml-2'>
                                    +{quality.credits} credits
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='text-lg font-medium mb-4'>Style Presets</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                  {presets.map(preset => (
                    <Card
                      className={cn(
                        'p-4 cursor-pointer transition-colors hover:bg-accent',
                        formData.preset === preset.id &&
                          'bg-accent border-primary'
                      )}
                      key={preset.id}
                      onClick={() => onPresetClick(preset.id)}
                    >
                      <div className='text-center space-y-2'>
                        <div className='text-2xl'>{preset.icon}</div>
                        <div className='font-medium text-sm'>
                          {preset.name}
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          {preset.description}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='text-lg font-medium mb-4'>Sound Options</h3>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <input
                      checked={formData.includeSound}
                      className='rounded'
                      id='includeSound'
                      onChange={onSoundToggle}
                      type='checkbox'
                    />
                    <Label htmlFor='includeSound'>
                      Include AI-generated sound effects
                    </Label>
                  </div>

                  {formData.includeSound && (
                    <div className='space-y-2 ml-6'>
                      <Label htmlFor='soundStyle'>Sound Style</Label>
                      <Select
                        onValueChange={onSoundStyleChange}
                        value={formData.soundStyle}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='ambient'>Ambient</SelectItem>
                          <SelectItem value='dramatic'>Dramatic</SelectItem>
                          <SelectItem value='upbeat'>Upbeat</SelectItem>
                          <SelectItem value='peaceful'>Peaceful</SelectItem>
                          <SelectItem value='industrial'>
                            Industrial
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Preview & Generate */}
        <div className='space-y-6'>
          <Card className='p-6'>
            <h3 className='font-medium mb-4'>Generation Summary</h3>
            <div className='space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Duration:</span>
                <span>
                  {formData.duration ? `${formData.duration}s` : 'Not set'}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Quality:</span>
                <span>{formData.quality}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Sound:</span>
                <span>{formData.includeSound ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Style:</span>
                <span>{formData.preset || 'Default'}</span>
              </div>
              <div className='border-t pt-2 mt-4'>
                <div className='flex justify-between font-medium'>
                  <span>Credits Required:</span>
                  <span>{calculateCredits()}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className='p-6'>
            <h3 className='font-medium mb-4'>Estimated Time</h3>
            <div className='flex items-center space-x-2'>
              <Clock className='w-4 h-4 text-muted-foreground' />
              <span className='text-sm'>2-5 minutes</span>
            </div>
          </Card>

          <Button
            className='w-full'
            disabled={!formData.prompt || !formData.duration}
            onClick={onGenerate}
            size='lg'
          >
            <Sparkles className='w-4 h-4 mr-2' />
            Generate Video
          </Button>
        </div>
      </div>
    </div>
  );
}