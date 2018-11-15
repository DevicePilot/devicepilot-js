const rp = require('request-promise-native');
const batch = require('./batch');
const configure = require('./configure');
const format = require('./format');
const validate = require('./validate');

const uri = 'https://api.devicepilot.com/devices';

async function postBatch(Authorization, batches = []) {
  const [records, ...pending] = batches;
  return rp.post(uri, records, { headers: { Authorization } })
    .then(() => {
      if (pending.length) {
        return postBatch(pending);
      }
      return Promise.resolve();
    })
    .catch((error) => {
      if (error && error.response) {
        console.error(`Failed to post records: ${error.response.body}`); // eslint-disable-line no-console
      }
      return Promise.reject(error);
    });
}

async function post(records, apiKey) {
  const authorization = configure(apiKey);
  const validated = validate(records);
  const formatted = format(validated);
  const batches = batch(formatted);
  if (batches.length) {
    await postBatch(authorization, batches);
  }
}

module.exports = post;
