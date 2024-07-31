import React from "react";
import { SignalContext } from "@nectiasw/context";

import {
  IN_Permission,
  SP_Permission,
  PermissionsProps,
} from "./types";
import { defaultSystem } from "./utils";

/**
 * @description
 * Component to check if user has permission to see content.
 * It will check based on signal context and return children if user has permission.
 * @example
 * <Permissions allow={["View Dashboard"]}>
 *  <div>Content</div>
 * </Permissions>
 */
export const Permissions: React.FC<PermissionsProps> = React.memo(
  ({ allow, system, passport, systems, children, inject }) => {
    /**
     * @description
     * Check that the user contains the system.
     */
    const core = React.useMemo(() => {
      return inject?.systems?.find((s) => s.name === system);
    }, [inject, system]);

    if (inject) {
      /**
       * @description
       * Check that the user contain the permissions.
       */
      const owned = core?.functions?.filter((permission) => {
        const permissionKey = permission.key as IN_Permission | SP_Permission;

        return allow?.includes(permissionKey as never);
      });
      /**
       * @description
       * If passport enabled, you want to check the systems.
       */
      if (passport) {
        const systemsEnabled = inject?.systems?.filter((s) => {
          return systems?.includes(s.name);
        });

        return (
          <>{systemsEnabled?.length === systems?.length ? children : null}</>
        );
      }

      return <>{owned?.length === allow?.length ? children : null}</>;
    }

    return (
      <SignalContext.Consumer>
        {(signal) => {
          /**
           * @description
           * Check that the user contains the system.
           */
          const core = signal?.user?.systems?.find((s) => s.name === system);

          /**
           * @description
           * Check that the user contain the permissions.
           */
          const owned = core?.functions?.filter((permission) => {
            const permissionKey = permission.key as
              | IN_Permission
              | SP_Permission;

            return allow?.includes(permissionKey as never);
          });

          const ctx = signal?.user?.systems?.filter((s) => {
            return systems?.includes(s.name);
          });

          /**
           * @description
           * If passport enabled, you want to check the systems.
           */
          if (passport) {
            return <>{ctx?.length === systems?.length ? children : null}</>;
          }

          return (
            <>
              {owned?.length === allow?.length ? <>{children}</> : <>{null}</>}
            </>
          );
        }}
      </SignalContext.Consumer>
    );
  }
);

Permissions.defaultProps = {
  allow: [],
  system: defaultSystem,
};
