import axios, { AxiosInstance } from 'axios';
import { Readable } from 'stream';
import { BASE_URL } from './lib/utils';
import {
  ShortenerResponse,
  FileUploadResponse,
  PasteResponse,
  ShortenUrlOptions,
  UploadFileOptions,
  CreatePasteOptions,
} from './types';
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

  async shortenUrl(url: string, options?: ShortenUrlOptions): Promise<ShortenerResponse> {
    return shortenUrl(this.api, url, options);
  }

  async uploadFile(
    file: Buffer | Blob | File | Readable,
    filename?: string,
    options?: UploadFileOptions
  ): Promise<FileUploadResponse> {
    return uploadFile(this.api, file, filename, options);
  }

  async createPaste(text: string, options?: CreatePasteOptions): Promise<PasteResponse> {
    return createPaste(this.api, text, options);
  }
}
