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

## Standalone Functions

If you prefer not to use the SDK class, you can use the standalone functions directly:

```typescript
import { shortenUrl, createPaste, uploadFile } from 'e-zhost-js';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.e-z.host',
  headers: { key: 'YOUR_API_KEY' },
});

const result = await shortenUrl(api, 'https://example.com');
```

## Types

All types are exported for TypeScript users:

```typescript
import type {
  ShortenUrlOptions,
  UploadFileOptions,
  CreatePasteOptions,
  ShortenerResponse,
  FileUploadResponse,
  PasteResponse,
} from 'e-zhost-js';
```

## License

MIT
