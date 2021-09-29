export const repeat = (times: number) => <T>(fn: (arg: T) => T) => (arg: T): T =>
    times === 0 ?
    arg :
    repeat(--times)(fn)(fn(arg));

export const compareKeepOne = <T>(compareFn: (a: T, B: T) => boolean) => (xs: T[]): T | null =>
    xs.length === 0 ?
        null :
        xs.reduce((prev, curr) => compareFn(prev, curr) ? curr : prev);

export const mapIf = <T, R>(predicate: (x: T) => boolean) => (mapFn: (x: T) => T) => (xs: T[]): T[] =>
    xs.map(x => predicate(x) ? mapFn(x) : x);

export const diff = (a: number, b: number) => a - b;