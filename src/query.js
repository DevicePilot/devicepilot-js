import axios from 'axios';
import { URL } from 'universal-url';

const MAX_ATTEMPTS = 15 * 60; // 15 min

const delay = () => new Promise((res) => setTimeout(res, 1000));

async function retryGet(url, attempt = 1) {
  const res = await axios({
    method: 'GET',
    url,
  });
  const ifNoneMatch = new URL(url).searchParams.get('If-None-Match');
  const ETag = res.headers.etag;
  if (ETag === ifNoneMatch) {
    if (attempt >= MAX_ATTEMPTS) {
      throw new Error('DevicePilot took too long to respond (Maximum number of attempts reached)');
    }
    await delay();
    return retryGet(url, attempt + 1);
  }
  return res;
}

export default async function query(request) {
  const { headers: { location: url } } = await axios(request);
  const result = await retryGet(url);
  return result;
}
