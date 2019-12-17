import Kpi from './src/kpi';
import Post from './src/post';
import Telemetry from './src/telemetry';
import Tokens from './src/tokens';

export default function DevicePilot(spec) {
  const { postToken, kpiToken, telemetryToken } = Tokens(spec);

  const { getResults } = Kpi(kpiToken);
  const { post } = Post(postToken);
  const { getLatest } = Telemetry(telemetryToken);

  return {
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
