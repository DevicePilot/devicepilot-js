const validate = require('../validate');

const RECORDS = [
  { $id: 'a', aProperty: 1 },
  { $id: 'a', bProperty: 2 },
];

test('normalises "records" into an array', () => {
  const single = validate(RECORDS[0]);
  expect(single).toEqual([RECORDS[0]]);
  const array = validate(RECORDS);
  expect(array).toEqual(RECORDS);
});

test('enforces records as objects', () => {
  const record = 'not-a-record';
  expect(() => validate(record)).toThrow();
});

test('enforces records as non-null', () => {
  const records = [null];
  expect(() => validate(records)).toThrow();
});

test('enforces records cannot be an empty array', () => {
  const records = [];
  expect(() => validate(records)).toThrow();
});

test('enforces records as objects with string $id', () => {
  const no$id = { hello: 'word' };
  expect(() => validate(no$id)).toThrow();
  const blank$id = { $id: ' ' };
  expect(() => validate(blank$id)).toThrow();
});
