/**
 * @description
 * Stacks an array.
 */
export function stack<T extends object>(
    arr: T[],
    mappedKey: keyof T,
    separator: string = ",",
  ) {
    if (arr.length === 0) return;
  
    if (arr.every((v) => typeof v === "object")) {
      return arr.map((v) => v[mappedKey]).join(separator);
    }
  
    return arr.join(separator);
  }