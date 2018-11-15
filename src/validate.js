function validateRecord(record, index) {
  const prefix = `Record[${index}]`;
  if (typeof record !== 'object') {
    throw new TypeError(`${prefix} must be an object`);
  }
  if (!record) {
    throw new TypeError(`${prefix} cannot be null`);
  }
  if (typeof record.$id !== 'string' || !record.$id.trim().length) {
    throw new TypeError(`${prefix} must include a $id to identify the device`);
  }
}

function validate(records) {
  const recordArray = Array.isArray(records) ? records : [records];
  recordArray.forEach(validateRecord);
  if (records.length === 0) {
    throw new TypeError('At least one record must be provided');
  }
  return recordArray;
}

module.exports = validate;
