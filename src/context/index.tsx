import React, { ReactNode } from "react";
import { BrowserHistory } from "history";
import { CommonSignalConnection } from "./types";

export type SignalProps = {
  ref: ContextProps;
  children?: ReactNode;
};

/**
 * @description
 * Context props.
 */
export type ContextProps = Partial<CommonSignalConnection> & {
  ref?: RefUser;
  loading?: boolean;
  expanded?: boolean;
  history?: BrowserHistory;
  environment?: Record<string, string>;
  onExpand?: (status?: boolean) => void;
  onSignal?: (signal?: CommonSignalConnection) => void;
  onAcessDenied?: (route: string) => void;
};

export type RefUser = {
  role: string;
  lastName: string;
  firstName: string;
};

/**
 * @description
 * A context to be used in the components that need to communicate with each other.
 */
export const SignalContext = React.createContext<ContextProps>(
  {} as ContextProps
);