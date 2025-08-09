'use client';

import {
  Clock,
  Download,
  Image,
  Play,
  Settings,
  Sparkles,
  Volume2,
  Wand2,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// This would normally come from the server
// export const metadata: Metadata = {
//   title: 'Generate Video - Veo 3 Dashboard',
//   description: 'Create new AI-powered videos',
// };

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

export default function GenerateVideoPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    prompt: '',
    preset: '',
    duration: '',
    quality: '1080p',
    includeSound: true,
    soundStyle: 'ambient',
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setStep(3); // Move to results
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const calculateCredits = () => {
    const duration = durations.find(d => d.value === formData.duration);
    const quality = qualities.find(q => q.value === formData.quality);
    return (duration?.credits || 0) + (quality?.credits || 0);
  };

  if (step === 3) {
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
                <Button onClick={() => setStep(1)} variant='outline'>
                  Generate Another
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isGenerating) {
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

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Generate Video</h1>
        <p className='text-muted-foreground'>
          Create stunning AI-powered videos with realistic sound and effects
        </p>
      </div>

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
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            prompt: e.target.value,
                          }))
                        }
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
                          onValueChange={value =>
                            setFormData(prev => ({ ...prev, duration: value }))
                          }
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
                          onValueChange={value =>
                            setFormData(prev => ({ ...prev, quality: value }))
                          }
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
                        onClick={() =>
                          setFormData(prev => ({ ...prev, preset: preset.id }))
                        }
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
                        onChange={e =>
                          setFormData(prev => ({
                            ...prev,
                            includeSound: e.target.checked,
                          }))
                        }
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
                          onValueChange={value =>
                            setFormData(prev => ({
                              ...prev,
                              soundStyle: value,
                            }))
                          }
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
              onClick={handleGenerate}
              size='lg'
            >
              <Sparkles className='w-4 h-4 mr-2' />
              Generate Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
