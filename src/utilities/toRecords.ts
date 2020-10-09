import { DPRecord, DPTelemetry } from '../types';

function isDPTelemetry(value: unknown): value is DPTelemetry {
  if (typeof value === 'boolean') return true;
  if (typeof value === 'string') return true;
  if (typeof value === 'number') return true;
  if (value === null) return true;
  return false;
}

function isDPRecord(record: unknown): record is DPRecord {
  if (typeof record !== 'object') return false;
  if (!record) return false;
  if (!Object.values(record).every(isDPTelemetry)) return false;
  const r = record as Record<string, DPTelemetry>;
  if (typeof r.$id !== 'string') return false;
  if (r.$ts && typeof r.$ts !== 'number') return false;
  return true;
}

export default function toRecords(records: unknown): DPRecord[] {
  const array = Array.isArray(records) ? records : [records];
  if (!array.length) throw new TypeError('One or more records expected');
  if (array.every(isDPRecord)) return array;
  throw new TypeError('Records must be { $id: string, $ts?: number, [string]: boolean | string | number | null }');
}
