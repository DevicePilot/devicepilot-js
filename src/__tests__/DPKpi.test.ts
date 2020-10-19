import axios from 'axios';
import { DPKpi } from '../..';

jest.mock('axios');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => any;
const m = <T extends Fn>(f: T) => f as unknown as jest.MockInstance<ReturnType<T>, Parameters<T>>;

test('get kpi from DevicePilot', async () => {
  const kpiToken = 'ghi';
  const kpiId = '1234';
  const url = 'http://url.com?If-None-Match=placeholder';
  const headers = { location: url };
  const dp = new DPKpi(kpiToken);

  m(axios).mockReset();
  m(axios)
    // @ts-expect-error: return type isn't important
    .mockResolvedValueOnce({ headers })
    // @ts-expect-error: return type isn't important
    .mockResolvedValueOnce({ data: 'data', headers: { etag: 'placeholder' } })
    // @ts-expect-error: return type isn't important
    .mockResolvedValueOnce({ data: 'data', headers: { etag: '' } });
  await dp.getResults(kpiId);

  expect(axios).toHaveBeenNthCalledWith(1, {
    method: 'get',
    headers: { Authorization: `TOKEN ${kpiToken}` },
    baseURL: 'https://api.devicepilot.com',
    params: { view: 'api' },
    url: `/kpi/${kpiId}`,
  });
  expect(axios).toHaveBeenCalledWith({
    method: 'get',
    url,
  });
});
