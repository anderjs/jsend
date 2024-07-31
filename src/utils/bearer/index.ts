  /**
 * @description
 * Create a Bearer token.
 * @param token - Token to be used in the Bearer header.
 */
export function bearer(token: string) {
  return `Bearer ${token}`;
}