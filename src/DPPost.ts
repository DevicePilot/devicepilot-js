import { AxiosRequestConfig } from 'axios';
import { DPRecord } from './types';
import retryRequest from './utilities/retryRequest';
import toBatches from './utilities/toBatches';
import toRecords from './utilities/toRecords';
import toToken from './utilities/toToken';

const BATCH_DELAY = 1000;

const delay = (): Promise<never> => new Promise((res) => setTimeout(res, BATCH_DELAY));

export default class DPPost {
  public baseUrl = 'https://api.devicepilot.com';

  #token: string;

  constructor(token: string) {
    this.#token = toToken(token);
  }

  private async postBatch(batches: DPRecord[][]): Promise<void> {
    const [data, ...pending] = batches;
    const request: AxiosRequestConfig = {
      method: 'post',
      url: '/devices',
      baseURL: this.baseUrl,
      headers: { Authorization: this.#token },
      data,
    };
    await retryRequest(request);
    if (pending.length) {
      await delay();
      await this.postBatch(pending);
    }
  }

  public async postRecords(records: DPRecord | DPRecord[]): Promise<void> {
    const data = toRecords(records);
    const batches = toBatches(data);
    return this.postBatch(batches);
  }
}
