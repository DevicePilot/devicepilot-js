const rp = require('request-promise-native');
const devicepilot = require('..');

jest.mock(
  'request-promise-native',
  () => ({ post: jest.fn().mockResolvedValue({}) }),
);

test('posts a single record to DevicePilot', async () => {
  rp.post.mockClear();
  const key = 'abc';
  const record = { $id: 'device-id', temperature: 20, orientation: 'SOUTH' };
  await devicepilot.post(record, key);
  expect(rp.post).toBeCalledWith(
    'https://api.devicepilot.com/devices',
    [record],
    { headers: { Authorization: 'TOKEN abc' } },
  );
});

test('posts records to DevicePilot', async () => {
  rp.post.mockClear();
  const key = 'def';
  const records = [
    { $id: 'a', colour: 'blue' },
    { $id: 'b', switchedOn: true },
    { $id: 'a', temperature: 20, orientation: 'NORTH' },
  ];
  await devicepilot.post(records, key);
  expect(rp.post).toBeCalledWith(
    'https://api.devicepilot.com/devices',
    records,
    { headers: { Authorization: 'TOKEN def' } },
  );
});
