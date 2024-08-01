import styled, { css } from "styled-components";
import {
  Heading,
  TableProps,
  TableRowProps,
  TableColProps,
  TableDataProps,
} from "./types";

type PartialHeading = Partial<
  Heading & {
    index?: number;
    fixedHeader?: boolean;
  }
>;

type StyledTheadProps = {
  fixedHeader?: boolean;
  theadColor?: string;
  index?: number;
};

type PartialTableProps = Partial<TableProps>;

type PartialTableDataProps = Partial<
  TableDataProps & {
    index?: number;
    isFixed?: boolean;
    right?: string;
  }
>;


type PartialTableColProps = Partial<TableColProps>;

export const Table = styled.table<PartialTableProps>`
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0 16px;
  margin-top: -16px;
  margin-bottom: -16px;
`;

export const StyledThead = styled.thead<StyledTheadProps>`
  background-color: transparent;

  ${({ fixedHeader, index }) =>
    fixedHeader &&
    css`
      th {
        position: sticky;
        top: 0;
        background-color: white;
        color: black;
        ${index != null && `z-index: ${index};`}
      }
    `}
`;

export const StyledTableHead = styled.th<PartialHeading>`
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  padding: 6px 16px;
  position: relative;

  &:hover {
    color: #464646;

    svg[attributeName="transform"] {
      color: #464646;
    }
  }

  &:first-child {
    padding-left: 24px;
  }

  &:last-child {
    padding-right: 8px;
  }

  &:not(:last-child):after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    height: 40%;
    width: 1px;
    background-color: #e0dfdf;
    transform: translateY(-50%);
  }
`;

export const StyledTableRow = styled.tr<TableRowProps>`
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "transparent")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const StyledTableData = styled.td<PartialTableDataProps>`
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  ${({ overflow, innerText }) =>
    overflow &&
    innerText &&
    css`
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}

  padding: 8px 16px;

  &:first-child {
    padding-left: 24px;
    padding-right: 16px;
  }

  &:last-child {
    padding-right: 8px;
  }

  &:not(:last-child):after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    height: 40%;
    width: 1px;
    background-color: #e0dfdf;
    transform: translateY(-50%);
  }

  ${({ isFixed, right }) =>
    isFixed &&
    css`
      position: sticky;
      right: ${right};
      background-color: white;

      &:after {
        display: none;
      }
    `}

  ${({ overflowWrap }) =>
    overflowWrap &&
    css`
      overflow-wrap: break-word;
    `}
`;

export const Col = styled.col<PartialTableColProps>((props) => ({
  width: `${props.width}${props.unit};`,
}));

/**
 * @description
 * StatusColor is a styled component that renders a div with a background color.
 */
export const StatusColor = styled.div<{ color?: string }>`
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  color: ${({ color }) => color};
  background-color: ${({ color }) => color};
`;

export const HeaderContainer = styled.div<{
  sortable?: boolean | undefined;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.grow {
    flex-grow: 1;
  }

  ${({ sortable }) =>
    sortable &&
    css`
      cursor: pointer;
    `}
`;
