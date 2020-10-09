import toRecords from '../toRecords';

const RECORDS = [
  { $id: 'a', aProperty: 1 },
  { $id: 'a', bProperty: 2 },
];

test('normalises "records" into an array', () => {
  const single = toRecords(RECORDS[0]);
  expect(single).toEqual([RECORDS[0]]);
  const array = toRecords(RECORDS);
  expect(array).toEqual(RECORDS);
});

test('enforces records as objects', () => {
  const record = 'not-a-record';
  expect(() => toRecords(record)).toThrow();
});

test('enforces records as non-null', () => {
  const records = [null];
  expect(() => toRecords(records)).toThrow();
});

test('enforces records cannot be an empty array', () => {
  const records = [];
  expect(() => toRecords(records)).toThrow();
});

test('enforces records as objects with string $id', () => {
  const no$id = { hello: 'word' };
  expect(() => toRecords(no$id)).toThrow();
});

test('enforces $ts as number, if provided', () => {
  const bad$ts = { $id: '1', $ts: 'now' };
  expect(() => toRecords(bad$ts)).toThrow();
});
