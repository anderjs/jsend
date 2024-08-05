/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import { SelectProps } from ".";

import styled from "styled-components";


type PartialProps = Partial<Omit<SelectProps, "children" | "placeholder">>;


function getColor(
  variant: SelectProps["variant"],
  disabled?: SelectProps["disabled"]
) {
  if (disabled) {
    return "#dfdfdf";
  }

  switch (variant) {
    case "secondary":
      return "#316772";

    case "primary":
      return "#316772";

    case "outline":
      return "#65BFB1";

    case "outlined-primary":
      return "#316772";

    case "outlined-black":
      return "#464646";

    case "outlined-gray":
      return "#316772";

    case "hours":
      return "#939799";
  }
}

function getHoverColor(
  variant: SelectProps["variant"],
  disabled?: SelectProps["disabled"]
) {
  if (disabled) {
    return "#dfdfdf";
  }

  switch (variant) {
    case "secondary":
      return "#316772";

    case "primary":
      return "#65BFB1";

    case "outline":
      return "#FFFFFF";

    case "outlined-primary":
      return "#FFFFFF";

    case "outlined-black":
      return "#464646";

    case "outlined-gray":
      return "#316772";

    case "hours":
      return "#939799";
  }
}

function getBorderColor(
  variant: SelectProps["variant"],
  disabled?: SelectProps["disabled"]
) {
  if (disabled) {
    return "#dfdfdf";
  }

  switch (variant) {
    case "secondary":
      return "#316772";

    case "primary":
      return "#316772";

    case "outline":
      return "#65BFB1";

    case "outlined-primary":
      return "#65BFB1";

    case "outlined-black":
      return "#DFDFDF";

    case "outlined-gray":
      return "#DFDFDF";

    case "hours":
      return "#939799";
  }
}

function getHoverBorderColor(
  variant: SelectProps["variant"],
  disabled?: SelectProps["disabled"]
) {
  if (disabled) {
    return "#dfdfdf";
  }

  switch (variant) {
    case "secondary":
      return "#316772";

    case "primary":
      return "#316772";

    case "outline":
      return "#65BFB1";

    case "outlined-primary":
      return "#65BFB1";

    case "outlined-black":
      return "#DFDFDF";

    case "outlined-gray":
      return "#B3B3B3";

    case "hours":
      return "#939799";
  }
}

function getOptionColor(variant: SelectProps["variant"]) {
  switch (variant) {
    case "secondary":
      return "#FFFFFF";

    case "primary":
      return "#316772";

    case "outline":
      return "#65BFB1";

    case "outlined-primary":
      return "#316772";

    case "outlined-black":
      return "#464646";

    case "outlined-gray":
      return "#316772";

    case "hours":
      return "#316772";
  }
}

function menuBorderColor(variant: SelectProps["variant"]) {
  switch (variant) {
    case "secondary":
      return "#FFFFFF";

    case "primary":
      return "#316772";

    case "outline":
      return "#65BFB1";

    case "outlined-primary":
      return "#65BFB1";

    case "outlined-gray":
      return "#B3B3B3";

    case "outlined-black":
      return "#65BFB1";

    case "hours":
      return "#65BFB1";
  }
}

function getVariant(variant: SelectProps["variant"]) {
  switch (variant) {
    case "secondary":
      return "#316772";

    case "primary":
      return "#65BFB1";

    case "outline":
      return "#FFFFFF";

    case "outlined-primary":
      return "#FFFFFF";

    case "outlined-black":
      return "#464646";

    case "outlined-gray":
      return "#316772";

    case "hours":
      return "#939799";
  }
}

function getBackground(variant: SelectProps["variant"]) {
  switch (variant) {
    case "secondary":
      return "#65BFB1";

    case "primary":
      return "#316772";

    case "outline":
      return "#65BFB1";

    case "outlined-primary":
      return "#65BFB1";

    case "outlined-black":
      return "#FFFFFF";

    case "hours":
      return "#FFFFFF";
  }
}

function getHeight(size: SelectProps["size"]) {
  switch (size) {
    case "xs":
      return "1.125rem";
    case "sm":
      return "1.5rem";
    case "base":
      return "2rem";
    case "lg":
      return "2.5rem";
    case "xl":
      return "3rem";
    case "xxl":
      return "3rem";
  }
}

function getFontSize(
  size: SelectProps["size"],
  option?: SelectProps["optionFontSize"]
) {
  if (option) {
    return option;
  }

  switch (size) {
    case "xs":
      return "0.75rem";

    case "sm":
      return "0.875rem";

    case "base":
      return "1rem";

    case "lg":
      return "1.125rem";

    case "xl":
      return "1.125rem";

    case "xxl":
      return "1.25rem";
  }
}

function getBorderRadius(variant: SelectProps["variant"]) {
  switch (variant) {
    case "outlined-black":
      return "4px";

    case "outlined-gray":
      return "4px";

    default:
      return "25px";
  }
}

function getBorderOptionRadius(variant: SelectProps["variant"]) {
  switch (variant) {
    case "outlined-black":
      return "4px";

    case "outlined-gray":
      return "4px";

    default:
      return "18px";
  }
}

export const StyledSelect: any = styled(Select)<PartialProps>`
  .react-select__control {
    border-radius: ${({ variant }) => variant && getBorderRadius(variant)};
    border-color: ${({ variant, disabled }) =>
      variant && getBorderColor(variant, disabled)};

    &:focus-within {
      box-shadow: none;
      border-color: ${({ variant, disabled }) =>
        variant && getBorderColor(variant, disabled)};
    }

    &:hover {
      cursor: ${(props) => (props.hours ? "initial" : "pointer")};
      color: ${({ variant }) => variant && getHoverColor(variant)};
      border-color: ${({ variant, disabled }) =>
        variant && getHoverBorderColor(variant, disabled)};
      background: ${({ variant }) => variant && getBackground(variant)};

      .react-select__dropdown-indicator {
        color: ${({ variant }) => variant && getVariant(variant)};
      }

      .react-select__single-value,
      .react-select__placeholder {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: "Roboto", sans-serif;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        font-size: ${({ size }) => size && getFontSize(size)};
        font-weight: 500;
        color: ${({ variant }) => variant && getVariant(variant)};
      }
    }

    &:active {
      border-color: ${({ variant }) => variant && getBorderColor(variant)};
    }

    & .react-select__value-container {
      padding-left: 15px;
      padding-right: 15px;
      min-height: ${({ size }) => size && getHeight(size)};
    }

    & .react-select__dropdown-indicator {
      color: ${({ variant, disabled }) =>
        variant && getColor(variant, disabled)};
      padding: 7px 8px;
    }

    & .react-select__single-value,
    .react-select__placeholder {
      font-family: "Roboto", sans-serif;
      font-size: ${({ size }) => size && getFontSize(size)};
      font-weight: 500;
      color: ${({ variant }) => variant && getColor(variant)};
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }
  }

  .react-select__control--is-focused {
    border-color: ${({ variant }) => variant && getBorderColor(variant)};
  }

  .react-select__control--is-focused:hover {
    border-color: ${({ variant }) => variant && getBorderColor(variant)};
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__option {
    font-family: "Roboto", sans-serif;
    font-size: ${({ size }) => size && getFontSize(size)};
    color: ${({ variant }) => variant && getOptionColor(variant)};
    padding: 13px, 16px, 13px, 16px;

    &:hover {
      cursor: pointer;
      background-color: #f3f3f3;
    }
  }

  .react-select__menu {
    position: ${({ position }) => (position ? position : "absolute")};
    border: 1px solid ${({ variant }) => variant && menuBorderColor(variant)};
    border-radius: ${({ variant }) =>
      variant && getBorderOptionRadius(variant)};
    max-width: auto;
  }

  .react-select__menu-list {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    max-height: ${({ listHeight }) => (listHeight && `${listHeight}px`)}; 
  }

  &:hover .react-select__dropdown-indicator {
    color: ${({ variant }) => variant && getVariant(variant)};
  }

  @media (max-width: 1024px) {
    .react-select__control {
      font-size: 0.875rem;
    }

    .react-select__option {
      font-size: ${(props) => props?.optionFontSize ?? "0.875rem"};
    }

    .react-select__single-value,
    .react-select__placeholder {
      font-size: 0.875rem;
    }
  }
`;

StyledSelect.defaultProps = {
  classNamePrefix: "react-select",
};
