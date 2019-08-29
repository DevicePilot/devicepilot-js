import Post from './src/post';
import Kpi from './src/kpi';

export default function DevicePilot(spec) {
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
