import flat from 'flat';

function formatRecord(record) {
  return flat(record);
}

export default function format(records) {
  return records.map(formatRecord);
}
