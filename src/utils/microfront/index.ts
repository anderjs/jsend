const roles = ["otic", "otec", "empresa"];

/**
 *
 * @param realm_access - User roles.
 */
export const assign = (realm_access: string[]): string => {
  const role = roles.find((role) => realm_access.includes(role));

  if (role?.toLowerCase() === "empresa") {
    return "cliente";
  }

  return role ?? "";
};

export const now = (): number => {
  return Date.now() / 1000;
};

export const every = (minutes: number): number => {
  return 60 * minutes * 1000;
};

export const renderName = (name?: string) => {
  return name ?? "";
};
