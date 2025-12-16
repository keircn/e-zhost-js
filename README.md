# e-zhost-js

Unofficial API wrapper for the E-Z.host API

## Installation

```bash
npm install e-zhost-js

# or

yarn add e-zhost-js

# or

pnpm add e-zhost-js
```

## Usage

### Using the SDK Class

The `EZHostSDK` class provides a convenient wrapper around all API methods:

```typescript
import { EZHostSDK } from 'e-zhost-js';

const client = new EZHostSDK('YOUR_API_KEY');
```

### URL Shortener

```typescript
const result = await client.shortenUrl('https://example.com');
console.log('Shortened URL:', result.shortendUrl);
console.log('Deletion URL:', result.deletionUrl);
```

With options:

```typescript
const result = await client.shortenUrl('https://example.com', {
  maxUrlLength: 2048,
  timeout: 5000,
});
```

### Create Paste

```typescript
const result = await client.createPaste('console.log("Hello World!")', {
  title: 'Example Code',
  description: 'A simple hello world example',
  language: 'javascript',
});
console.log('Paste URL:', result.pasteUrl);
console.log('Raw URL:', result.rawUrl);
```

### File Upload

```typescript
import { createReadStream } from 'fs';

const fileStream = createReadStream('./image.jpg');
const result = await client.uploadFile(fileStream, 'image.jpg');

if (result.success) {
  console.log('Image URL:', result.imageUrl);
  console.log('Raw URL:', result.rawUrl);
  console.log('Deletion URL:', result.deletionUrl);
} else {
  console.error('Upload failed:', result.message);
}
```

You can also upload from a Buffer:

```typescript
const buffer = await fs.promises.readFile('./image.png');
const result = await client.uploadFile(buffer, 'image.png');
```

### Deleting Resources

You can delete files, pastes, and shortened URLs using either the full deletion URL or just the deletion key:

#### Delete a File

```typescript
const result = await client.deleteFile(uploadResult.deletionUrl);
console.log(result.message);
```

#### Delete a Paste

```typescript
const result = await client.deletePaste(pasteResult.deletionUrl);
console.log(result.message);
```

#### Delete a Shortened URL

```typescript
const result = await client.deleteShortener(shortenerResult.deletionUrl);
console.log(result.message);
```

## Standalone Functions

If you prefer not to use the SDK class, you can use the standalone functions directly:

```typescript
import {
  shortenUrl,
  createPaste,
  uploadFile,
  deleteFile,
  deletePaste,
  deleteShortener,
} from 'e-zhost-js';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.e-z.host',
  headers: { key: 'YOUR_API_KEY' },
});

const result = await shortenUrl(api, 'https://example.com');

await deleteShortener(api, result.deletionUrl);
```

## Types

All types are exported for TypeScript users:

```typescript
import type {
  ShortenUrlOptions,
  UploadFileOptions,
  CreatePasteOptions,
  DeleteOptions,
  ShortenerResponse,
  FileUploadResponse,
  PasteResponse,
  DeleteResponse,
  ShortenerDocument,
  PasteDocument,
  UploaderInfo,
  ShortenerRequest,
  CreatePasteRequest,
} from 'e-zhost-js';
```

## API Reference

### EZHostSDK Methods

| Method                                        | Description             |
| --------------------------------------------- | ----------------------- |
| `shortenUrl(url, options?)`                   | Shorten a URL           |
| `createPaste(text, options?)`                 | Create a text paste     |
| `uploadFile(file, filename?, options?)`       | Upload a file           |
| `deleteFile(deletionUrlOrKey, options?)`      | Delete an uploaded file |
| `deletePaste(deletionUrlOrKey, options?)`     | Delete a paste          |
| `deleteShortener(deletionUrlOrKey, options?)` | Delete a shortened URL  |

### Response Types

#### ShortenerResponse

- `success`: boolean
- `shortendUrl`: string - The shortened URL
- `deletionUrl`: string - URL to delete the shortened link
- `document?`: ShortenerDocument - Additional metadata

#### PasteResponse

- `success`: boolean
- `pasteUrl`: string - URL to view the paste
- `rawUrl?`: string - URL to view raw paste content
- `deletionUrl`: string - URL to delete the paste
- `document?`: PasteDocument - Additional metadata including uploader info

#### FileUploadResponse

- `success`: boolean
- `imageUrl?`: string - Public URL for viewing the file
- `rawUrl?`: string - Direct CDN URL
- `deletionUrl?`: string - URL to delete the file

#### DeleteResponse

- `success`: boolean
- `message`: string - Success or error message

## License

MIT
