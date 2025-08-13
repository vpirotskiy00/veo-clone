import {
  VideoGenerationRequest,
  VideoGenerationResponse,
  videoGenerationResponseSchema,
} from '@/lib/schemas/promptSchema';

const API_BASE_URL = 'https://frontend.aichatpro.ru';

export class VideoGenerationAPI {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async generateVideo(
    request: VideoGenerationRequest
  ): Promise<VideoGenerationResponse> {
    try {
      const response = await this.makeRequest<VideoGenerationResponse>(
        '/api/v1/video/generate',
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );

      // Validate response with Zod
      return videoGenerationResponseSchema.parse(response);
    } catch (error) {
      console.error('Video generation failed:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to generate video'
      );
    }
  }

  static async getVideoStatus(videoId: string): Promise<VideoGenerationResponse> {
    try {
      const response = await this.makeRequest<VideoGenerationResponse>(
        `/api/v1/video/status/${videoId}`
      );

      return videoGenerationResponseSchema.parse(response);
    } catch (error) {
      console.error('Failed to get video status:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to get video status'
      );
    }
  }

  static async uploadReferenceImage(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/api/v1/upload/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
    }
  }

  static async getAuthStatus(): Promise<{ authenticated: boolean; user?: unknown }> {
    try {
      return await this.makeRequest<{
        authenticated: boolean;
        user?: unknown;
      }>('/veo/auth/status');
    } catch (error) {
      console.error('Auth status check failed:', error);
      return { authenticated: false };
    }
  }

  // Poll video status until completion
  static async pollVideoStatus(
    videoId: string,
    onUpdate?: (status: VideoGenerationResponse) => void,
    maxAttempts = 60, // 5 minutes with 5s intervals
    interval = 5000
  ): Promise<VideoGenerationResponse> {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const poll = async () => {
        try {
          const status = await this.getVideoStatus(videoId);
          
          if (onUpdate) {
            onUpdate(status);
          }

          if (status.status === 'completed') {
            resolve(status);
            return;
          }

          if (status.status === 'failed') {
            reject(new Error(status.error || 'Video generation failed'));
            return;
          }

          attempts++;
          if (attempts >= maxAttempts) {
            reject(new Error('Video generation timeout'));
            return;
          }

          setTimeout(poll, interval);
        } catch (error) {
          reject(error);
        }
      };

      poll();
    });
  }
}

// Utility functions for mocking during development
export const mockVideoResponse = (): VideoGenerationResponse => ({
  id: crypto.randomUUID(),
  status: 'processing',
  progress: Math.floor(Math.random() * 100),
  estimatedTime: 30 + Math.floor(Math.random() * 60),
});

export const mockCompletedVideo = (): VideoGenerationResponse => ({
  id: crypto.randomUUID(),
  status: 'completed',
  videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  thumbnailUrl: 'https://via.placeholder.com/320x180/0066cc/ffffff?text=Generated+Video',
  progress: 100,
});