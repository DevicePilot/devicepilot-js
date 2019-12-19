import axios from 'axios';

export default function Api(apiToken) {
  async function call(params) {
    try {
      const { data } = await axios({
        headers: { Authorization: apiToken },
        ...params,
      });
      return data;
    } catch (err) {
      console.error({ msg: 'error making request', err }); // eslint-disable-line no-console
      throw new Error('API could not be called');
    }
  }

  return {
    call,
  };
}
