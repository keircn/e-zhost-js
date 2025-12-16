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

export interface DeleteOptions {
  timeout?: number;
}

export interface UploaderInfo {
  uuid: string;
  username: string;
}

export interface PasteDocument {
  pasteId: string;
  text: string;
  language: string;
  title: string;
  description: string;
  anonymous: boolean;
  onetime: boolean;
  deletionKey: string;
  timestamp: string;
  uploader: UploaderInfo;
  domain: string;
  userOnlyDomain: boolean;
}

export interface ShortenerDocument {
  shortId: string;
  destination: string;
  deletionKey: string;
  timestamp: string;
  user: string;
}

export interface ShortenerResponse {
  success: boolean;
  message?: string;
  shortendUrl: string;
  deletionUrl: string;
  document?: ShortenerDocument;
}

export interface ShortenerRequest {
  url: string;
}

export interface FileUploadResponse {
  success: boolean;
  message?: string;
  imageUrl?: string;
  rawUrl?: string;
  deletionUrl?: string;
  error?: string;
}

export interface PasteResponse {
  success: boolean;
  message?: string;
  pasteUrl: string;
  rawUrl?: string;
  deletionUrl: string;
  document?: PasteDocument;
}

export interface CreatePasteRequest {
  text: string;
  title: string;
  description: string;
  language: string;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  error?: string;
}
