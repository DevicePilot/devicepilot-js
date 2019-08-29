const BATCH_SIZE = 100;

export default function batch(records) {
  const batches = [];
  const pending = [...records];
  while (pending.length) {
    const chunk = pending.splice(0, BATCH_SIZE);
    batches.push(chunk);
  }
  return batches;
}
