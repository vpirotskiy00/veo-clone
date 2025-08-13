'use client';

import { GenerationForm } from '@/components/video-generation/GenerationForm';
import { GenerationProgress } from '@/components/video-generation/GenerationProgress';
import { GenerationResult } from '@/components/video-generation/GenerationResult';
import { useVideoGeneration } from '@/hooks/useVideoGeneration';

export default function GenerateVideoPage() {
  const {
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
    resultVideoUrl: _resultVideoUrl,
  } = useVideoGeneration();

  if (step === 3) {
    return (
      <GenerationResult
        calculateCredits={calculateCredits}
        formData={formData}
        onGenerateAnother={handleGenerateAnother}
        // TODO: pass videoUrl to show preview/download once component supports it
      />
    );
  }

  if (isGenerating) {
    return <GenerationProgress progress={progress} />;
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Generate Video</h1>
        <p className='text-muted-foreground'>
          Create stunning AI-powered videos with realistic sound and effects
        </p>
      </div>

      <GenerationForm
        calculateCredits={calculateCredits}
        formData={formData}
        onDurationChange={handleDurationChange}
        onGenerate={handleGenerate}
        onImageSelect={handleImageSelect}
        onPresetClick={handlePresetClick}
        onPromptChange={handlePromptChange}
        onQualityChange={handleQualityChange}
        onSoundStyleChange={handleSoundStyleChange}
        onSoundToggle={handleSoundToggle}
      />
    </div>
  );
}
