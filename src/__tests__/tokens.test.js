import Tokens from '../tokens';

test.each([
  [{ token: 'TOKEN abc' }, { token: 'TOKEN abc' }],
  [{ token: 'def' }, { token: 'TOKEN def' }],
  [{ token: 'token ghi' }, { token: 'TOKEN ghi' }],
  [{ token: 'ToKeN token' }, { token: 'TOKEN token' }],
])('normalises TOKEN from %p to %p', (provided, expected) => {
  const key = Tokens(provided);
  expect(key).toEqual(expected);
});
