import React from "react";
import styled from "styled-components";

export const Switch: React.FunctionComponent<SwitchProps> = ({
  children,
  color,
  backgroundColor,
  onChange,
  checked,
  disabled,
}) => {
  const handleClick = () => {
    !disabled && onChange?.(!checked);
  };
  return (
    <SwitchContainer>
      {children && <SwitchLabel color={color}>{children}</SwitchLabel>}
      <CheckboxContainer>
        <CheckboxLabel>
          <CheckboxInput checked={checked} onChange={handleClick} />
          <CheckboxButton
            backgroundColor={backgroundColor}
            disabled={disabled}
          />
        </CheckboxLabel>
      </CheckboxContainer>
    </SwitchContainer>
  );
};

export const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SwitchLabel = styled.div<SwitchProps>`
  flex-basis: 60%;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 110%;
  color: ${(props) => props.color || ""};
`;

export const CheckboxContainer = styled.div`
  flex-basis: 25%;
`;

export const CheckboxLabel = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

export const CheckboxInput = styled.input.attrs({
  type: "checkbox",
})<SwitchProps>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CheckboxButton = styled.div<SwitchProps>`
  width: 44px;
  height: 24px;
  background-color: #ddd;
  border-radius: 50px;
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "auto")};

  &:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    height: 20px;
    width: 20px;
    background-color: white;
    border: 2px solid #ccc;
    border-radius: 50%;
    transition: all 0.3s;
  }

  ${CheckboxInput}:checked + & {
    background-color: ${(props) => props.backgroundColor || ""};
    &:after {
      transform: translateX(20px);
      border-color: white;
    }
  }
`;

export type SwitchProps = {
  color?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
};
