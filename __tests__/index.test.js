const rp = require('request-promise-native');
const devicepilot = require('..');

jest.mock('request-promise-native');

test('posts a single record to DevicePilot', async () => {
  rp.mockClear();
  rp.mockResolvedValueOnce({});
  const key = 'abc';
  const record = { $id: 'device-id', temperature: 20, orientation: 'SOUTH' };
  await devicepilot.post(record, key);
  expect(rp).toBeCalledWith({
    method: 'POST',
    headers: { Authorization: 'TOKEN abc' },
    uri: 'https://api.devicepilot.com/devices',
    body: [record],
    json: true,
  });
});

test('posts records to DevicePilot', async () => {
  rp.mockClear();
  rp.mockResolvedValueOnce({});
  const key = 'def';
  const records = [
    { $id: 'a', colour: 'blue' },
    { $id: 'b', switchedOn: true },
    { $id: 'a', temperature: 20, orientation: 'NORTH' },
  ];
  await devicepilot.post(records, key);
  expect(rp).toBeCalledWith({
    method: 'POST',
    headers: { Authorization: 'TOKEN def' },
    uri: 'https://api.devicepilot.com/devices',
    body: records,
    json: true,
  });
});
