import Api from './src/api';
import Kpi from './src/kpi';
import Post from './src/post';
import Telemetry from './src/telemetry';
import Tokens from './src/tokens';

export default function DevicePilot(spec) {
  const {
    postToken, kpiToken, telemetryToken, apiToken,
  } = Tokens(spec);
  const { baseUrl = 'https://api.devicepilot.com' } = spec;

  const api = Api(apiToken);
  const { getResults } = Kpi(kpiToken, baseUrl);
  const { post } = Post(postToken, baseUrl);
  const { getLatest } = Telemetry(telemetryToken, baseUrl);

  return {
    api,
    kpi: {
      getResults,
    },
    post,
    telemetry: {
      getLatest,
    },
    tokens: {
      post: postToken,
      kpi: kpiToken,
    },
  };
}
