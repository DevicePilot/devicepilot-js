const BATCH_SIZE = 100;

function batch(records) {
  const batches = [];
  const pending = [...records];
  while (pending.length) {
    const chunk = pending.splice(0, BATCH_SIZE);
    batches.push(chunk);
  }
  return batches;
}

module.exports = batch;
