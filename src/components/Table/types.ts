/* eslint-disable @typescript-eslint/ban-types */
import { ButtonProps } from "@nectiasw/components/Button/types";
import React from "react";

export type Heading<T = {}> = {
  title: string;
  tooltip?: string;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  sort?: "ASC" | "DESC" | "DEFAULT";
  sortabled?: boolean;
  clear?: boolean;
  alias?: keyof T;
};

/**
 * @description
 * This file contains the types for the Table component.
 */
export type TableProps = {
  auto?: boolean;
  onSort?: (field: string, index?: number) => void;
  onReset?: () => void;
  fixedHeader?: boolean;
  index?: number;
  headers: string[] | Heading[];
  widths?: number[];
  children: React.ReactNode;
  cellSpacing?: number;
  cellPadding?: number;
  className?: string;
  filter?: string;
  unit?: "%" | "px" | "rem";
  checked?: boolean;
  hasCheckbox?: boolean;
  onChangeCheckbox?: (checked: boolean) => void;
  headerClassName?: string;
};

export type TableDataProps = {
  last?: boolean;
  asError?: boolean;
  first?: boolean;
  overflow?: boolean;
  innerText?: string;
  className?: string;
  formatAsCLP?: boolean;
  formatAsRut?: boolean;
  formatAsDate?: boolean;
  overflowWrap?: boolean;
  formatAsNumber?: boolean;
  formatAsStatus?: boolean;
  formatAsPercentage?: boolean;
  formatAsDigits?: boolean;
  children?: React.ReactNode;
  color?: string;
  dataId?: number;
  checked?: boolean;
  hasCheckbox?: boolean;
  icons?: React.ReactNode[];
  align?: "left" | "center" | "right";
  iconJustify?: "center" | "start" | "end" | "between" | "around";
  onClickDetail?: () => void;
  onChangeCheckbox?: (checked: boolean, dataId?: number) => void;
  detailText?: string;
  detailDisabled?: boolean;
  detailVariant?: ButtonProps["variant"];
  indexed?: boolean;
  hasRadioButton?: boolean;
  onChangeRadioButton?: (value: string | undefined) => void;
  isFixed?: boolean;
  right?: string;
  
};

export type TableRowProps = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  disabled?: boolean;
};

export type TableStatusProps = {
  id?: number;
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  text?: TableDataProps["detailText"];
  disabled?: TableDataProps["detailDisabled"];
  variant?: ButtonProps["variant"];
  value: "Normal" | "Cerrado" | "Crítico" | "Por emisión OC";
};

export type TableColProps = {
  width?: number;
  unit?: "%" | "px" | "rem";
};
