import React from "react";
import classNames from "clsx";
import { width } from "tailwindcss-classnames";

import { Color } from "@nectiasw/theme";
import styled from "styled-components";

import { classes } from "./styles";
import { InputMode } from "./types";

/**
 * @description
 * Validates whether the input value is exactly "0".
 */
const handleStrictMode = (value: string) => {
  return value === "0" ? "0" : "";
};

/**
 * @description
 * Ensures the input value falls within the specified range, adjusting it if necessary.
 */
const handleRangeMode = (value: number, min?: number, max?: number) => {
  const isAboveMax = max !== undefined && value > max;
  const isBelowMin = min !== undefined && value < min;

  if (isAboveMax) {
    return max.toString();
  }
  if (isBelowMin) {
    return min.toString();
  }
  return value.toString();
};

/**
 * @description
 * Formats an input value as a money string, with a specified maximum length.
 */
const handleMoneyMode = (inputValue: string, maxLength: number) => {
  const effectiveMaxLength = maxLength ?? 10;
  const trimmedValue =
    inputValue.length > effectiveMaxLength
      ? inputValue.substring(0, effectiveMaxLength)
      : inputValue;

  const rawValue = trimmedValue.replace(/\./g, "");
  const numberValue = parseFloat(rawValue);

  return !isNaN(numberValue)
    ? new Intl.NumberFormat("es-CL", {
        style: "decimal",
        maximumFractionDigits: 0,
      }).format(numberValue)
    : "";
};

/**
 * @description
 * Validates and formats a score input, ensuring it falls within a specified range.
 */
const handleScoreMode = (inputValue: string, min?: number, max?: number) => {
  if (inputValue.match(/^(\d{1,2}(\.\d?)?|100)$/) || inputValue === "") {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const isWithinRange =
        (min === undefined || numericValue >= min) &&
        (max === undefined || numericValue <= max);

      if (isWithinRange) {
        return inputValue;
      }
    }
  }

  return "";
};

const handleTextMode = (value: string): string => {
  return value;
};

export const TableInput = React.memo((props: TableInputProps) => {
  const {
    mode,
    value,
    isError,
    onChange,
    onKeyDown,
    fieldIdentifier,
    maxValue,
    minValue,
    fullWidth,
    className,
    borderRadius,
    allowedKeys: propAllowedKeys,
    maxLength = 10,
    disabled,
  } = props;

  /**
   * @description
   * Checks if a component should have full width based on the `fullWidth` prop.
   */
  const isFullWidth = fullWidth && width("w-full");

  /**
   * @description
   * Default set of allowed keys for keyboard input, including numbers and common navigation keys.
   */
  const defaultAllowedKeys = [
    "Backspace",
    "ArrowRight",
    "ArrowLeft",
    "ArrowUp",
    "ArrowDown",
    "Delete",
    "Tab",
    ".",
    ...Array.from({ length: 10 }, (_, i) => String(i)),
  ];

  /**
   * @description
   * Assign the allowed keys for each mode.
   */
  const allowedKeysByMode = {
    [InputMode.Money]: [...defaultAllowedKeys],
    [InputMode.Score]: [...defaultAllowedKeys],
    [InputMode.Strict]: [...defaultAllowedKeys],
    [InputMode.Range]: [...defaultAllowedKeys],
    [InputMode.Email]: [
      ...defaultAllowedKeys,
      "@",
      "-",
      "_",
      ...Array.from({ length: 10 }, (_, i) => String(i)),
      ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)),
      ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97)),
    ],
    [InputMode.Default]: [
      ...defaultAllowedKeys,
      ",",
      " ",
      "Space",
      "#",
      "´",
      "°",
      "-",
      "Á",
      "É",
      "Í",
      "Ó",
      "Ú",
      "á",
      "é",
      "í",
      "ó",
      "ú",
      "Ñ",
      "ñ",
      ...Array.from({ length: 10 }, (_, i) => String(i)),
      ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)),
      ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97)),
    ],
  };

  /**
   * @description
   * Retrieves the allowed keys according to the mode.
   */
  const getAllowedKeysForMode = (mode: InputMode) => {
    return allowedKeysByMode[mode] || defaultAllowedKeys;
  };

  /**
   * @description
   * Determines the set of allowed keys for keyboard input. It can use custom keys from props or defaults.
   */
  const allowedKeys =
    propAllowedKeys ?? getAllowedKeysForMode(mode as InputMode);

  /**
   * @description
   * Focuses on an HTML element and selects its content if it's an input element with a non-empty value.
   */
  const focusElement = (element: HTMLElement) => {
    element.focus();
    if (element instanceof HTMLInputElement && element.value) {
      element.select();
    }
  };

  /**
   * @description
   * Navigates to the next or previous element in a list of tabbable elements.
   */
  const navigateToElement = (
    e: React.KeyboardEvent<HTMLInputElement>,
    direction: "next" | "prev",
    tabbables: HTMLElement[]
  ) => {
    const currentIndex = tabbables.indexOf(e.currentTarget);
    const targetElement =
      tabbables[direction === "next" ? currentIndex + 1 : currentIndex - 1];

    if (targetElement) {
      focusElement(targetElement);
    }
  };

  /**
   * @description
   * Handles keyboard events, including navigation and key validation.
   * - Navigates between form fields based on custom keys.
   * - Limits input to predefined allowed keys.
   * - Calls a custom `onKeyDown` function if provided.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { downKeys = { next: "Enter", prev: "Shift" } } = props;
    const tabbables: HTMLElement[] = Array.from(
      document.querySelectorAll("input, textarea, [contenteditable]")
    );

    if (e.key === downKeys.next) {
      e.preventDefault();
      navigateToElement(e, "next", tabbables);
      return;
    }

    if (e.key === downKeys.prev) {
      e.preventDefault();
      navigateToElement(e, "prev", tabbables);
      return;
    }

    if (typeof onKeyDown === "function") {
      onKeyDown(e.currentTarget.value, fieldIdentifier);
      return;
    }

    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * @description
   * Handles input value changes based on the selected input mode.
   * - Utilizes different validation and formatting functions depending on the mode.
   * - Updates the input value and triggers the `onChange` callback.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      switch (mode) {
        case InputMode.Default:
          return handleTextMode(e.target.value);

        case InputMode.Money:
          return handleMoneyMode(e.target.value, maxLength);

        case InputMode.Score:
          return handleScoreMode(e.target.value, minValue, maxValue);

        case InputMode.Strict:
          return e.target.value === "1"
            ? "100"
            : handleStrictMode(e.target.value);

        case InputMode.Range:
          return handleRangeMode(
            parseInt(e.target.value) || 0,
            minValue,
            maxValue
          );

        case InputMode.Email:
          return e.target.value;

        default:
          return e.target.value;
      }
    })();

    e.target.value = newValue;
    onChange?.(newValue);
  };

  return (
    <StyledInput
      mode={mode}
      isError={isError}
      minValue={minValue}
      maxValue={maxValue}
      maxLength={maxLength}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={classNames(className, isFullWidth, classes.container)}
      allowedKeys={allowedKeys}
      borderRadius={borderRadius}
      disabled={disabled}
      value={value}
    />
  );
});

interface StyledProps {
  disabled?: boolean;
  children?: React.ReactNode;
  mode?: InputMode;
  isError?: boolean;
  maxValue?: number;
  minValue?: number;
  borderRadius?: string;
  allowedKeys?: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const borderColor = (isError?: boolean) =>
  isError ? Color.danger : Color.opaque;

export const StyledInput = styled.input<StyledProps>`
  padding: 0px 8px;
  font-weight: 700;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "4px"};
  border-color: ${(props) => borderColor(props.isError)};
  border-width: 1px;
  background: ${(props) => (props.disabled ? Color.disabled : "white")};
  color: ${(props) => (props.disabled ? "#BABABA" : Color.darkened)};
  cursor: ${(props) => (props.disabled ? "default" : "auto")};
  height: 2rem;
  max-width: 100%;
`;

export type TableInputProps = {
  value?: string | number;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  downKeys?: DownKeys;
  isError?: boolean;
  children?: React.ReactNode;
  mode?: InputMode;
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
  placeholder?: string;
  borderRadius?: string;
  fieldIdentifier?: string;
  allowedKeys?: string[];
  onChange?: (value: string | number) => void;
  onKeyDown?: (value: string | number, fieldIdentifier?: string) => void;
};

type DownKeys = {
  next: string;
  prev: string;
};
