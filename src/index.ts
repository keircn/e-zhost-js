export { EZHostSDK } from './main';

export { shortenUrl } from './api/shortener';
export { uploadFile } from './api/upload';
export { createPaste } from './api/paste';
export { deleteFile, deletePaste, deleteShortener } from './api/delete';

export type {
  ShortenUrlOptions,
  UploadFileOptions,
  CreatePasteOptions,
  DeleteOptions,
  ShortenerRequest,
  ShortenerResponse,
  ShortenerDocument,
  FileUploadResponse,
  PasteResponse,
  PasteDocument,
  UploaderInfo,
  CreatePasteRequest,
  DeleteResponse,
} from './types';
