import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { URL } from 'universal-url';
import { formatAxiosError, isAxiosError } from './isAxiosError';

const POLL_INTERVAL = 1000;
const LAST_POLL = 15 * 60; // 15 minute timeout
const TIMEOUT = 30000;

const delay = (): Promise<never> => new Promise((res) => setTimeout(res, POLL_INTERVAL));

async function retryGet<T>(url: string, attempt = 1): Promise<AxiosResponse<T>> {
  const response = await axios({ method: 'get', url, timeout: TIMEOUT });
  const ifNoneMatch = new URL(url).searchParams.get('If-None-Match');

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const ETag: string | undefined = response.headers.etag;
  if (ETag === ifNoneMatch) {
    if (attempt >= LAST_POLL) {
      throw new Error('DevicePilot took too long to respond (Maximum number of attempts reached)');
    }
    await delay();
    return retryGet(url, attempt + 1);
  }

  return response;
}

export default async function query<T>(request: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  try {
    const response = await axios({ timeout: TIMEOUT, ...request });
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const url: string | undefined = response.headers.location;
    if (!url) throw new Error('Query endpoint unavailable');
    const result = await retryGet<T>(url);
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) throw new Error('KPI was not found');
      if (error.response?.status === 401) throw new Error('Token is invalid');
      throw new Error(formatAxiosError('Failed to get query result', error));
    }
    throw error; // throw _something_
  }
}
