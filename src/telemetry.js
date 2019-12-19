import query from './query';

export default function Telemetry(telemetryToken, baseUrl) {
  async function getLatest() {
    try {
      const { data } = await query({
        headers: { Authorization: telemetryToken },
        method: 'GET',
        url: `${baseUrl}/telemetry/latest`,
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
