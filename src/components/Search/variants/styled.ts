import styled, { keyframes } from "styled-components";

// - Colors
import { Color } from "@nectiasw/theme";

type SkeletonProps = {
  width?: number;
};

type WithTheme = {
  theming?: Color;
}

const jPsUWd = keyframes`

  0% {
    background-position: -400px 0;
  }
  100% {

    background-position: 400px 0;
  }
`;

export const SkeletonDropdownItem = styled.div<SkeletonProps>`
  cursor: pointer;
  color: rgb(49, 103, 114);
  position: relative;
  padding: 0.75rem;
  margin: 1rem;
  border-radius: 12px;
  overflow: hidden;
  width: ${(props) => (props?.width ? `${props.width}%` : "auto")};
  animation: 3s linear 0s infinite normal none running ${jPsUWd};
  background: linear-gradient(
      to right,
      rgb(238, 238, 238) 8%,
      rgb(221, 221, 221) 18%,
      rgb(238, 238, 238) 33%
    )
    0% 0% / 400px 104px;
`;

export const SearchContainer = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  position: relative;
`;

export const SearchBar = styled.div<WithTheme>`
  display: flex;
  align-items: center;
  border: ${(props) => `solid 1px ${props.theming}`};
  border-radius: 9999px;
`;

export const SearchInput = styled.input<WithTheme & { placeholderColor: Color }>`
  border-radius: 25px;
  width: 100%;
  height: 3.25rem;
  padding: 0.25rem 1.25rem;
  outline: none;
  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(props) => props.placeholderColor};
    opacity: 1; /* Firefox */
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  left: 0;
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 15px; // You can adjust this value to get the border roundness you want
  background-color: rgba(
    255,
    255,
    255,
    1
  ); // var(--color-white) replaced with rgba equivalent
  z-index: 40;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 25rem;
`;

export const DropdownItem = styled.div<WithTheme>`
  padding: 0.75rem;
  margin: 1rem;
  cursor: pointer;
  border-radius: 15px;
  color: ${(props) => props.theming};

  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

export const Spacing = styled.div<WithTheme>`
  padding: 1rem;
  margin: 0.25rem;
  border-radius: 15px;
  color: ${(props) => props.theming};
`;

export const Loader = styled.div<WithTheme>`
  padding: 0.7rem;
  margin: 0.25rem;
  border-radius: 15px;
  color: ${(props) => props.theming};
`;
