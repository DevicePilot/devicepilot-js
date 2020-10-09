export default function toToken(value?: unknown): string | undefined {
  if (typeof value !== 'string') throw new TypeError(`Token "${value?.toString()}" must be provided`);
  return `TOKEN ${value.replace(/^TOKEN /i, '')}`;
}
