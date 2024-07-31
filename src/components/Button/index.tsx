import React from "react";

import { StyledButton } from "./styled";
import { ButtonProps } from "./types";
import { Builder } from "./builder";
import { classes } from "./styles";

/**
 * @description
 * Button component with TailwindCSS support and default props for size and variant.
 * The component is styled with styled-components.
 * @param props - ButtonProps
 */

export const Button: React.FunctionComponent<ButtonProps> = React.memo(
  (props) => {
    const { Icon, override } = props;

    const { tailwind } = new Builder(props, override);

    if (props.Icon) {
      return (
        <StyledButton
          type="button"
          className={tailwind}
          onClick={props?.onClick}
          disabled={props.disabled}
          fullWidth={props?.fullWidth}
          tabWithHover={props?.tabWithHover}
        >
          {props.orientationIcon === "left" && (
            <div className={classes.wrap}>
              {Icon} {props.children}
            </div>
          )}
          {props.orientationIcon === "right" && (
            <div className={classes.wrap}>
              {props.children} {Icon}
            </div>
          )}
        </StyledButton>
      );
    }

    return (
      <StyledButton
        type="button"
        className={tailwind}
        onClick={props?.onClick}
        disabled={props.disabled}
        fullWidth={props?.fullWidth}
        tabWithHover={props?.tabWithHover}
      >
        {props.children}
      </StyledButton>
    );
  }
);

Button.defaultProps = {
  size: "sm",
  variant: "primary",
  orientationIcon: "left",
};
