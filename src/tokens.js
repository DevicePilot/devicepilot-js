export default function Tokens(spec) {
  const toPrefixed = (val) => 'TOKEN '.concat(val.replace(/^TOKEN /i, ''));
  const toPrefixedTokenObj = (entry) => ({ [entry[0]]: toPrefixed(entry[1]) });
  const toPrefixedTokenList = (res, entry) => ({ ...res, ...toPrefixedTokenObj(entry) });

  return Object.entries(spec).reduce(toPrefixedTokenList, {});
}
