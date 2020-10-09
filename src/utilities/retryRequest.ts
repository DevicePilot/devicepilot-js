import axios, { AxiosRequestConfig } from 'axios';
import { formatAxiosError, isAxiosError } from './isAxiosError';

const RETRY_DELAY = 1000;
const LAST_ATTEMPT = 5;

const delay = (): Promise<never> => new Promise((res) => setTimeout(res, RETRY_DELAY));

export default async function retryRequest<T>(
  request: AxiosRequestConfig, attempt = 0,
): Promise<T> {
  try {
    const result = await axios(request);
    return result as unknown as T;
  } catch (error) {
    if (isAxiosError(error)) {
      // known errors
      if (error.response?.status < 400) {
        // record invalid errors are already very descriptive
        throw new TypeError(JSON.stringify(error?.response?.data));
      }
      if (error.response?.status === 401 || error.response?.status === 403) {
        // do not spam on invalid token
        throw new Error('Token is invalid');
      }
    }

    if (attempt < LAST_ATTEMPT) {
      await delay();
      return retryRequest<T>(request, attempt + 1);
    }

    if (isAxiosError(error)) throw new Error(formatAxiosError('Failed to post records', error));
    throw error; // throw _something_
  }
}
