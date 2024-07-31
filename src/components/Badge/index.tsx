import React from "react";
import styled from "styled-components";
import { Color } from "@nectiasw/theme";
import { BadgeStatus } from "./types";

export type BadgeProps = {
  color?: string;
  error?: number;
  width?: string;
  height?: string;
  className?: string;
  status?: BadgeStatus;
  onClick?: () => void;
  borderRadius?: string;
  backgroundColor?: string;
  isLabel?: boolean;
  children?: React.ReactNode;
};

export const Badge: React.FunctionComponent<BadgeProps> = ({
  status,
  error,
  width,
  height,
  onClick,
  children,
  className,
  borderRadius,
  backgroundColor = Color.secondary,
  isLabel,
  ...props
}) => {
  const getBackgroundColor = (): string => {
    if (error && error > 0) {
      return Color.danger;
    }

    return backgroundColor;
  };

  const computedBackground = getBackgroundColor();

  return (
    <>
      <StyledBadge
        {...props}
        width={width}
        error={error}
        status={status}
        height={height}
        onClick={onClick}
        className={className}
        borderRadius={borderRadius}
        backgroundColor={computedBackground}
        isLabel={isLabel}
      >
        {children}
      </StyledBadge>
    </>
  );
};

const StyledBadge = styled.div<BadgeProps>`
  font-size: 1em;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  min-width: ${(props) => props.width || "11.5rem"};
  min-height: ${(props) => props.height || "1.4rem"};
  color: ${(props) => props.color || "white"};
  border-radius: ${(props) => props.borderRadius || "6.25rem"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  cursor: default;
  user-select: none;

  &:hover {
    cursor: ${(props) => (props.isLabel ? "default" : "pointer")};
  }
`;

Badge.defaultProps = {
  backgroundColor: Color.secondary,
  status: BadgeStatus.DEFAULT,
};
