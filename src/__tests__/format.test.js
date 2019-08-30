import format from '../format';

test('formats an array of records in flat DevicePilot JSON', () => {
  const records = [
    { $id: '1', nested: { property: 'a' }, simple: 2 },
    { $id: '2', array: [{ something: 'b' }, 'c'], simple: false },
  ];
  const formatted = format(records);
  expect(formatted).toEqual([
    {
      $id: '1',
      'nested.property': 'a',
      simple: 2,
    },
    {
      $id: '2',
      'array.0.something': 'b',
      'array.1': 'c',
      simple: false,
    },
  ]);
});
