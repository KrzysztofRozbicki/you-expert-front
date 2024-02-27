export const isValidInputNumber = (value: string): boolean =>
  (value === '' || /^[0-9]+$/.test(value)) && value[0] !== '0';

export const isValidUrl = (value: string): boolean =>
  value &&
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    value
  );

export const getNumber = (string: string): number =>
  string && isFinite(+string) ? parseFloat(string) : 0;
