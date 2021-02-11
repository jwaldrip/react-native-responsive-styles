import { DependencyList, useMemo } from "react";

export type Thunk<T extends unknown[], R> = R | ((...args: T) => R);

export type ExtractThunk<T> = T extends Thunk<any, infer R> ? R : never;

export function dethunk<T extends unknown[], R>(
  thunk: Thunk<T, R>,
  ...args: T
): R {
  return thunk instanceof Function ? thunk(...args) : thunk;
}

export function useThunk<T extends unknown[], R>(
  thunk: Thunk<T, R>,
  args: T,
  deps: DependencyList = []
): R {
  return useMemo(
    () => dethunk(thunk, ...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...args, ...deps]
  );
}
