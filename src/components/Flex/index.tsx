import React from "react";
import { classes } from "./styles";

export const Flex: React.FC<FlexProps> = ({ children, display = true, ...props }) => {

  /**
   * @description
   * Lightweight builder.
   */
  const tailwind = classes.parent({ display, ...props });

  return <div className={tailwind}>{children}</div>;
};

export const FlexItem: React.FC<FlexItemProps> = ({ children, ...props }) => {
  const tailwind = classes.child(props);

  return <div className={tailwind}>{children}</div>;
};

export type FlexProps = {
  gap?: number;
  display?: boolean;
  className?: string;
  direction?: "col" | "row" | "col-reverse" | "row-reverse";
  alignItems?: "center" | "start" | "end";
  justifyContent?: "center" | "start" | "end" | "around" | "between";
  spaceX?: number;
  spaceY?: number;
  children?: React.ReactNode;
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
};

export type FlexItemProps = {
  grow?: 1 | 0;
  shrink?: 1 | 0;
  children?: React.ReactNode;
  self?: "start" | "center" | "end" | "stretch" | "baseline" | "auto";
  basis?: number | string;
  justifySelf?: "auto" | "start" | "end" | "center" | "stretch";
  order?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "first"
    | "last"
    | "none";
  className?: string;
};
