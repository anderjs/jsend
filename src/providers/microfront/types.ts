import { ReactNode } from "react";
import type { UserSystem,} from "@nectiasw/typings"
import type { Root as Info } from "@nectiasw/providers/storage/types";

import type { SidebarProps } from "@nectiasw/components/Sidebar/types";

export interface CommonSignalConnection {
  info: Info;
  token: string;
  user: UserSystem;
  loading: boolean;
  expiresAt: string;
  environment: Record<string, string>;
  refreshToken: string;
}

export type SignalLayoutConnection = (
  signal?: CommonSignalConnection,
  loading?: boolean
) => boolean;

export interface UIArguments {
  app: string;
  footer?: boolean;
  layout?: boolean;
  loading?: boolean;
  navbar?: SignalLayoutConnection;
  sidebar?: SignalLayoutConnection;
  includeNavbarDropdown?: boolean;
  previousPath?: string | boolean;
  observerToken?: boolean;
  observerSignUp?: boolean;
  environment: Record<string, string>;
  modalExpired?: boolean;
  children?: React.ReactNode;
  navigation?: Pick<SidebarProps, "panel" | "options">;
}

export interface MicrofrontProps {
  args?: UIArguments;
  signal?: Partial<CommonSignalConnection>;
  children?: ReactNode;
  onTakeSignal?: (data: CommonSignalConnection) => void;
}

export interface WrappedComponentProps extends MicrofrontProps {
  args?: UIArguments;
}

export type Wrapper = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  args: UIArguments
) => React.FC<P & MicrofrontProps>;

export enum App {
  INDEX = "@app/index",
  WELCOME = "@app/welcome",
  DASHBOARD = "@app/dashboard",
  BACKOFFICE = "@app/backoffice",
  INSCRIPTIONS = "@app/inscriptions",
  COMMUNICATION = "@app/communication",
}
