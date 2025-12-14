import { AxiosInstance } from 'axios';
import { getErrorMessage } from '../lib/utils';
import { ShortenerResponse, ShortenerRequest, ShortenUrlOptions } from '../types';

export async function shortenUrl(
  api: AxiosInstance,
  url: string,
  options: ShortenUrlOptions = {}
): Promise<ShortenerResponse> {
  if (!url?.trim()) {
    throw new Error('URL is required and cannot be empty');
  }

  const { maxUrlLength = 2048, timeout = 5000 } = options;

  if (url.length > maxUrlLength) {
    throw new Error(`URL exceeds maximum length of ${maxUrlLength} characters`);
  }

  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL format');
  }

  const payload: ShortenerRequest = { url: url.trim() };

  try {
    const response = await api.post<ShortenerResponse>('/shortener', payload, {
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to shorten URL'));
  }
}
