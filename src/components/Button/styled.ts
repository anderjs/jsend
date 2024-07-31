import styled, { css } from "styled-components";
import { ButtonProps } from "./types";

type ButtonStyledProps = Pick<
  ButtonProps,
  "fullWidth" | "tabWithHover" | "visuallyDisabled"
>;

/**
 * @description
 * Width styles.
 */
const widthStyles = css`
  width: 100%;
`;

/**
 * @description
 * Styles with hover.
 */
const tabWithHoverStyles = css`
  transition: all 0.2s;

  &:hover {
    margin-left: 0.5rem;
  }
`;


/**
 * @description
 * Styles visually disabled.
 */
const visualStyles = css`
  opacity: 0.5;
  color: white;
`;

export const StyledButton = styled.button<ButtonStyledProps>`
  ${(props) => props.fullWidth && widthStyles}

  ${(props) => props.visuallyDisabled && visualStyles}

  ${(props) => props.tabWithHover && tabWithHoverStyles}
`;
