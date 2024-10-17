export function pluralize(
  word: string,
  count: number,
  plural?: string
): string {
  return count === 1 ? word : plural ? plural : `${word}s`;
}
