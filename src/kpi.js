import query from './query';

export default function Kpi(kpiToken, baseUrl) {
  async function getResults(kpiId) {
    try {
      const { data } = await query({
        headers: { Authorization: kpiToken },
        method: 'GET',
        url: `${baseUrl}/kpi/${kpiId}`,
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
