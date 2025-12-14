export { EZHostSDK } from './main';

export { shortenUrl } from './api/shortener';
export { uploadFile } from './api/upload';
export { createPaste } from './api/paste';

export type {
  ShortenUrlOptions,
  UploadFileOptions,
  CreatePasteOptions,
  ShortenerRequest,
  ShortenerResponse,
  FileUploadResponse,
  PasteResponse,
  CreatePasteRequest,
} from './types';
