import { AxiosRequestConfig } from 'axios';
import { DPKpiResult } from './types';
import query from './utilities/query';
import toToken from './utilities/toToken';

export default class DPKpi {
  public baseUrl = 'https://api.devicepilot.com';

  #token: string;

  constructor(token: string) {
    this.#token = toToken(token);
  }

  public async getResults(kpiId: string): Promise<DPKpiResult> {
    const request: AxiosRequestConfig = {
      method: 'get',
      url: `/kpi/${kpiId}`,
      baseURL: this.baseUrl,
      params: { view: 'api' },
      headers: { Authorization: this.#token },
    };
    const { data } = await query<DPKpiResult>(request);
    if (data.error) {
      throw new Error(`KPI could not be fetched: ${JSON.stringify(data.error)}`);
    }
    return data;
  }
}
