import styled from "styled-components";
import { IDisclosureProps, TimelineDashedProps } from "./types";

/**
 * @description
 * Styled Disclosure Component API.
 */
export const StyledDisclosure = styled.div<IDisclosureProps>`
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: ${({ isOpen }) => (isOpen ? "10rem" : "0")};
  width: 100%;
  grid-column: span 9;
  padding-left: 27px;
  background-color: #f0f0f0;
  font-size: 14px;
  color: #888888;
  overflow-y: auto;
`;


export const TimelineDashed = styled.div<TimelineDashedProps>`
  position: absolute;
  border-left: 2px dashed #ccc;
  border-color: #ccc;
  height: ${(props) => props.lineHeight};
  max-height: "10rem";
`;

/**
 * @description
 * TimeLineUnion Normal Stage API.
 */
export const TimelineUnion = styled.div`
  position: absolute;
  border-left: 2px dashed #ccc;
  border-color: #ccc;
  height: 37px;
  left: 15px;
  top: 25px;
`;