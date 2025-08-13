import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import {
  mockCompletedVideo,
  VideoGenerationAPI,
} from '@/lib/api/videoGeneration';
import type {
  VideoGenerationRequest,
  VideoGenerationResponse,
} from '@/lib/schemas/promptSchema';

interface UseVideoGenerationOptions {
  onStatusUpdate?: (status: VideoGenerationResponse) => void;
  onSuccess?: (result: VideoGenerationResponse) => void;
  onError?: (error: Error) => void;
  enableMocking?: boolean;
}

// Helper function for mock polling
const createMockPolling = (
  videoId: string,
  onStatusUpdate?: (status: VideoGenerationResponse) => void,
  onSuccess?: (result: VideoGenerationResponse) => void
) => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;

    const status: VideoGenerationResponse = {
      id: videoId,
      status: progress >= 100 ? 'completed' : 'processing',
      progress: Math.min(progress, 100),
      estimatedTime: Math.max(0, 120 - progress * 1.2),
    };

    if (progress >= 100) {
      status.videoUrl =
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
      status.thumbnailUrl =
        'https://via.placeholder.com/320x180/0066cc/ffffff?text=Generated+Video';
      clearInterval(interval);
      onSuccess?.(status);
    }

    onStatusUpdate?.(status);
  }, 2000);

  return () => clearInterval(interval);
};

// Custom hook for video polling logic
function useVideoPolling(
  enableMocking: boolean,
  onStatusUpdate?: (status: VideoGenerationResponse) => void,
  onSuccess?: (result: VideoGenerationResponse) => void,
  onError?: (error: Error) => void
) {
  return useCallback(
    async (videoId: string) => {
      if (enableMocking) {
        return createMockPolling(videoId, onStatusUpdate, onSuccess);
      }

      try {
        const result = await VideoGenerationAPI.pollVideoStatus(
          videoId,
          onStatusUpdate,
          60,
          5000
        );
        onSuccess?.(result);
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Unknown error'));
      }
    },
    [enableMocking, onStatusUpdate, onSuccess, onError]
  );
}

export function useVideoGeneration(options: UseVideoGenerationOptions = {}) {
  const { onStatusUpdate, onSuccess, onError, enableMocking = true } = options;
  const queryClient = useQueryClient();
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  const startPolling = useVideoPolling(
    enableMocking,
    onStatusUpdate,
    onSuccess,
    onError
  );

  const generateVideoMutation = useMutation({
    mutationFn: async (request: VideoGenerationRequest) => {
      if (enableMocking) {
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
    onSuccess: data => {
      setCurrentVideoId(data.id);
      onStatusUpdate?.(data);
      if (data.status === 'completed') onSuccess?.(data);
      else if (data.status === 'processing') startPolling(data.id);
    },
    onError: (error: Error) => {
      console.error('Video generation failed:', error);
      onError?.(error);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: VideoGenerationAPI.uploadReferenceImage,
    onError: (error: Error) => {
      console.error('Image upload failed:', error);
      onError?.(error);
    },
  });

  const videoStatusQuery = useQuery({
    queryKey: ['videoStatus', currentVideoId, enableMocking],
    queryFn: () =>
      !currentVideoId
        ? null
        : enableMocking
          ? mockCompletedVideo()
          : VideoGenerationAPI.getVideoStatus(currentVideoId),
    enabled: !!currentVideoId,
    refetchInterval: query =>
      query.state.data?.status === 'processing' ? 5000 : false,
  });

  const { mutateAsync: generateVideoAsync } = generateVideoMutation;
  const { mutateAsync: uploadImageAsync } = uploadImageMutation;

  const generateVideo = useCallback(
    async (
      request: VideoGenerationRequest
    ): Promise<VideoGenerationResponse> => {
      try {
        return await generateVideoAsync(request);
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error('Video generation failed');
      }
    },
    [generateVideoAsync]
  );

  const uploadImage = useCallback(
    async (file: File): Promise<string> => {
      if (enableMocking) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return URL.createObjectURL(file);
      }
      const result = await uploadImageAsync(file);
      return result.url;
    },
    [uploadImageAsync, enableMocking]
  );

  return {
    generateVideo,
    uploadImage,
    isGenerating: generateVideoMutation.isPending,
    isUploading: uploadImageMutation.isPending,
    currentVideoId,
    videoStatus: videoStatusQuery.data,
    generateVideoMutation,
    uploadImageMutation,
    videoStatusQuery,
    reset: () => {
      setCurrentVideoId(null);
      queryClient.removeQueries({ queryKey: ['videoStatus'] });
    },
  };
}
