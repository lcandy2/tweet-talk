import { WritableAtom, atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { localExtStorage } from "@webext-core/storage";
import { RESET } from "jotai/utils";

type SetStateActionWithReset<Value> =
  | Value
  | typeof RESET
  | ((prev: Value) => Value | typeof RESET);

function createExtStorage<T>() {
  return {
    getItem: async (key: string, initialValue: T): Promise<T> => {
      const value = await localExtStorage.getItem(key);
      return value === undefined ? initialValue : (value as T);
    },
    setItem: async (key: string, newValue: T): Promise<void> => {
      await localExtStorage.setItem(key, newValue);
    },
    removeItem: async (key: string): Promise<void> => {
      await localExtStorage.removeItem(key);
    },
  };
}

export function atomWithExtStorage<Value>(
  key: string,
  initialValue: Value,
  options?: { getOnInit?: boolean },
): WritableAtom<
  Value | Promise<Value>,
  [SetStateActionWithReset<Value | Promise<Value>>],
  Promise<void>
> {
  const storage = createExtStorage<Value>();
  return atomWithStorage(key, initialValue, storage, options);
}
