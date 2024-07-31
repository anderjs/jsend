import React from "react";
import {
  TableProps,
  Heading,
  TableDataProps,
  TableStatusProps,
  TableRowProps,
} from "../index";

interface ParticipantsProps {}

export const Participants: React.FunctionComponent<TableProps> = React.memo(
  (props) => {
    const {
      filter,
      headers,
      children,
      cellSpacing,
      onSort,
      onReset,
      cellPadding,
      className,
      hasCheckbox,
      onChangeCheckbox,
      checked,
    } = props;

    return (
      <Table
        cellPadding={cellPadding}
        cellSpacing={cellSpacing}
        className={className}
      ></Table>
    );
  }
);




type PartialHeading = Partial<
  Heading & {
    index?: number;
  }
>;

type PartialTableProps = Partial<TableProps>;

type PartialTableDataProps = Partial<
  TableDataProps & {
    index?: number;
  }
>;

type PartialTableRowProps = Partial<TableRowProps>;

type PartialTableColProps = Partial<TableColProps>;

export const Table = styled.table<PartialTableProps>`
  border-collapse: separate;
  border-spacing: 0 14px;
  table-layout: fixed;
`;

export const StyledTableHead = styled.th<PartialHeading>`
  text-align: ${({ align }) => align};
  color: ${({ color }) => color};
  ${({ index }) =>
    index !== 0 &&
    css`
      padding-top: 8px;
      padding-bottom: 8px;
      padding-right: 2px;
      padding-left: 12px;
      text-align: left;
      background-image: repeating-linear-gradient(
          180deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        ),
        repeating-linear-gradient(
          270deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        ),
        repeating-linear-gradient(
          0deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        ),
        repeating-linear-gradient(
          90deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        );
      background-size: 0, 0, 1px 100%, 0;
      background-position-y: -10px;
      background-repeat: no-repeat;
    `}

  &:hover {
    color: #464646;

    svg[attributeName="transform"] {
      color: #464646;
    }
  }
`;

export const StyledTableRow = styled.tr<PartialTableRowProps>((props) => ({
  marginBottom: "0.875rem",
}));

export const StyledTableData = styled.td<PartialTableDataProps>`
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
  &:first-child {
    padding-left: 24px;
    padding-right: 0;
  }
  ${({ overflow, innerText }) =>
    overflow &&
    innerText &&
    css`
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
  ${({ index }) =>
    index !== 0 &&
    css`
      padding-top: 8px;
      padding-bottom: 8px;
      padding-right: 2px;
      padding-left: 12px;
      text-align: left;
      background-image: repeating-linear-gradient(
          180deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        ),
        repeating-linear-gradient(
          270deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        ),
        repeating-linear-gradient(
          0deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        ),
        repeating-linear-gradient(
          90deg,
          #e0dfdf,
          #e0dfdf 28px,
          transparent 28px,
          transparent 58px,
          #e0dfdf 58px
        );
      background-size: 0, 0, 1px 100%, 0;
      background-position-y: -10px;
      background-repeat: no-repeat;
    `}
`;

export const Col = styled.col<PartialTableColProps>((props) => ({
  width: `${props.width}%;`,
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
