import { useState } from 'react';

interface FormData {
  prompt: string;
  preset: string;
  duration: string;
  quality: string;
  includeSound: boolean;
  soundStyle: string;
}

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

export function useVideoGeneration() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setStep(3);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, prompt: e.target.value }));
  };

  const handleDurationChange = (value: string) => {
    setFormData(prev => ({ ...prev, duration: value }));
  };

  const handleQualityChange = (value: string) => {
    setFormData(prev => ({ ...prev, quality: value }));
  };

  const handlePresetClick = (presetId: string) => {
    setFormData(prev => ({ ...prev, preset: presetId }));
  };

  const handleSoundToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, includeSound: e.target.checked }));
  };

  const handleSoundStyleChange = (value: string) => {
    setFormData(prev => ({ ...prev, soundStyle: value }));
  };

  const handleGenerateAnother = () => {
    setStep(1);
  };

  const calculateCredits = () => {
    const duration = durations.find(d => d.value === formData.duration);
    const quality = qualities.find(q => q.value === formData.quality);
    return (duration?.credits || 0) + (quality?.credits || 0);
  };

  return {
    step,
    isGenerating,
    progress,
    formData,
    handleGenerate,
    handlePromptChange,
    handleDurationChange,
    handleQualityChange,
    handlePresetClick,
    handleSoundToggle,
    handleSoundStyleChange,
    handleGenerateAnother,
    calculateCredits,
  };
}