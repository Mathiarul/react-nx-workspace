import { ApiResponse, ApiError } from '@react-demo/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(endpoint: string, config: RequestConfig): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...config.headers };

    const options: RequestInit = {
      method: config.method,
      headers,
    };

    if (config.body) {
      options.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText || 'Request failed',
          code: 'API_ERROR',
          statusCode: response.status,
        };
        throw error;
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if ((error as ApiError).statusCode) {
        throw error;
      }
      throw {
        message: 'Network error',
        code: 'NETWORK_ERROR',
        statusCode: 0,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  async put<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  async patch<T>(endpoint: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }
}

// Export a singleton instance
export const apiClient = new ApiClient(BASE_URL);

// Helper function to handle API responses
export function handleApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.message || 'API request failed');
  }
  return response.data;
}
