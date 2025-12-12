export { EZHostSDK } from './main';

export type {
  ShortenerResponse,
  ShortenerRequest,
  FileUploadResponse,
  PasteResponse,
  CreatePasteRequest,
} from './types';

export { shortenUrl } from './routes/shortener';
export { uploadFile } from './routes/upload';
export { createPaste } from './routes/paste';
