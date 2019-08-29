export default function configure(apiKey) {
  const key = typeof apiKey === 'string'
    ? apiKey
    : (process.env.DP_API_KEY || '');
  const normalised = key
    .replace(/^TOKEN /i, '')
    .trim();
  if (!normalised.length) {
    throw new Error('API key must be provided either as apiKey argument in `post` or as DP_API_KEY environmental variable');
  }
  return `TOKEN ${normalised}`;
}
