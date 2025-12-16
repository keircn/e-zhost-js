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
  DeleteResponse,
  DeleteOptions,
} from './types';
import { shortenUrl } from './api/shortener';
import { uploadFile } from './api/upload';
import { createPaste } from './api/paste';
import { deleteFile, deletePaste, deleteShortener } from './api/delete';

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

  /**
   * Delete a file using its deletion URL or deletion key.
   * The deletion URL is returned when uploading a file.
   * @param deletionUrlOrKey - The full deletion URL or just the deletion key
   * @param options - Optional configuration
   */
  async deleteFile(deletionUrlOrKey: string, options?: DeleteOptions): Promise<DeleteResponse> {
    return deleteFile(this.api, deletionUrlOrKey, options);
  }

  /**
   * Delete a paste using its deletion URL or deletion key.
   * The deletion URL is returned when creating a paste.
   * @param deletionUrlOrKey - The full deletion URL or just the deletion key
   * @param options - Optional configuration
   */
  async deletePaste(deletionUrlOrKey: string, options?: DeleteOptions): Promise<DeleteResponse> {
    return deletePaste(this.api, deletionUrlOrKey, options);
  }

  /**
   * Delete a shortened URL using its deletion URL or deletion key.
   * The deletion URL is returned when shortening a URL.
   * @param deletionUrlOrKey - The full deletion URL or just the deletion key
   * @param options - Optional configuration
   */
  async deleteShortener(
    deletionUrlOrKey: string,
    options?: DeleteOptions
  ): Promise<DeleteResponse> {
    return deleteShortener(this.api, deletionUrlOrKey, options);
  }
}
