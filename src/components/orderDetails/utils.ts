export const getNumber = (string: string): number =>
  string && isFinite(+string) ? parseFloat(string) : 0;
