import query from './query';

export default function Kpi(kpiToken) {
  async function getResults(kpiId) {
    try {
      const { data } = query({
        headers: { Authorization: kpiToken },
        method: 'GET',
        url: `https://api.devicepilot.com/kpi/${kpiId}`,
      });
      return data;
    } catch (err) {
      console.error({ msg: 'error making request', err }); // eslint-disable-line no-console
      throw new Error('KPI could not be fetched');
    }
  }

  return {
    getResults,
  };
}
