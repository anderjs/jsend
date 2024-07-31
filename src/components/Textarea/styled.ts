import styled from 'styled-components'
import { TextAreaProps } from './index';

export const StyledTextArea = styled.textarea<TextAreaProps>`
  width: 100%;
  resize: none;
  outline: none;
  cursor: auto;
  line-height: 120%;
  padding: 1rem 1.25rem;
  border-radius: 1.25rem;
  color: ${(props) => props.textColor};
  border: 1px solid ${(props) => props.borderColor};

  ::-webkit-scrollbar {
    width: 0.25em;

  }

  ::-webkit-scrollbar-track {
    background: #f0f0f0;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.25em;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;