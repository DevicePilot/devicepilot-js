import Tokens from '../tokens';

test('prefix tokens if not already prefixed', () => {
  const prefixed = Tokens({
    postToken: 'abc',
    kpiToken: 'TOKEN def',
  });

  expect(prefixed).toEqual({
    postToken: 'TOKEN abc',
    kpiToken: 'TOKEN def',
  });
});
