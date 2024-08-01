/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Logger } from "@nectiasw/providers/logger";
import { IN_Permission, SP_Permission } from "@nectiasw/providers/permissions/types";
import {
  SignalContext,
  ContextProps,
} from "@nectiasw/context";

// eslint-disable-next-line react-refresh/only-export-components
export enum GrantSystem {
  IB = "Integra Negocio",
  SP = "Sistema de Perfilamiento v2",
}

export type GrantArgs = {
  debug?: boolean;
  system?: string;
  redirect?: string;
  popup?: {
    text: string;
    title: string;
  };
};

export type PrivateProps = {
  allow?: IN_Permission [] | SP_Permission [];
  grants?: GrantArgs;
  children?: React.ReactNode;
};

/**
 * @param Component - Component to be wrapped.
 * @param grants - Grants to be checked.
 */
export const Private: React.FunctionComponent<PrivateProps> = React.memo(
  ({ allow, grants, children }) => {
    const signal = React.useContext(SignalContext);

    const logger = new Logger(undefined, grants?.debug);

    const [content, setContent] = React.useState<boolean>(false);

    /**
     * @description
     * This effect will be executed when the user is logged in.
     */
    React.useEffect(() => {
      if (signal?.user?.systems?.length) {
        handleSyncPermissions(signal);
      }
    }, [signal?.user?.systems]);

    /**
     * @description
     * This will handle the permissions.
     */
    const handleSyncPermissions = React.useCallback(
      async (context: ContextProps) => {
        const ref = context?.user?.systems?.find(
          (system) => system.name === grants?.system
        );

        logger.debug("ref:", ref);

        if (ref?.functions) {
          const owned = ref.functions.filter((fn) => {
            const functionKey = fn?.key as IN_Permission | SP_Permission;

            return allow?.includes(functionKey as never);
          });

          if (owned.length === allow?.length) {
            setContent(true);
          } else {
            logger.debug("denied");

            signal?.onAcessDenied &&
              signal?.onAcessDenied(grants?.redirect as string);
          }
        }
      },
      [grants?.system, grants?.debug, allow]
    );

    return <>{content ? children : null}</>;
  }
);

Private.defaultProps = {
  allow: [],
  grants: {
    debug: false,
    system: GrantSystem.IB,
    redirect: "/dashboard",
    popup: {
      text: "You don't have the required permissions to access this page.",
      title: "Access Denied",
    },
  },
};
