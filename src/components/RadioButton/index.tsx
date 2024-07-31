import React from "react";
import { classes } from "./styles";
import styled from "styled-components";

export const RadioButton: React.FunctionComponent<RadioButtonProps> =
  React.memo(({ className, name, value, checked, disabled, onClick }) => {
    const handleClick = () => {
      onClick?.(value);
    };

    return (
      <div className={classes.container.root + className}>
        <StyledRadioButton
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onClick={handleClick}
        />
      </div>
    );
  });

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
};

export const StyledRadioButton = styled.input.attrs({ type: "radio" })`
  appearance: none;

  border: 3px solid #f3f3f3;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 4px;
  margin: 2px;
  background-color: #f3f3f3;
  outline: 1px solid #999;
  transition: background-color 0.2s linear, outline 0.2s linear;

  &:checked {
    background-color: #316772;
    outline: 1px solid #316772;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export type RadioButtonProps = {
  className?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: (value: string | undefined) => void;
};
