import { AxiosInstance } from 'axios';
import { getErrorMessage } from '../lib/utils';
import { PasteResponse, CreatePasteRequest, CreatePasteOptions } from '../types';

export async function createPaste(
  api: AxiosInstance,
  text: string,
  options: CreatePasteOptions = {}
): Promise<PasteResponse> {
  if (!text?.trim()) {
    throw new Error('Paste text is required and cannot be empty');
  }

  const { timeout = 10000, ...pasteOptions } = options;

  const payload: CreatePasteRequest = {
    text: text.trim(),
    title: pasteOptions.title?.trim() || 'Untitled Paste',
    description: pasteOptions.description?.trim() || 'Created with E-Z SDK',
    language: pasteOptions.language?.trim() || 'text',
  };

  try {
    const response = await api.post<PasteResponse>('/paste', payload, { timeout });

    if (response.data?.success) {
      return response.data;
    }
    throw new Error(`Invalid response: ${JSON.stringify(response.data)}`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Invalid response')) {
      throw error;
    }
    throw new Error(getErrorMessage(error, 'Failed to create paste'));
  }
}
