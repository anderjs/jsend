import React from "react";
import { OverrideBuilder } from "./builder";

export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "tertiary"
  | "quaternary"
  | "quinary"
  | "senary"
  | "secondarymuted"
  | "danger"
  | "info-outline"
  | "danger-outline"
  | "primary-outline"
  | "darkened-outline"
  | "secondary-outline"

export type ButtonProps = {
  disabled?: boolean;
  variant: Variant;
  children?: React.ReactNode;
  size: "xs" | "sm" | "base" | "lg" | "xl" | "xxl" | "circle";
  fontSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  onClick?: () => void;
  disabledStyle?: string | Record<string, string>;
  Icon?: JSX.Element;
  override?: OverrideBuilder;
  activeAsTab?: boolean;
  className?: string;
  fullWidth?: boolean;
  tabWithHover?: boolean;
  visuallyDisabled?: boolean;
  orientationIcon?: "right" | "left";
};

export type ButtonStyledProps = {
  fullWidth?: boolean;
  tabWithHover?: boolean;
  activeColor?: string;
};
