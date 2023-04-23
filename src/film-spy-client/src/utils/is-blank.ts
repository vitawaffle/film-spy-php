const isBlank = (value: unknown) =>
  value === undefined || value === null || value === '';

export default isBlank;
