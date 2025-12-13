import axios, { AxiosInstance } from 'axios';
import { Readable } from 'stream';
import { BASE_URL } from './lib/utils';
import { ShortenerResponse, FileUploadResponse, PasteResponse } from './types';
import { shortenUrl } from './api/shortener';
import { uploadFile } from './api/upload';
import { createPaste } from './api/paste';

export class EZHostSDK {
  private api: AxiosInstance;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required to initialize the SDK');
    }

    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        key: apiKey,
      },
    });
  }

  async shortenUrl(
    url: string,
    options?: { maxUrlLength?: number; timeout?: number }
  ): Promise<ShortenerResponse> {
    try {
      return await shortenUrl(this.api, url, options);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to shorten URL: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async uploadFile(
    file: Buffer | Blob | File | Readable,
    filename?: string,
    options?: { timeout?: number }
  ): Promise<FileUploadResponse> {
    return await uploadFile(this.api, file, filename, options);
  }

  async createPaste(
    text: string,
    options?: {
      title?: string;
      description?: string;
      language?: string;
      timeout?: number;
    }
  ): Promise<PasteResponse> {
    try {
      return await createPaste(this.api, text, options);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to create paste: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }
}
