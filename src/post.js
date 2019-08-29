import axios from 'axios';
import batch from './batch';
import format from './format';
import validate from './validate';

export default function Post(postToken) {
  const delay = () => new Promise(res => setTimeout(res, 1000));

  async function postBatch(batches = []) {
    const [records, ...pending] = batches;
    return axios({
      method: 'POST',
      headers: { Authorization: `TOKEN ${postToken}` },
      url: 'https://api.devicepilot.com/devices',
      data: records,
    })
      .then(() => {
        if (pending.length) {
          return delay().then(() => postBatch(pending));
        }
        return Promise.resolve();
      })
      .catch((error) => {
        if (error && error.response) {
          console.error(`Failed to post records: ${JSON.stringify(error.response.data)}`); // eslint-disable-line no-console
        }
        return Promise.reject(error);
      });
  }

  async function post(records) {
    const validated = validate(records);
    const formatted = format(validated);
    const batches = batch(formatted);
    if (batches.length) {
      await postBatch(batches);
    }
  }

  return {
    postBatch,
    post,
  };
}
