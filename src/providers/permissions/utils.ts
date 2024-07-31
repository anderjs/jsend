import { AuthorizationProps, AuthorizationSystemFlag, IN_Permission, SP_Permission } from "./types";

/**
 * @description
 * Function to check if a user has the required permissions.
 * It verifies user permissions based on the provided properties and returns a boolean indicating permission status.
 * @example
 * authorization({ allow: ["View Dashboard"], user: signal.user, sys?: "Integra Negocio" })
 */
export const authorization: AuthorizationProps = ({
  user,
  allow,
  system = defaultSystem,
}) => {
  const core = user?.systems?.find((s) => s.name === system);

  const owned = core?.functions?.filter((permission) => {
    const permissionKey = permission.key as IN_Permission | SP_Permission;

    return allow?.includes(permissionKey as never);
  });

  return owned?.length === allow?.length;
};

export const checkSystems = ({
  user,
  passport,
  systems,
}: AuthorizationSystemFlag) => {
  const systemsEnabled = user?.systems?.filter((s) => {
    return systems?.includes(s.name);
  });

  if (passport) {
    return systemsEnabled?.length === systems?.length;
  }

  return false;
};

export const defaultSystem = "Integra Negocio";
