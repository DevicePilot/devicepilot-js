export default function Tokens(spec) {
  const toPrefixed = val => (val.startsWith('TOKEN') ? val : `TOKEN ${val}`);
  const toPrefixedTokenObj = entry => ({ [entry[0]]: toPrefixed(entry[1]) });
  const toPrefixedTokenList = (res, entry) => ({ ...res, ...toPrefixedTokenObj(entry) });

  return Object.entries(spec).reduce(toPrefixedTokenList, {});
}
