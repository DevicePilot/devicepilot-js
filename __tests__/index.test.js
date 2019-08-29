import axios from 'axios';
import DevicePilot from '..';

jest.mock('axios');

test('posts a single record to DevicePilot', async () => {
  const postToken = 'abc';
  const dp = DevicePilot({ postToken });

  axios.mockClear();
  axios.mockResolvedValueOnce({});
  const record = { $id: 'device-id', temperature: 20, orientation: 'SOUTH' };
  await dp.post(record);
  expect(axios).toBeCalledWith({
    method: 'POST',
    headers: { Authorization: `TOKEN ${postToken}` },
    url: 'https://api.devicepilot.com/devices',
    data: [record],
  });
});

test('posts records to DevicePilot', async () => {
  const postToken = 'def';
  const dp = DevicePilot({ postToken });

  axios.mockClear();
  axios.mockResolvedValueOnce({});
  const records = [
    { $id: 'a', colour: 'blue' },
    { $id: 'b', switchedOn: true },
    { $id: 'a', temperature: 20, orientation: 'NORTH' },
  ];
  await dp.post(records);
  expect(axios).toBeCalledWith({
    method: 'POST',
    headers: { Authorization: `TOKEN ${postToken}` },
    url: 'https://api.devicepilot.com/devices',
    data: records,
  });
});

test('get kpi from DevicePilot', async () => {
  const kpiToken = 'ghi';
  const kpiId = '1234';
  const url = 'http://url.com?If-None-Match=placeholder';
  const headers = { location: url };
  const dp = DevicePilot({ kpiToken });

  axios.mockClear();
  axios
    .mockResolvedValueOnce({ headers })
    .mockResolvedValueOnce({ data: 'data', headers: { etag: 'placeholder' } })
    .mockResolvedValueOnce({ data: 'data', headers: { etag: '' } });
  await dp.kpi.getResults(kpiId);

  expect(axios).toHaveBeenCalledWith({
    method: 'GET',
    headers: { Authorization: `TOKEN ${kpiToken}` },
    url: `https://api.devicepilot.com/kpi/${kpiId}`,
  });
});
