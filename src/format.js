const flat = require('flat');

function formatRecord(record) {
  return flat(record);
}

function format(records) {
  return records.map(formatRecord);
}

module.exports = format;
