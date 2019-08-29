(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios'), require('flat'), require('universal-url')) :
  typeof define === 'function' && define.amd ? define(['axios', 'flat', 'universal-url'], factory) :
  (global = global || self, global.devicePilot = factory(global.axios, global.flat, global.URL));
}(this, function (axios, flat, universalUrl) { 'use strict';

  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
  flat = flat && flat.hasOwnProperty('default') ? flat['default'] : flat;

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

  function formatRecord(record) {
    return flat(record);
  }

  function format(records) {
    return records.map(formatRecord);
  }

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

  function Post(postToken) {
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

  function Kpi(kpiToken) {
    console.log(universalUrl.URL);
    const MAX_ATTEMPTS = 15 * 60; // 15 min

    const delay = () => new Promise(res => setTimeout(res, 1000));

    async function retryGet(url, attempt = 1) {
      const res = await axios({
        method: 'GET',
        url,
      });
      const ifNoneMatch = new universalUrl.URL(url).searchParams.get('If-None-Match');
      const ETag = res.headers.etag;
      if (ETag === ifNoneMatch) {
        if (attempt >= MAX_ATTEMPTS) {
          return { data: [] };
        }
        await delay();
        return retryGet(url, attempt + 1);
      }
      return res;
    }

    async function getResults(kpiId) {
      try {
        const { headers: { location: url } } = await axios({
          headers: { Authorization: `TOKEN ${kpiToken}` },
          method: 'GET',
          url: `https://api.development.devicepilot.com/kpi/${kpiId}`,
        });

        const { data } = await retryGet(url);

        return data;
      } catch (err) {
        console.error({ msg: 'error making request', err }); // eslint-disable-line no-console
        throw new Error('KPI could not be fetched');
      }
    }

    return {
      retryGet,
      getResults,
    };
  }

  function DevicePilot(spec) {
    const { postToken, kpiToken } = spec;

    const { post } = Post(postToken);
    const { getResults } = Kpi(kpiToken);

    return {
      post,
      kpi: {
        getResults,
      },
      tokens: {
        post: postToken,
        kpi: kpiToken,
      },
    };
  }

  return DevicePilot;

}));
