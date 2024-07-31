import React from "react";
import { StyledTextArea } from "./styled";

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
  name,
  rows = 4,
  value,
  onChange,
  textColor,
  borderColor,
  maxLength,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    props.onKeyDown?.(event);
  };

  return (
    <StyledTextArea
      name={name}
      value={value}
      rows={rows}
      textColor={textColor}
      borderColor={borderColor}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={maxLength}
      {...props}
    />
  );
};

export type TextAreaProps = {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  textColor?: string;
  borderColor?: string;
  maxLength?: number;
}
