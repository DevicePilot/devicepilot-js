import { DPRecord } from '../types';

const BATCH_SIZE = 100;

export default function toBatches(records: DPRecord[]): DPRecord[][] {
  const batches: DPRecord[][] = [];
  const pending = [...records];
  while (pending.length) {
    const chunk = pending.splice(0, BATCH_SIZE);
    batches.push(chunk);
  }
  return batches;
}
