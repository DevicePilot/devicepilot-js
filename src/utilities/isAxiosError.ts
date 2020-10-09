import { AxiosError } from 'axios';

export function isAxiosError(error: unknown): error is AxiosError {
  if (typeof error !== 'object' || !error) return false;
  return !!(error as { isAxiosError?: boolean }).isAxiosError;
}

export function formatAxiosError(header: string, error: AxiosError): string {
  const messages: string[] = [`${header}:`];
  messages.push(error.response?.status.toString()); // if (error.response?.status)
  messages.push(`(${error.response?.statusText})`); // if (error.response?.statusText)
  messages.push(JSON.stringify(error.response?.data)); // if (error.response?.data)
  messages.push('Contact support@devicepilot.com for help');
  return messages.join(' ');
}
