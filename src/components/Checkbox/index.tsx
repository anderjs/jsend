import React from "react";
import clsx from "clsx";
import { classes } from "./styles";
import { CheckboxIcon, StyledCheckbox } from "./styled";

export type CheckboxIconProps = {
  status?: boolean;
};

export type CheckboxProps = {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
};

/**
 * @description
 * Checkbox component with Tailwind CSS styles. This component is a wrapper of the native HTML checkbox.
 * @example
 * <TwCheckbox id="checkbox" name="checkbox" checked={true} />
 */
export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  disabled,
  onChange,
  className,
}) => {
  const handleClick = () => {
    onChange?.(!checked);
  };

  return (
    <div className={clsx(classes.container.root, className && className)}>
      <StyledCheckbox
        id={id}
        name={name}
        checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={classes.container.input}
      />
      <CheckboxIcon status={checked} onClick={handleClick} />
      {label && (
        <label htmlFor={id} className={classes.container.label}>
          {label}
        </label>
      )}
    </div>
  );
};
