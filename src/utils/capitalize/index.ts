/**
 * @description
 * Capitalize the first letter of a string.
 * @param str - String to be capitalized.
 */
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }