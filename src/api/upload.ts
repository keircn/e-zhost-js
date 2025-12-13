import { AxiosInstance } from 'axios';
import { Readable } from 'stream';
import { ReadStream } from 'fs';
import { basename } from 'path';
import { getErrorMessage, MIME_TYPES } from '../lib/utils';
import { FileUploadResponse } from '../types';

const DEFAULT_FILENAME = 'upload.dat';

function getMimeType(file: Blob | File | Buffer, filename?: string): string {
  if ((file instanceof File || file instanceof Blob) && file.type) {
    return file.type;
  }

  if (filename) {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    if (extension in MIME_TYPES) {
      return MIME_TYPES[extension];
    }
  }

  return 'application/octet-stream';
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer | string) =>
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    );
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

function getFilenameFromStream(stream: ReadStream): string {
  const filePath = stream.path;
  if (typeof filePath === 'string') {
    return basename(filePath);
  }
  if (Buffer.isBuffer(filePath)) {
    return basename(filePath.toString());
  }
  return DEFAULT_FILENAME;
}

async function processFileInput(
  file: Buffer | Blob | File | Readable,
  filename?: string
): Promise<{ buffer: Buffer; filename: string } | FileUploadResponse> {
  let fileBuffer: Buffer;
  let resolvedFilename = filename;

  if (file instanceof Readable) {
    fileBuffer = await streamToBuffer(file);
    if (!resolvedFilename) {
      resolvedFilename =
        file instanceof ReadStream ? getFilenameFromStream(file) : DEFAULT_FILENAME;
    }
  } else if (file instanceof File) {
    fileBuffer = Buffer.from(await file.arrayBuffer());
    resolvedFilename = resolvedFilename || file.name;
  } else if (file instanceof Blob) {
    fileBuffer = Buffer.from(await file.arrayBuffer());
    resolvedFilename = resolvedFilename || DEFAULT_FILENAME;
  } else if (Buffer.isBuffer(file)) {
    fileBuffer = file;
    resolvedFilename = resolvedFilename || DEFAULT_FILENAME;
  } else {
    return { success: false, message: 'Invalid file type provided', error: 'Invalid file type' };
  }

  return { buffer: fileBuffer, filename: resolvedFilename || DEFAULT_FILENAME };
}

interface UploadFileOptions {
  timeout?: number;
}

export async function uploadFile(
  api: AxiosInstance,
  file: Buffer | Blob | File | Readable,
  filename?: string,
  options: UploadFileOptions = {}
): Promise<FileUploadResponse> {
  if (!file) {
    return { success: false, message: 'File is required', error: 'File is required' };
  }

  let result: { buffer: Buffer; filename: string } | FileUploadResponse;

  try {
    result = await processFileInput(file, filename);
  } catch (error) {
    const err = error as Error;
    return { success: false, message: 'Failed to process file input', error: err.message };
  }

  if ('success' in result) {
    return result;
  }

  const { buffer: fileBuffer, filename: resolvedFilename } = result;

  const mimeType = getMimeType(
    new Blob([fileBuffer], { type: 'application/octet-stream' }),
    resolvedFilename
  );

  if (mimeType.startsWith('text/')) {
    return {
      success: false,
      message: 'Text files should be uploaded using the createPaste method instead of uploadFile',
      error: 'Invalid file type for uploadFile (text file)',
    };
  }

  const { timeout = 30000 } = options;
  const formData = new FormData();
  const fileToUpload = new Blob([fileBuffer], { type: mimeType });
  formData.append('file', fileToUpload, resolvedFilename);

  try {
    const response = await api.post<FileUploadResponse>('/files', formData, {
      timeout,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data?.success) {
      return response.data;
    }

    return {
      success: false,
      message: response.data?.message || 'Upload failed due to an API error',
      error: response.data?.message || 'API indicated failure',
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, 'Failed to upload file'),
      error: getErrorMessage(error, 'Failed to upload file'),
    };
  }
}
