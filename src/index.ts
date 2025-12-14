export { EZHostSDK } from './main';

export type {
  ShortenUrlOptions,
  UploadFileOptions,
  CreatePasteOptions,
  ShortenerResponse,
  ShortenerRequest,
  FileUploadResponse,
  PasteResponse,
  CreatePasteRequest,
} from './types';

export { shortenUrl } from './api/shortener';
export { uploadFile } from './api/upload';
export { createPaste } from './api/paste';
