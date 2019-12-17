import query from './query';

export default function Telemetry(telemetryToken) {
  async function getLatest(accountId) {
    try {
      const { data } = await query({
        headers: { Authorization: telemetryToken },
        method: 'GET',
        url: 'https://api.devicepilot.com/telemetry/latest',
        params: { accountId },
      });
      return data;
    } catch (err) {
      console.error({ msg: 'error making request', err }); // eslint-disable-line no-console
      throw new Error('Telemetry latest could not be fetched');
    }
  }

  return {
    getLatest,
  };
}
