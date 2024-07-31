import { create, StateCreator } from "zustand";

/**
 * @description
 * Resetting multiple stores at once.
 */
const resetters: (() => void)[] = [];

export const createRef = (<T>(f: StateCreator<T> | undefined) => {
  if (f === undefined) return create;
  const store = create(f);
  const initialState = store.getState();
  resetters.push(() => {
    store.setState(initialState, true);
  });
  return store;
}) as typeof create;

export const resetAllStores = () => {
  for (const resetter of resetters) {
    resetter();
  }
};

export { useSessionStore, initialState } from "./session";