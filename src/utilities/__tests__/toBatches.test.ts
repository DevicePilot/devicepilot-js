import { DPRecord } from '../../types';
import batch from '../toBatches';

test('should split array into chunks of 100', () => {
  const records: DPRecord[] = [];
  for (let i = 0; i < 345; i += 1) {
    const record: DPRecord = {
      $id: i.toString(),
      $ts: i,
      value: i,
    };
    records.push(record);
  }
  const batches = batch(records);
  expect(batches).toHaveLength(4);
  expect(batches[0]).toHaveLength(100);
  expect(batches[0][99].$ts).toEqual(99);
  expect(batches[1]).toHaveLength(100);
  expect(batches[1][99].$ts).toEqual(199);
  expect(batches[2]).toHaveLength(100);
  expect(batches[2][99].$ts).toEqual(299);
  expect(batches[3]).toHaveLength(45);
  expect(batches[3][44].$ts).toEqual(344);
});
