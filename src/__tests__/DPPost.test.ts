import axios from 'axios';
import { DPPost } from '../..';

jest.mock('axios');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any) => any;
const m = <T extends Fn>(f: T) => f as unknown as jest.MockInstance<ReturnType<T>, Parameters<T>>;

test('posts a single record to DevicePilot', async () => {
  const postToken = 'abc';
  const dp = new DPPost(postToken);

  m(axios).mockReset();
  // @ts-expect-error: return type isn't important
  m(axios).mockResolvedValueOnce({});
  const record = { $id: 'device-id', temperature: 20, orientation: 'SOUTH' };
  await dp.postRecords(record);
  expect(axios).toBeCalledWith({
    method: 'post',
    headers: { Authorization: `TOKEN ${postToken}` },
    baseURL: 'https://api.devicepilot.com',
    url: '/devices',
    data: [record],
    timeout: 30000,
  });
});

test('posts records to DevicePilot', async () => {
  const postToken = 'def';
  const dp = new DPPost(postToken);

  m(axios).mockReset();
  // @ts-expect-error: return type isn't important
  m(axios).mockResolvedValueOnce({});
  const records = [
    { $id: 'a', colour: 'blue' },
    { $id: 'b', switchedOn: true },
    { $id: 'a', temperature: 20, orientation: 'NORTH' },
  ];
  await dp.postRecords(records);
  expect(axios).toBeCalledWith({
    method: 'post',
    headers: { Authorization: `TOKEN ${postToken}` },
    baseURL: 'https://api.devicepilot.com',
    url: '/devices',
    data: records,
    timeout: 30000,
  });
});
