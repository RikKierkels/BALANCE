export const reducedCompare =
  <T>(compareFn: (a: T, B: T) => boolean) =>
  (xs: T[]): T =>
    xs.reduce((prev, curr) => (compareFn(prev, curr) ? curr : prev));

export const pipe = <T extends any[], R>(fn1: (...args: T) => R, ...fns: Array<(a: R) => R>) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    (value) => value,
  );
  return (...args: T) => piped(fn1(...args));
};

export const diff = (a: number, b: number) => a - b;

export const isEmpty = <T>(xs: T[]): boolean => !xs?.length;

export const zip = <T, R>(arrayOne: T[], arrayTwo: R[]): [T, R][] =>
  Array.from({ length: arrayOne.length }, (_, i) => [arrayOne[i], arrayTwo[i]]);