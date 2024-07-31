import Select from "react-select";
import styled, { css } from "styled-components";

import { Color } from "@nectiasw/theme";
import { Dropdown } from "@nectiasw/components/Dropdown";

type ExtendedSearch = {
  dropdown?: boolean;
};

const noDropdownStyle = css`
  margin-left: 1.25rem;
`

export const StyledSelect = styled(Select)<ExtendedSearch>`
  .react-select__control {
    border: 1px solid #dfdfdf;
    color: #464646;
    min-height: 4rem;
    ${(props) =>
      props.dropdown
        ? css`
            border-left-style: none;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right-style: none;
          `
        : css`
            border-left-style: solid;
            border-top-left-radius: 2.25rem;
            border-bottom-left-radius: 2.25rem;
          `}
    &:focus-within {
      box-shadow: none;
      border-color: none;
    }

    &:hover {
      border-color: #dfdfdf;
    }

    & .react-select__input-container {
      height: 3.25rem;
      ${(props) => !props.dropdown && noDropdownStyle}
    }

    & .react-select__placeholder {
      ${(props) => !props.dropdown && noDropdownStyle}
    }

    & .react-select__control--input-container {
      height: 3.25rem;
    }
    & .react-select__control--is-focused {
      border-color: none;
    }

    & .react-select__control--is-focused:hover {
      border-color: none;
    }

    & .react-select__control--menu-is-open {
      border-color: none;
    }

    & .react-select__control--menu-is-open:hover {
      border-color: none;
    }

    & .react-select__multi-value {
    }
  }

  & .react-select_dropdown-indicator {
    color: #464646;
    background-color: ${Color.secondary};
    padding: 100px;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__se .react-select__control-label {
    display: none;
  }
`;

StyledSelect.defaultProps = {
  classNamePrefix: "react-select",
};

export const SearchContainer = styled.div<{ color?: string }>`
  background: ${(props) => props.color ?? Color.secondary};
  border: 1px solid #dfdfdf;
  border-radius: 0rem 2.25rem 2.25rem 0rem;
  width: 4rem;
  align-items: center;
  justify-content: end;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 4rem;
  padding-right: 2px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  display: flex;
  justify-content: end;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
`;

export const StyledDropdownContainer = styled.div`
  border-radius: 2.25rem 0 0 2.25rem;
`;
