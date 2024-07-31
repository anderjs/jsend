import styled, { css } from "styled-components";
import type { TooltipProps } from ".";

type TooltipTextProps = {
  zIndex?: number;
  visible: boolean;
  maxWidth?: number | string;
  infoWidth?: number;
  orientation?: TooltipProps["orientation"];
};

type TooltipArrowProps = {
  orientation?: TooltipProps["orientation"];
};

type TooltipContainerProps = {
  tableHead?: boolean;
  zIndex?: number;
  tableData?: boolean;
};

export const arrow = (prop: TooltipProps["orientation"]) => {
  switch (prop) {
    case "top":
      return css`
        top: 100%;
        left: 50%;
        transform: rotate(180deg);
      `;

    case "left":
      return css`
        top: 100%;
        right: 2.5%;
        transform: rotate(180deg);
      `;

    case "right":
      return css`
        top: 100%;
        left: 2.5%;
        transform: rotate(180deg);
      `;

    case "bottom":
      return css`
        left: 50%;
        bottom: 100%;
        transform: rotate(0deg);
      `;
    
    case "bottom-left":
      return css`
        left: 93%;
        bottom: 100%;
        transform: rotate(0deg);
      `;
  }
};

export const orientation = (prop: TooltipProps["orientation"]) => {
  switch (prop) {
    case "top":
      return css`
        left: 50%;
        bottom: calc(100% + 5px);
        transform: translateX(-50%);
      `;

    case "left":
      return css`
        right: 30%;
        bottom: 115%;
        transform: translateX(0%);
      `;

    case "right":
      return css`
        left: 50%;
        bottom: 115%;
        transform: translateX(0%);
      `;

    case "bottom":
      return css`
        left: 50%;
        top: calc(100% + 5px);
        transform: translateX(-50%);
      `;

    case "bottom-left":
      return css`
        right: 70%;
        top: 120%;
        transform: translateX(6.5%);
      `;
  }
};

export const TooltipContainer = styled.div<TooltipContainerProps>`
  position: ${props => props.tableData ? 'static' : 'relative'};
  display: ${(props) => (props.tableHead ? "block" : "inline-block")};
  z-index: ${(props) => props?.zIndex ?? "auto"};
  max-width: 100%;
  
  ${props => props.tableData && `
    right: 12.5%;
    top: 47%;
  `}

`;

export const TooltipText = styled.div<TooltipTextProps>`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  position: absolute;
  ${(props) => orientation(props.orientation)}
  background-color: #464646;
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  white-space: ${(props) => props.infoWidth ? 'normal' : 'nowrap'};
  max-width: ${(props) =>   props.infoWidth ? 'none' : `${props.maxWidth}px`};
  text-overflow: inherit;
  width: ${(props) =>  props.infoWidth ? `${props.infoWidth}px` : 'auto'};
  z-index: ${(props) => props?.zIndex};
 
`;

export const TooltipArrow = styled.div<TooltipArrowProps>`
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #464646;
  ${(props) => arrow(props.orientation)}
`;

TooltipText.defaultProps = {
  maxWidth: 300,
};
