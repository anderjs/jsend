import styled from "styled-components";
import { HiOutlineCheck } from "react-icons/hi";
import { CheckboxIconProps } from ".";

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  border: 2px solid #939799;
  background-color: #f3f3f3;
  /* add styles for checked state */
  &:checked {
    background-color: #316772;
    border-color: #316772;
  }

  /* add styles for disabled state */
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  transition: background-color 0.2s linear, border-color 0.2s linear;
`;

export const CheckboxIcon = styled(HiOutlineCheck)<CheckboxIconProps>`
  position: absolute;
  top: 50%;
  right: 0.125rem;
  transform: translateY(-50%);
  color: ${(props) => (props.status ? "#FFFFFF" : "transparent")};
  margin: 0;
  padding: 0;
  z-index: 1;
  font-size: 20px;
  transition: color 0.2s linear;
`;

StyledCheckbox.defaultProps = {
  type: "checkbox",
};
