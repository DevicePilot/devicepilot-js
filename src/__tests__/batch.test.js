const batch = require('../batch');

test('should split array into chunks of 100', () => {
  const records = [...Array(345)].map((_, i) => i);
  const batches = batch(records);
  expect(batches).toHaveLength(4);
  expect(batches[0]).toHaveLength(100);
  expect(batches[0][99]).toEqual(99);
  expect(batches[1]).toHaveLength(100);
  expect(batches[1][99]).toEqual(199);
  expect(batches[2]).toHaveLength(100);
  expect(batches[2][99]).toEqual(299);
  expect(batches[3]).toHaveLength(45);
  expect(batches[3][44]).toEqual(344);
});
