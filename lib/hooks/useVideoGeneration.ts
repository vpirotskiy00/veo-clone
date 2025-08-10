import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { mockCompletedVideo, VideoGenerationAPI } from '@/lib/api/videoGeneration';
import type { 
  VideoGenerationRequest, 
  VideoGenerationResponse 
} from '@/lib/schemas/promptSchema';

interface UseVideoGenerationOptions {
  onStatusUpdate?: (status: VideoGenerationResponse) => void;
  onSuccess?: (result: VideoGenerationResponse) => void;
  onError?: (error: Error) => void;
  enableMocking?: boolean;
}

export function useVideoGeneration(options: UseVideoGenerationOptions = {}) {
  const { onStatusUpdate, onSuccess, onError, enableMocking = true } = options;
  const queryClient = useQueryClient();
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  // Generate video mutation
  const generateVideoMutation = useMutation({
    mutationFn: async (request: VideoGenerationRequest) => {
      if (enableMocking) {
        // Mock implementation for development
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          id: crypto.randomUUID(),
          status: 'processing' as const,
          progress: 0,
          estimatedTime: 120,
        };
      }
      
      return VideoGenerationAPI.generateVideo(request);
    },
    onSuccess: (data) => {
      setCurrentVideoId(data.id);
      onStatusUpdate?.(data);
      
      if (data.status === 'completed') {
        onSuccess?.(data);
      } else if (data.status === 'processing') {
        // Start polling for status updates
        startPolling(data.id);
      }
    },
    onError: (error: Error) => {
      console.error('Video generation failed:', error);
      onError?.(error);
    },
  });

  // Poll video status
  const startPolling = useCallback(async (videoId: string) => {
    if (enableMocking) {
      // Mock polling - simulate progress updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // 5-20% progress each update
        
        const status: VideoGenerationResponse = {
          id: videoId,
          status: progress >= 100 ? 'completed' : 'processing',
          progress: Math.min(progress, 100),
          estimatedTime: Math.max(0, 120 - (progress * 1.2)),
        };

        if (progress >= 100) {
          status.videoUrl = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
          status.thumbnailUrl = 'https://via.placeholder.com/320x180/0066cc/ffffff?text=Generated+Video';
          clearInterval(interval);
          onSuccess?.(status);
        }

        onStatusUpdate?.(status);
      }, 2000);

      return () => clearInterval(interval);
    }

    // Real API polling
    try {
      const result = await VideoGenerationAPI.pollVideoStatus(
        videoId,
        onStatusUpdate,
        60, // max attempts
        5000 // 5 second interval
      );
      onSuccess?.(result);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, [enableMocking, onStatusUpdate, onSuccess, onError]);

  // Get video status query
  const videoStatusQuery = useQuery({
    queryKey: ['videoStatus', currentVideoId, enableMocking],
    queryFn: () => {
      if (!currentVideoId) return null;
      
      if (enableMocking) {
        return mockCompletedVideo();
      }
      
      return VideoGenerationAPI.getVideoStatus(currentVideoId);
    },
    enabled: !!currentVideoId,
    refetchInterval: (query) => {
      // Stop refetching if completed or failed
      return query.state.data?.status === 'processing' ? 5000 : false;
    },
  });

  // Upload reference image mutation
  const uploadImageMutation = useMutation({
    mutationFn: VideoGenerationAPI.uploadReferenceImage,
    onError: (error: Error) => {
      console.error('Image upload failed:', error);
      onError?.(error);
    },
  });

  // Generate video with all steps
  const generateVideo = useCallback(async (
    request: VideoGenerationRequest
  ): Promise<VideoGenerationResponse> => {
    try {
      return await generateVideoMutation.mutateAsync(request);
    } catch (error) {
      throw error instanceof Error ? error : new Error('Video generation failed');
    }
  }, [generateVideoMutation]);

  // Upload image helper
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    if (enableMocking) {
      // Mock image upload
      await new Promise(resolve => setTimeout(resolve, 500));
      return URL.createObjectURL(file);
    }

    const result = await uploadImageMutation.mutateAsync(file);
    return result.url;
  }, [uploadImageMutation, enableMocking]);

  return {
    // Actions
    generateVideo,
    uploadImage,
    
    // State
    isGenerating: generateVideoMutation.isPending,
    isUploading: uploadImageMutation.isPending,
    currentVideoId,
    videoStatus: videoStatusQuery.data,
    
    // Mutations
    generateVideoMutation,
    uploadImageMutation,
    videoStatusQuery,
    
    // Utils
    reset: () => {
      setCurrentVideoId(null);
      queryClient.removeQueries({ queryKey: ['videoStatus'] });
    },
  };
}