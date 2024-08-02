import styled from "styled-components";
import { DragareaProps } from "./types";

export const Dropzone = styled.div<DragareaProps>`
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "10rem"};
  border: 1px dashed ${({ borderColor }) => borderColor};
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

export const Message = styled.div`
  margin: 0;
  padding: 10px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  font-style: normal;
  font-family: Roboto;
  color: ${(props) => props.color || "#939799"};
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.div<DragareaProps>`
  color: white;
  display: flex;
  margin: 0.5rem 0;
  flex-direction: row;
  border-radius: 1.25rem;
  padding: 0.25rem 0.75rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;
