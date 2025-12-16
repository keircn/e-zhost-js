import { AxiosInstance } from 'axios';
import { getErrorMessage } from '../lib/utils';
import { DeleteResponse, DeleteOptions } from '../types';

/**
 * Extracts the deletion key from a deletion URL.
 */
function extractDeletionKey(deletionUrl: string): string | null {
  try {
    const url = new URL(deletionUrl);
    return url.searchParams.get('key');
  } catch {
    return deletionUrl;
  }
}

/**
 * Delete a file using its deletion URL or deletion key.
 * @param api - Axios instance configured with the API key
 * @param deletionUrlOrKey - The full deletion URL or just the deletion key
 * @param options - Optional configuration
 * @returns Promise resolving to the deletion response
 */
export async function deleteFile(
  api: AxiosInstance,
  deletionUrlOrKey: string,
  options: DeleteOptions = {}
): Promise<DeleteResponse> {
  if (!deletionUrlOrKey?.trim()) {
    return {
      success: false,
      message: 'Deletion URL or key is required',
      error: 'Missing deletion key',
    };
  }

  const key = extractDeletionKey(deletionUrlOrKey);
  if (!key) {
    return {
      success: false,
      message: 'Invalid deletion URL or key',
      error: 'Invalid deletion key format',
    };
  }

  const { timeout = 10000 } = options;

  try {
    const response = await api.get<DeleteResponse>('/files/delete', {
      timeout, params: { key },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to delete file'),
      error: getErrorMessage(error, 'Failed to delete file'),
    };
  }
}

/**
 * Delete a paste using its deletion URL or deletion key.
 * @param api - Axios instance configured with the API key
 * @param deletionUrlOrKey - The full deletion URL or just the deletion key
 * @param options - Optional configuration
 * @returns Promise resolving to the deletion response
 */
export async function deletePaste(
  api: AxiosInstance,
  deletionUrlOrKey: string,
  options: DeleteOptions = {}
): Promise<DeleteResponse> {
  if (!deletionUrlOrKey?.trim()) {
    return {
      success: false,
      message: 'Deletion URL or key is required',
      error: 'Missing deletion key',
    };
  }

  const key = extractDeletionKey(deletionUrlOrKey);
  if (!key) {
    return {
      success: false,
      message: 'Invalid deletion URL or key',
      error: 'Invalid deletion key format',
    };
  }

  const { timeout = 10000 } = options;

  try {
    const response = await api.get<DeleteResponse>('/paste/delete', {
      timeout,
      params: { key },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to delete paste'),
      error: getErrorMessage(error, 'Failed to delete paste'),
    };
  }
}

/**
 * Delete a shortened URL using its deletion URL or deletion key.
 * @param api - Axios instance configured with the API key
 * @param deletionUrlOrKey - The full deletion URL or just the deletion key
 * @param options - Optional configuration
 * @returns Promise resolving to the deletion response
 */
export async function deleteShortener(
  api: AxiosInstance,
  deletionUrlOrKey: string,
  options: DeleteOptions = {}
): Promise<DeleteResponse> {
  if (!deletionUrlOrKey?.trim()) {
    return {
      success: false,
      message: 'Deletion URL or key is required',
      error: 'Missing deletion key',
    };
  }

  const key = extractDeletionKey(deletionUrlOrKey);
  if (!key) {
    return {
      success: false,
      message: 'Invalid deletion URL or key',
      error: 'Invalid deletion key format',
    };
  }

  const { timeout = 10000 } = options;

  try {
    const response = await api.get<DeleteResponse>('/shortener/delete', {
      timeout,
      params: { key },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to delete shortened URL'),
      error: getErrorMessage(error, 'Failed to delete shortened URL'),
    };
  }
}
