const configure = require('../configure');

test('gets an explicit api key', () => {
  const key = configure('my-key');
  expect(key).toEqual('TOKEN my-key');
});

test('gets a key from the environment', () => {
  const key = 'env-key';
  process.env.DP_API_KEY = key;
  expect(configure(key)).toEqual('TOKEN env-key');
});

test.each([
  ['TOKEN abc', 'TOKEN abc'],
  ['def', 'TOKEN def'],
  ['token ghi', 'TOKEN ghi'],
  ['ToKeN token', 'TOKEN token'],
])('normalises TOKEN from %p to %p', (provided, expected) => {
  const key = configure(provided);
  expect(key).toEqual(expected);
});

test('throws if no key provided', () => {
  delete process.env.DP_API_KEY;
  expect(() => configure()).toThrow();
});

test('throws if blank key provided', () => {
  delete process.env.DP_API_KEY;
  expect(() => configure(' ')).toThrow();
});
