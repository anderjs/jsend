import React from "react";
import styled from "styled-components";

export const Row: React.FC<RowProps> = ({ children, ...props }) => {
  return <StyledRow {...props}>{children}</StyledRow>;
};

export const StyledRow = styled.div<RowProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: ${(props) => props.border || "none"};
  height: ${(props) => props.height || "auto"};
  padding: ${(props) => props.padding || "8px"};
  margin-bottom: ${(props) => props.gapBottom || "8px"};
  border-radius: ${(props) => props.borderRadius || "10px"};
  background-color: ${(props) => props.backgroundColor || "#FFFFFF"};
  > * {
    color: ${(props) => props.childrenColor || "inherit"};
  }
`;

export interface RowProps {
  unit?: "px" | "rem" | "em" | "%";
  border?: string;
  height?: string;
  padding?: string;
  gapBottom?: string;
  borderRadius?: string;
  childrenColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}
