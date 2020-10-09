import toToken from '../toToken';

test.each([
  ['TOKEN abc', 'TOKEN abc'],
  ['def', 'TOKEN def'],
  ['token ghi', 'TOKEN ghi'],
  ['ToKeN token', 'TOKEN token'],
])('normalises TOKEN from %p to %p', (provided, expected) => {
  const key = toToken(provided);
  expect(key).toEqual(expected);
});

test.each([
  undefined,
  null,
  123,
  { token: 'object' },
])('throws on unexpected token input (%p)', (token) => {
  expect(() => toToken(token)).toThrow();
});
