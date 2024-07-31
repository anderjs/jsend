import React from "react";
import classNames from "clsx";

import { fontWeight, width } from "tailwindcss-classnames";
import { classes } from "../styles";
import { InputProps, StyledInput } from "../index";

export const InputTable: React.FunctionComponent<InputProps> = React.memo(
  (props) => {
    const {
      mode,
      type,
      allow,
      value,
      disabled,
      onChange,
      className,
      isError,
      maxValue,
      minValue,
      placeholder,
      inputField,
      onKeyDown,
      fieldIdentifier,
    } = props;

    /**
     * Manage keyboard interactions for input elements.
     * This function is designed to enhance the user experience in form navigation and input interaction.
     * It provides two main features:
     * 1. Custom navigation between form fields using downKeys.
     * 2. Restriction of input to specific allowed keys for better control over user input.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event triggered on key press.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { downKeys = { next: "Enter", prev: "Shift" } } = props;
      const tabbables: HTMLElement[] = Array.from(
        document.querySelectorAll("input, textarea, [contenteditable]")
      );
      const currentIndex = tabbables.indexOf(e.currentTarget);

      if (e.key === downKeys.next) {
        
        e.preventDefault();

        const nextElement = tabbables[currentIndex + 1];
        if (nextElement) {
          nextElement.focus();

          if (nextElement instanceof HTMLInputElement && nextElement.value) {
            nextElement.select();
          }
        }
      }

      if (e.key === downKeys.prev) {
        e.preventDefault();

        const prevElement = tabbables[currentIndex - 1];

        if (prevElement) {
          prevElement.focus();

          if (prevElement instanceof HTMLInputElement && prevElement.value) {
            prevElement.select();
          }
        }
      }

      if (typeof onKeyDown === "function") {
        onKeyDown(e.currentTarget.value, fieldIdentifier);
      }

      const allowedKeys = [
        "Backspace",
        "ArrowRight",
        "ArrowLeft",
        "ArrowUp",
        "ArrowDown",
        "Delete",
        ...Array.from({ length: 10 }, (_, i) => String(i)),
      ];

      if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (allow === "text") {
        onChange?.(e?.target?.value);
        return; // Asegúrate de salir de la función después de manejar el texto
      }

      if (allow === "number") {
        let numericValue = inputValue.replace(/[^\d]/g, ""); // Eliminar caracteres no numéricos

        if (numericValue.startsWith("00")) {
          numericValue = numericValue.substring(1);
        }

        if (
          numericValue.startsWith("0") &&
          numericValue.length > 1 &&
          !numericValue.startsWith("0.")
        ) {
          numericValue = numericValue.substring(1);
        }

        switch (mode) {
          case "strict":
            // Asegúrate de usar 'numericValue' en lugar de 'processedValue'
            if (numericValue === "1") {
              onChange?.("100");
              return; // Salir de la función después de manejar el caso 'strict'
            }
            onChange?.(
              numericValue === "0" || numericValue === "100" ? numericValue : ""
            );
            return;

          case "range":
            // Asegúrate de usar 'numericValue' en lugar de 'processedValue'
            // eslint-disable-next-line no-case-declarations
            const numericVal = parseInt(numericValue) || 0;
            onChange?.(
              maxValue !== undefined && numericVal > maxValue
                ? maxValue.toString()
                : minValue !== undefined && numericVal < minValue
                ? minValue.toString()
                : numericValue
            );
            return;

          default:
            onChange?.(numericValue); // Usa 'numericValue' para el caso por defecto
        }
      }
      // Si hay más casos para 'allow', pueden agregarse aquí
    };

    const fontStyles =
      value !== "" && value !== "0"
        ? fontWeight("font-bold")
        : fontWeight("font-normal");

    const isFullWidth = props?.fullWidth && width("w-full");

    return (
      <>
        <StyledInput
          autoFocus
          type={type}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          isError={isError}
          placeholder={placeholder}
          inputField={inputField}
          maxValue={maxValue}
          minValue={minValue}
          className={classNames(
            className,
            fontStyles,
            isFullWidth,
            classes.container
          )}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </>
    );
  }
);
