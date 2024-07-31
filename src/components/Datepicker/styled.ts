import styled from "styled-components";
import Datepicker from "react-datepicker";
import { Color } from "@nectiasw/theme";
import type { DatepickerProps } from ".";


export const StyledDatepicker = styled(Datepicker)<DatepickerProps>`
  height: 3.25rem;
  width: 12.5rem;
  border: 1px solid #dfdfdf;
`;

export const StyledTableInput = styled.input<DatepickerProps>`
  padding: 0px 8px;
  font-weight: 700;
  border-radius: 4px;
  border-width: 1px;
  color: ${(props) => (props.disabled ? "#BABABA" : Color.darkened)};
  cursor: ${(props) => (props.disabled ? "default" : "auto")};
  height: 2rem;
  max-width: 100%;
  appearance: none;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${(props) => (props?.disabled ? "transparent" : "white")};
  box-sizing: border-box;
  
  &:focus {
    border-color: ${Color.primary};
    outline: 0;
  }
`;

export const StyledInput = styled.input<DatepickerProps>`
  appearance: none;
  border-radius: 28px;
  border: 1px solid #dfdfdf;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: ${(props) => (props?.disabled ? "transparent" : "white")};
  width: 100%;
  box-sizing: border-box;
  color: ${Color.primary};
  padding: 0.75rem 1rem 0.75rem 3rem !important;

  &:focus {
    border-color: ${Color.primary};
    outline: 0;
  }
`;

export const StyledIcon = styled.span<DatepickerProps>`
  position: absolute;
  left: 1rem;
  z-index: 10;
  margin: 0;
  padding: 0;
  color: ${Color.primary};

  &:hover {
    cursor: ${(props) => (props?.disabled ? "inherit" : "pointer")};
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  margin: 0.5rem;
  justify-content: space-around;
  background-color: #fff;
  font-style: normal;
  gap: 1rem;
`;

export const StyledDay = styled.span`
  text-align: center;
`;
