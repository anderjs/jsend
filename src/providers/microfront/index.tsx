import React from "react";
import Swal from "sweetalert2";
import { BrowserHistory, createBrowserHistory } from "history";

import { SignalContext, ContextProps } from "@nectiasw/context";

// --- Logger ---
import { Logger, LogLevel } from "@nectiasw/providers/logger";

// --- Providers ---
import { Layout } from "@nectiasw/components/Layout";
import { Loading } from "@nectiasw/components/Loading";

// --- Types ---
import { EventMap } from "@nectiasw/events";

// --- Types ---
import { UIArguments, CommonSignalConnection } from "./types";

// --- Channel ---
import {
  observe,
  broadcast,
  useBroadcaster,
} from "@nectiasw/providers/channel";

import { assign, every, now, renderName } from "@nectiasw/utils/microfront";

const logger = new Logger(LogLevel.DEBUG, true);

/**
 * @param name - Name of the microfront.
 * @param Component - Component to be hosted.
 * @description
 * This function is used to wrap the microfront component.
 * It is used to pass the name of the microfront to the component.
 * Gives a default behavior to the microfront component;
 *  1. It will render the component only if the microfront is loaded.
 *  2. It will make a Subscription to send event to appshell to communicate.
 *  3. It can be used to communicate between microfronts.
 * @example
 * export default MicrofrontHost(Courses, '@courses');
 */
export const MicrofrontHost: React.FC<UIArguments> = React.memo((props) => {
  const {
    app,
    layout = true,
    navbar = () => true,
    sidebar = () => true,
    footer,
    navigation,
    environment,
    modalExpired,
    observerToken = true,
    previousPath = false,
    includeNavbarDropdown,
  } = props;

  const [signal, setSignal] = React.useState<ContextProps>({});

  const [loading, setLoading] = React.useState<boolean>(true);

  const history = React.useRef<BrowserHistory>(createBrowserHistory());

  const timeout = React.useRef<number | NodeJS.Timeout>(0);

  const dismiss = React.useRef<boolean>(true);

  useBroadcaster<string>(
    EventMap.ON_CONNECT_APP,
    () => {
      setLoading(true);
    },
    app
  );

  const onSignal = React.useCallback((signal?: CommonSignalConnection) => {
    if (signal) {
      setSignal(signal);
    }
  }, []);

  const onAcessDenied = React.useCallback(async (route: string) => {
    if (dismiss.current) {
      dismiss.current = false;

      await Swal.fire({
        icon: "warning",
        text: "No tiene permisos para acceder a este recurso",
        title: "Acceso denegado",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
      });

      history.current?.push({
        pathname: route,
      });

      dismiss.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (typeof props.loading === "boolean") {
      setLoading(props.loading);
    }
  }, [props.loading]);

  React.useEffect(() => {
    if (observerToken) {
      if (signal?.info?.exp) {
        const currentTimeSession = now();

        logger.info("Token status", {
          now: currentTimeSession,
          expiresAt: signal?.info?.exp,
          shouldExpire: signal?.info?.exp < currentTimeSession,
        });

        if (signal?.info?.exp < currentTimeSession) {
          logger.warn("Token expired", EventMap.SSO_EXPIRED);

          broadcast<string>(
            EventMap.SSO_EXPIRED,
            "Su sesión ha expirado, por favor vuelva a iniciar sesión"
          );

          modalExpired && handleTokenExpired();
        }

        timeout.current = setInterval(() => {
          const intervalTimeSession = now();

          if (signal?.info?.exp) {
            logger.info("Token status", {
              expiresAt: signal?.info?.exp,
              now: intervalTimeSession,
              shouldExpire: signal?.info?.exp < intervalTimeSession,
            });

            if (signal?.info?.exp < intervalTimeSession) {
              logger.warn("Token expired", EventMap.SSO_EXPIRED);

              broadcast<string>(
                EventMap.SSO_EXPIRED,
                "Su sesión ha expirado, por favor vuelva a iniciar sesión"
              );

              modalExpired && handleTokenExpired();
            }
          }
        }, every(1));
      }

      return () => {
        clearInterval(timeout.current);

        timeout.current = 0;
      };
    }
  }, [signal?.info?.exp, observerToken, modalExpired]);

  React.useEffect(() => {
    if (observerToken) {
      observe<CommonSignalConnection>(EventMap.SIGNAL, (signalRef) => {
        logger.info("MicrofrontHost: useObserver: signal: ", signalRef);

        setSignal(signalRef);

        setLoading(false);
      });

      logger.info("MicrofrontHost: useEffect: broadcast: ", app);
    }
  }, [app, observerToken]);

  const handleTokenExpired = async () => {
    await Swal.fire({
      icon: "error",
      position: "top",
      text: "Tu sesión ha expirado, por favor inicia sesión nuevamente",
      showCloseButton: true,
      showConfirmButton: false
    });

    history.current?.push("/login");
  };

  const context = React.useMemo(() => {
    return {
      ...signal,
      loading,
      onSignal,
      onAcessDenied,
      history: history.current,
      environment: environment,
      ref: {
        lastName: renderName(signal?.user?.lastName),
        firstName: renderName(signal?.user?.firstName),
        role: assign(signal?.info?.realm_access?.roles ?? []),
      },
    };
  }, [signal, loading, environment, onSignal, onAcessDenied]) as ContextProps;

  return (
    <SignalContext.Provider value={context}>
      {layout ? (
        <Layout
          menu={navigation as never}
          includeNavbar={navbar?.(signal as CommonSignalConnection, loading)}
          includeSidebar={sidebar?.(signal as CommonSignalConnection, loading)}
          includeNavbarDropdown={includeNavbarDropdown}
          previousPath={previousPath}
          includeFooter={footer}
        >
          {loading ? <Loading status /> : props.children}
        </Layout>
      ) : (
        <>{loading ? <Loading status /> : props.children}</>
      )}
    </SignalContext.Provider>
  );
});
