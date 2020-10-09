import { AxiosError } from 'axios';

export function isAxiosError(error: unknown): error is AxiosError {
  if (!(error instanceof Error)) { return false; }
  return 'config' in error;
}

export function formatAxiosError(header: string, error: AxiosError): string {
  const messages: string[] = [`${header}:`];
  if (error.response?.status) messages.push(error.response.status.toString());
  if (error.response?.statusText) messages.push(`(${error.response.status.toString()})`);
  if (error.response?.data) messages.push(JSON.stringify(error.response?.data));
  messages.push('Contact support@devicepilot.com for help');
  return messages.join(' ');
}
