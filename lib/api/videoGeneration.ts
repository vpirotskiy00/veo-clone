import {
  VideoGenerationRequest,
  VideoGenerationResponse,
} from '@/lib/schemas/promptSchema';

const API_BASE_URL = 'https://frontend.aichatpro.ru';

function getJwt(): string | null {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('veo_jwt');
    }
    return null;
  } catch {
    return null;
  }
}

export class VideoGenerationAPI {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const jwt = getJwt();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        ...options.headers,
      },
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
      // Map our request shape to backend expected payload
      const body = {
        prompt: request.prompt,
        // Currently we do not collect image; backend accepts null
        image_base64: null as string | null,
      };

      const resp = await this.makeRequest<{
        success: boolean;
        task_id: number;
      }>('/veo/video/generate', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (!resp.success || typeof resp.task_id !== 'number') {
        throw new Error('Unexpected generate response');
      }

      // Adapt to our internal response contract
      return {
        id: String(resp.task_id),
        status: 'processing',
        progress: 0,
      } satisfies VideoGenerationResponse;
    } catch (error) {
      console.error('Video generation failed:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to generate video'
      );
    }
  }

  static async getVideoStatus(
    videoId: string
  ): Promise<VideoGenerationResponse> {
    try {
      const resp = await this.makeRequest<{
        success: boolean;
        status: 'in queue' | 'processing' | 'finished' | 'failed';
        task_id: number;
        video_url?: string;
      }>(`/veo/video/status/${videoId}`);

      if (!resp.success) {
        throw new Error('Status request failed');
      }

      const mappedStatus =
        resp.status === 'finished'
          ? 'completed'
          : resp.status === 'failed'
            ? 'failed'
            : 'processing';

      return {
        id: String(resp.task_id),
        status: mappedStatus as VideoGenerationResponse['status'],
        videoUrl: resp.video_url,
        progress: mappedStatus === 'completed' ? 100 : undefined,
      };
    } catch (error) {
      console.error('Failed to get video status:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to get video status'
      );
    }
  }

  static async getAuthStatus(): Promise<{
    authenticated: boolean;
    user?: unknown;
  }> {
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

  static async pollVideoStatus(
    videoId: string,
    onUpdate?: (status: VideoGenerationResponse) => void,
    maxAttempts = 60,
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
  thumbnailUrl:
    'https://via.placeholder.com/320x180/0066cc/ffffff?text=Generated+Video',
  progress: 100,
});
