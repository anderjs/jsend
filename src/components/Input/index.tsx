import React from "react";
import classNames from "clsx";
import styled from "styled-components";
import { fontWeight, width } from "tailwindcss-classnames";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { classes } from "./styles";
import { Color } from "@nectiasw/theme";

const defaults = {
  value: "",
  type: "text",
};

export const Input: React.FunctionComponent<InputProps> = React.memo(
  (props) => {
    const {
      AddOn,
      error,
      disabled,
      className,
      allow,
      placeholder,
      value,
      onEdit,
      onDelete,
      onChange,
      maxLength,
      minLength,
      validation,
      completed,
      length,
      type,
      minValue,
    } = props;

    const getMaxLength = React.useMemo<number | undefined>(() => {
      if (allow === "text") {
        return length;
      }

      switch (validation) {
        case "sence":
          return senceCodeLength;

        case "amount":
          return amountLength;

        default:
          return undefined;
      }
    }, [validation, allow, length]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (allow === "text") {
        return onChange?.(e?.target?.value);
      }

      if (allow === "number" && minLength && maxLength) {
        /**
         * Replace non digit values.
         */
        let value = e?.target?.value.replace(/\D/g, "");

        /**
         * Check that is a number.
         */
        const isNumber = /^\d+$/.test(value);

        if (
          isNumber &&
          typeof maxLength === "number" &&
          typeof minLength === "number"
        ) {
          if (minLength > 0) {
            const zero = /^0+(?!$)/g;

            if (zero.test(value)) {
              value = value.replace(zero, "");
            }
          }

          /**
           * @description
           * Check minimum value.
           */
          if (+value < minLength || +value > maxLength) {
            return;
          }
        }
      }

      /**
       * Replace non digit values.
       */
      let value = e?.target?.value.replace(/\D/g, "");

      /**
       * Check that is a number.
       */
      const isNumber = /^\d+$/.test(value);

      if (
        isNumber &&
        typeof maxLength === "number" &&
        typeof minLength === "number"
      ) {
        if (minLength > 0) {
          const zero = /^0+(?!$)/g;

          if (zero.test(value)) {
            value = value.replace(zero, "");
          }
        }
      }

      /**
       * @description
       * Not allowing to put more than one zero.
       */
      if (minLength === 0 && value.startsWith("0")) {
        const onlyOneZeroRegex = /^0$/;

        if (!onlyOneZeroRegex.test(value)) {
          return;
        }
      }

      /**
       * @description
       * Check minimum value.
       */
      if (isNumber && minValue && minValue > Number(value)) {
        return;
      }

      if (validation === "sence" && isNumber) {
        if (allow === "number" || value === defaults.value) {
          return onChange?.(value);
        }

        return;
      }

      if (validation === "amount" && isNumber) {
        if (allow === "number" && value.length <= amountLength) {
          return onChange?.(value);
        }

        if (value === defaults.value) {
          return onChange?.(value);
        }

        return;
      }

      onChange?.(value);
    };

    const handleClickEdit = (): void => {
      onEdit?.();
    };

    const handleClickDelete = (): void => {
      onDelete?.();
    };

    const formatValueAsCLP = React.useCallback(
      (value?: string) => {
        if (validation === "amount" && value !== undefined) {
          if (props?.zeros) {
            let amount = value;

            if (amount.startsWith("0")) {
              const zero = /^0+(?!$)/g;

              if (zero.test(value)) {
                amount = amount.replace(zero, "");
              }
            }

            // Aplicamos la separación de miles solo si es necesario
            const formattedAmount = amount.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            );

            return formattedAmount ?? defaults.value;
          }

          const amount = value === "0" ? defaults.value : value;

          // Eliminamos los ceros iniciales utilizando una expresión regular
          const sanitizedAmount = amount.replace(/^0+/, "");

          // Aplicamos la separación de miles solo si es necesario
          const formattedAmount = sanitizedAmount.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            "."
          );

          return formattedAmount ?? defaults.value;
        }

        return value;
      },
      [validation, props.zeros]
    );

    const fontStyles =
      value !== "" && value !== "0"
        ? fontWeight("font-bold")
        : fontWeight("font-normal");

    const isFullWidth = props?.fullWidth && width("w-full");

    if (error) {
      return (
        <div className={classes.relativeAddOff}>
          <StyledInput
            type={type}
            value={value}
            onChange={handleChange}
            maxLength={getMaxLength}
            placeholder={placeholder}
            disabled={disabled || error}
            className={classNames(
              className,
              fontStyles,
              isFullWidth,
              classes.container
            )}
            autoFocus
            autoComplete="off"
          />
          <StyledIconEdit
            className={classes.flow}
            onClick={handleClickDelete}
          />
          <StyledIconEdit className={classes.flow} onClick={handleClickDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-info hover:cursor-pointer hover:text-primary"
            >
              <path
                className="flex items-center justify-center"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </StyledIconEdit>
        </div>
      );
    }

    if (completed) {
      return (
        <div className={classes.relativeAddOff}>
          <StyledInput
            type={type}
            value={value}
            onChange={handleChange}
            maxLength={getMaxLength}
            placeholder={placeholder}
            disabled={disabled || completed}
            className={classNames(
              className,
              fontStyles,
              isFullWidth,
              classes.container
            )}
            autoFocus
            autoComplete="off"
          />
          <StyledIconEdit className={classes.flow} onClick={handleClickEdit}>
            <XMarkIcon className="w-5 h-5 text-info hover:cursor-pointer hover:text-primary" />
          </StyledIconEdit>
        </div>
      );
    }

    if (AddOn) {
      return (
        <div className={classes.relativeAddOn}>
          <StyledIconContainerAddon disabled={props.disabled}>
            {AddOn}
          </StyledIconContainerAddon>
          <StyledInputAddon
            autoFocus
            type={type}
            name="CLP"
            value={formatValueAsCLP(value)}
            disabled={disabled}
            onChange={handleChange}
            maxLength={getMaxLength}
            className={classNames(
              className,
              fontStyles,
              isFullWidth,
              classes.container
            )}
            placeholder={placeholder}
            autoComplete="off"
          />
        </div>
      );
    }

    return (
      <StyledInput
        autoFocus
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        maxLength={getMaxLength}
        placeholder={placeholder}
        className={classNames(
          className,
          fontStyles,
          isFullWidth,
          classes.container
        )}
        autoComplete="off"
      />
    );
  }
);

const senceCodeLength = 10;

const amountLength = 18;

interface StyledProps {
  inputField?: boolean;
  minValue?: number;
  maxValue?: number;
  value?: string | number;
  isError?: boolean;
}
const borderColor = (isError?: boolean) =>
  isError ? Color.danger : Color.opaque;

export const StyledInput = styled.input<StyledProps>`
  padding: 0.75rem 1.25rem 0.75rem 1.25rem;

  font-weight: 700;
  border-radius: ${(props) => (props.inputField ? "12px" : "28px")};
  border-color: ${(props) => borderColor(props.isError)};
  border-width: 1px;
  color: ${Color.primary};
  height: 3.25rem;
`;

export const StyledInputBold = styled(StyledInput)`
  font-weight: small;
  background: transparent;
`;

export const StyledInputAddon = styled.input`
  padding: 0.75rem 0px 0.75rem 0px;
  border-radius: 0px 28px 28px 0px;
  border-color: ${Color.opaque} ${Color.opaque} ${Color.opaque} transparent;
  border-width: 1px;
  color: ${Color.primary};
  height: 3.25rem;
`;

export const StyledIconContainerAddon = styled.div<InputProps>`
  background-color: ${(props) => (props.disabled ? "transparent" : "white")};
  border-radius: 28px 0 0 28px;
  border-color: ${Color.opaque} transparent ${Color.opaque} ${Color.opaque};
  border-width: 1px;
  color: ${Color.primary};
  padding: 0.75rem 0.5rem 0.75rem 1.25rem;
  height: 3.25rem;
  display: flex;
  align-items: center;
`;

export const StyledIconEdit = styled.div`
  margin: 5px;
  border-radius: 24px;
  padding: 0.75rem 1.25rem 0.75rem 1.25rem;
  transition: background-color 0.3s ease-in-out;
`;

export const StyledIconDelete = styled.div`
  padding: 0.75rem 1.25rem 0.75rem 1.25rem;
  border-radius: 24px;
  background-color: ${Color.danger};
  margin: 5px;
`;

export type InputProps = {
  date?: Date;
  value?: string;
  error?: boolean;
  length?: number;
  fullWidth?: boolean;
  completed?: boolean;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  AddOn?: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onChange?: (value: string) => void;
  type?: "text" | "password";
  allow?: "text" | "number" | "date" | "decimals";
  zeros?: boolean;
  validation?: "sence" | "length" | "amount" | "score";
  minValue?: number;
  maxValue?: number;
  fieldIdentifier?: string;
  score?: boolean;
  onKeyDown?: (value: string | number, fieldIdentifier?: string) => void;
  downKeys?: DownKeys;
  inputField?: boolean;
  isError?: boolean;
  mode?: "strict" | "score" | "range";
};

type DownKeys = {
  next: string;
  prev: string;
};

export type FormatValueProps = {
  value: string;
  allow: "number" | string;
  onChange?: (value: string) => void;
};
