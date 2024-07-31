import { IN_Permission, SP_Permission } from "@nectiasw/providers/permissions/types";

export enum System {
  SIGN = "Firma Digital",
  SP_V2 = "Sistema de Perfilamiento v2",
  OPTIMUS = "Integra Negocio",
}

export type Args = {
  roles?: IN_Permission [];
  system?: System;
  defaultSystemInterception?: System;
};

export type Rule = {
  allow?: IN_Permission [] | SP_Permission [];
  system?: string;
  systems?: System[];
  passport?: boolean;
};

export type SidebarOptions = {
  path: string;
  title: string;
  rules?: Rule;
  icon?: React.JSX.Element;
  except?: (string | RegExp)[];
};

export type SidebarProps = {
  open?: boolean;
  title?: string;
  panel?: SidebarOptions [];
  selected?: string;
  options?: SidebarOptions [];
  onToggle?: () => void;
};
