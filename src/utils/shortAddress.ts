export const shortAddress = (
  address: string,
  limitBefore = 8,
  limitAfter = 3
) => {
  const first = address.substring(0, limitBefore);
  const last = address.substring(address.length - limitAfter);
  return `${first}...${last}`;
};
