export interface AuthLinkResponse {
  success: boolean;
  url: string;
  token: string;
}

export interface AuthStatusResponse {
  success?: boolean;
  // When confirmed, backend is expected to return JWT
  jwt?: string;
  // Optional convenience flags/fields if backend includes them
  authenticated?: boolean;
  user?: unknown;
  // Any other fields are permitted
  [key: string]: unknown;
}

const API_BASE_URL = 'https://frontend.aichatpro.ru';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `Auth API error ${response.status}: ${text || response.statusText}`
    );
  }
  return response.json() as Promise<T>;
}

export const AuthAPI = {
  async getAuthLink(): Promise<AuthLinkResponse> {
    return request<AuthLinkResponse>('/veo/auth/link');
  },

  async getAuthStatus(token: string): Promise<AuthStatusResponse> {
    const qs = new URLSearchParams({ token }).toString();
    return request<AuthStatusResponse>(`/veo/auth/status?${qs}`);
  },
};

export async function pollAuthStatus(
  token: string,
  options: {
    intervalMs?: number;
    timeoutMs?: number;
    onTick?: (data: AuthStatusResponse) => void;
  } = {}
): Promise<AuthStatusResponse> {
  const { intervalMs = 2500, timeoutMs = 5 * 60 * 1000, onTick } = options;
  const startedAt = Date.now();

  while (true) {
    const data = await AuthAPI.getAuthStatus(token).catch(err => {
      // Swallow transient errors during polling; rethrow if timeout exceeded
      return { error: String(err) } as AuthStatusResponse;
    });
    onTick?.(data);

    if (typeof data.jwt === 'string' && data.jwt.length > 0) {
      return data;
    }

    if (Date.now() - startedAt > timeoutMs) {
      throw new Error('Authorization timeout');
    }

    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
}
