import { useEffect, useRef, useState } from 'react';

import { VideoGenerationAPI } from '@/lib/api/videoGeneration';
import type { VideoGenerationRequest } from '@/lib/schemas/promptSchema';

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
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [resultVideoUrl, setResultVideoUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    prompt: '',
    preset: '',
    duration: '',
    quality: '1080p',
    includeSound: true,
    soundStyle: 'ambient',
  });

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setProgress(0);

      // Smooth visual progress while we poll backend
      progressTimerRef.current = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 95));
      }, 300);

      // Send generation request to backend
      const payload: VideoGenerationRequest = {
        prompt: formData.prompt || 'video',
        image_base64: imageBase64,
      };
      const gen = await VideoGenerationAPI.generateVideo(payload);

      // Poll until finished
      const final = await VideoGenerationAPI.pollVideoStatus(gen.id);
      if (final.videoUrl) setResultVideoUrl(final.videoUrl);

      // Finish
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      setProgress(100);
      setIsGenerating(false);
      setStep(3);
    } catch (error) {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      setIsGenerating(false);
      setProgress(0);
      // In a real UI we would show a toast/error

      console.error('Generation failed', error);
    }
  };

  const handleImageSelect = async (file: File | null) => {
    if (!file) {
      setImageBase64(null);
      return;
    }
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
    setImageBase64(base64);
  };

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

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
    handleImageSelect,
    resultVideoUrl,
  };
}
