export interface ShortenUrlOptions {
  maxUrlLength?: number;
  timeout?: number;
}

export interface UploadFileOptions {
  timeout?: number;
}

export interface CreatePasteOptions {
  title?: string;
  description?: string;
  language?: string;
  timeout?: number;
}

export interface ShortenerResponse {
  success: boolean;
  message: string;
  shortendUrl: string;
  deletionUrl: string;
}

export interface ShortenerRequest {
  url: string;
}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  imageUrl?: string;
  rawUrl?: string;
  deletionUrl?: string;
  error?: string;
}

export interface PasteResponse {
  success: boolean;
  message: string;
  pasteUrl: string;
  rawUrl: string;
  deletionUrl: string;
}

export interface CreatePasteRequest {
  text: string;
  title: string;
  description: string;
  language: string;
}
