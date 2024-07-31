import React from "react";
import { v4 } from "uuid";
import classNames from "clsx";
import { format } from "rut.js";
import styled, { css } from "styled-components";

import { Builder } from "./builder";
import { classes } from "./styles";
import { Color } from "@nectiasw/theme";
import { Button } from "@nectiasw/components/Button";
import { Tooltip } from "@nectiasw/components/Tooltip";
import { Checkbox } from "@nectiasw/components/Checkbox";
import { RadioButton } from "@nectiasw/components/RadioButton";
import { ButtonProps } from "@nectiasw/components/Button";




import {
  Col,
  StatusColor,
  StyledTableData,
  StyledTableHead,
  StyledTableRow,
  StyledThead,
  Table,
  HeaderContainer,
} from "./tw-table.styled.tailwind";
import { SortIcon } from "./svg";

/**
 * @description
 * This file contains the Table component for the Tailwind CSS framework.
 * @param props The properties of the Table component.
 */
export const Table: React.FunctionComponent<TableProps> = React.memo(
  (props) => {
    const {
      index,
      onSort,
      headers,
      checked,
      children,
      className,
      fixedHeader,
      cellSpacing,
      cellPadding,
      hasCheckbox,
      onChangeCheckbox,
      headerClassName,
    } = props;

    const tailwind = new Builder(props);
    const [sortingHeader, setSortingHeader] = React.useState<string | null>(
      null
    );

    /**
     * @description
     * Widths ids.
     */
    const widthsWithIds = React.useMemo(() => {
      return props?.widths?.map((width: number) => {
        return {
          id: v4(),
          width,
        };
      });
    }, [props.widths]);

    /**
     * @description
     * Detect which fields has been changed.
     */
    const handleSort = React.useCallback(
      (field: string, index: number) => {
        setSortingHeader(field);
        onSort?.(field, index);
      },
      [onSort]
    );

    /**
     * @description
     * Changes the current checkbox of the table.
     */
    const handleChangeCheckbox = React.useCallback(
      (checked: boolean) => {
        onChangeCheckbox?.(checked);
      },
      [onChangeCheckbox]
    );

    const renderHeaderContent = (
      header: Heading | string,
      index: number
    ): React.ReactNode => {
      const title = typeof header === "string" ? header : header.title;
      const objectRef = typeof header === "string" ? null : header;
      const isOrdering =
        objectRef?.sort === "ASC" || objectRef?.sort === "DESC";
      const isAsc = objectRef?.sort === "ASC";
      const isCurrentSorting = title === sortingHeader;

      if (objectRef?.tooltip) {
        return (
          <Tooltip
            text={objectRef?.tooltip}
            maxWidth={1000}
            tableHead
            className={classNames(index === 0 && hasCheckbox && "w-full")}
          >
            <HeaderContainer
              onClick={() => objectRef && handleSort(objectRef?.title, index)}
              sortable={objectRef?.sortabled}
            >
              {" "}
              <div
                className={classNames(
                  objectRef?.sortabled && index === headers.length,
                  headerClassName
                )}
              >
                {title}

                {objectRef?.sortabled && index === headers.length && (
                  <span
                    className={classNames(
                      classes.row.sortable,
                      isCurrentSorting && isAsc && "rotate-180",
                      isOrdering ? "text-darkened" : "text-info"
                    )}
                    onClick={() => handleSort(objectRef.title, index)}
                  >
                    <SortIcon />
                  </span>
                )}
              </div>{" "}
              {objectRef &&
                objectRef?.sortabled &&
                (index === headers.length || (
                  <span
                    className={classNames(
                      classes.row.sortable,
                      isOrdering ? "text-darkened" : "text-info",
                      isAsc && "rotate-180"
                    )}
                    onClick={() => handleSort(objectRef.title, index)}
                  >
                    <SortIcon />
                  </span>
                ))}
              {index === headers.length && (
                <span
                  className={classNames(
                    props?.filter && props.filter,
                    classes.row.delete
                  )}
                ></span>
              )}
            </HeaderContainer>
          </Tooltip>
        );
      }
      return (
        <HeaderContainer
          onClick={() => objectRef && handleSort(objectRef?.title, index)}
          className={classNames(index === 0 && hasCheckbox && "w-full")}
          sortable={objectRef?.sortabled}
        >
          {" "}
          <div
            className={classNames(
              objectRef?.sortabled &&
                index === headers.length - 1 &&
                "flex justify-start gap-5"
            )}
          >
            {title}

            {objectRef?.sortabled && index === headers.length - 1 && (
              <span
                className={classNames(
                  classes.row.sortable,
                  isAsc && "rotate-180",
                  isOrdering ? "text-darkened" : "text-info"
                )}
              >
                <SortIcon />
              </span>
            )}
          </div>{" "}
          <div className="flex justify-between">
            {objectRef &&
              objectRef?.sortabled &&
              (index === headers.length - 1 || (
                <span
                  className={classNames(
                    classes.row.sortable,
                    isOrdering ? "text-darkened" : "text-info",
                    isAsc && "rotate-180"
                  )}
                  onClick={() => handleSort(objectRef.title, index)}
                >
                  <SortIcon />
                </span>
              ))}
            {index === headers.length - 1 && (
              <span
                className={classNames(
                  props?.filter && props.filter,
                  classes.row.delete
                )}
              ></span>
            )}
          </div>
        </HeaderContainer>
      );
    };

    return (
      <Table
        cellPadding={cellPadding}
        cellSpacing={cellSpacing}
        className={classNames(
          className && className,
          classes.table.container,
          props?.auto && "table-auto"
        )}
      >
        {props?.widths && (
          <colgroup>
            {widthsWithIds?.map(({ width, id }) => {
              return <Col key={id} width={width} />;
            })}
          </colgroup>
        )}
        <StyledThead fixedHeader={fixedHeader} index={index}>
          <tr>
            {headers.map((header: Heading | string, index: number) => {
              /**
               * @description
               * If the header is a string, then the title will be the header.
               */
              const title = typeof header === "string" ? header : header.title;

              /**
               * @description
               * If the header is a string, then the objectRef will be null.
               */
              const objectRef = typeof header === "string" ? null : header;

              /**
               * @description
               * If the header is a string, then the classNameStyle will be null.
               */

              /**
               * @description
               * The `fixedHeader` prop determines whether the table header should be fixed or not.
               * When it's active, the table header will remain in its position while scrolling through the table content.
               */

              const classNameStyle = classNames(
                tailwind.headings[index],
                index === 0 && !fixedHeader && !hasCheckbox,
                index === 0 &&
                  !fixedHeader &&
                  hasCheckbox &&
                  "relative flex items-center"
              );

              const isOrdering =
                objectRef?.sort === "ASC" || objectRef?.sort === "DESC";

              const isAsc = objectRef?.sort === "ASC";

              return (
                <StyledTableHead
                  key={title}
                  index={index}
                  className={classNameStyle}
                  align={objectRef?.align}
                  color={isOrdering ? Color.darkened : objectRef?.color}
                >
                  {index === 0 && hasCheckbox && (
                    <Checkbox
                      checked={checked}
                      className={classes.selectable}
                      onChange={handleChangeCheckbox}
                    />
                  )}
                  {renderHeaderContent(header, index)}
                </StyledTableHead>
              );
            })}
          </tr>
        </StyledThead>
        <tbody>{children}</tbody>
      </Table>
    );
  }
);

TwTable.defaultProps = {
  headers: [],
  unit: "%",
  fixedHeader: false,
};

/**
 * @description
 * This file contains the TableData component for the Tailwind CSS framework.
 * @param props The properties of the TableData component.
 */
export const TableData: React.FunctionComponent<TableDataProps> = React.memo(
  (props) => {
    const defaultClassName = classNames(
      classes.data.borders,
      classes.data.container,
      props.last && "rounded-r-full",
      props.first && "rounded-l-full",
      "text-darkened font-bold text-base",
      props.overflow && classes.row.innerText
    );

    const defaultProps = {
      align: props.align,
      overflow: props.overflow,
      innerText: props.innerText,
      className: defaultClassName,
      index: props.first ? 0 : 1,
      overflowWrap: props.overflowWrap,
    };

    const renderCheckbox = React.useMemo(() => {
      return (
        props.first &&
        props.hasCheckbox && (
          <Checkbox
            checked={props.checked}
            onChange={(response) => {
              props.onChangeCheckbox?.(response, props.dataId);
            }}
            className={classes.selectable}
          />
        )
      );
    }, [props.checked]);

    const renderRadioButton = React.useMemo(() => {
      const dataId = props.dataId?.toString();
      return (
        props.first &&
        props.hasRadioButton && (
          <RadioButton
            checked={props.checked}
            onClick={() => {
              props.onChangeRadioButton?.(dataId);
            }}
            className={classes.selectable}
            value={dataId}
          />
        )
      );
    }, [props.checked]);

    if (props?.formatAsRut && props?.innerText) {
      return (
        <StyledTableData {...defaultProps}>
          {renderCheckbox || renderRadioButton}
          {format(props.innerText, { dots: true })}
        </StyledTableData>
      );
    }

    if (props?.formatAsCLP && props?.innerText) {
      const valueAsNumber = Number(props.innerText);

      const currency = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      });

      return (
        <StyledTableData {...defaultProps}>
          {renderCheckbox || renderRadioButton}
          {currency.format(valueAsNumber)}
        </StyledTableData>
      );
    }

    if (props?.formatAsStatus) {
      return (
        <StyledTableData {...defaultProps}>
          {renderCheckbox || renderRadioButton}
          {props.icons && (
            <div className={classes.icons(props?.iconJustify)}>
              {props.icons.map((icon) => icon)}
            </div>
          )}
          <Status
            color={props?.color}
            text={props.detailText}
            variant={props.detailVariant}
            onClick={props?.onClickDetail}
            disabled={props.detailDisabled}
            value={props?.innerText as TableStatusProps["value"]}
          >
            {props.children}
          </Status>
        </StyledTableData>
      );
    }

    if (props?.isFixed) {
      return (
        <StyledTableData isFixed={props.isFixed} right={props.right}>
          {props.children}
        </StyledTableData>
      );
    }

    if (props?.innerText) {
      return (
        <StyledTableData {...defaultProps}>
          {props.icons && (
            <div className="flex">{props.icons.map((icon) => icon)}</div>
          )}
          {renderCheckbox || renderRadioButton}
          {props.innerText}
        </StyledTableData>
      );
    }

    return (
      <StyledTableData {...defaultProps}>
        {props.icons && (
          <div className={classes.icons(props?.iconJustify)}>
            {props.icons.map((icon) => icon)}
          </div>
        )}
        {props.children}
      </StyledTableData>
    );
  }
);

TableData.defaultProps = {
  icons: [],
  align: "left",
};

/**
 * @description
 * This file contains the TableStatus component for the Tailwind CSS framework.
 */
export const Status: React.FunctionComponent<TableStatusProps> = ({
  text,
  disabled,
  variant,
  children,
  value,
  color,
  onClick,
}) => {
  const handleClickDetail = () => onClick && onClick();

  return (
    <div className={onClick ? classes.cols.details : classes.cols.grids}>
      <div className="w-1/5 flex justify-start">
        {value && value} {children && children}
      </div>
      <div className="w-3/5 flex justify-center">
        <StatusColor color={color} className={classes.kind} />
      </div>
      {onClick && (
        <div className="w-auto flex justify-end">
          <Button
            size="base"
            disabled={disabled}
            variant={variant ?? "secondary"}
            onClick={handleClickDetail}
            fontSize="sm"
          >
            <span about="details">{text}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

Status.defaultProps = {
  variant: "secondary",
  text: "Ver Detalle",
};

/**
 * @description
 * This file contains the TableRow component for the Tailwind CSS framework.
 * @param props The properties of the TableRow component.
 */
export const TableRow: React.FunctionComponent<TableRowProps> = ({
  align,
  children,
}) => {
  return <StyledTableRow align={align}>{children}</StyledTableRow>;
};

/**
 * @description
 * This file contains the TableWrapper component for the Tailwind CSS framework.
 */
export const TableWrapper: React.FunctionComponent = ({ children }) => {
  return <div className={classes.row.container}>{children}</div>;
};



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

type PartialTableRowProps = Partial<TableRowProps>;

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

export const StyledTableRow = styled.tr<PartialTableRowProps>((props) => ({}));

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


export type Heading<T = {}> = {
  title: string;
  tooltip?: string;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  sort?: "ASC" | "DESC" | "DEFAULT";
  sortabled?: boolean;
  clear?: boolean;
  alias?: keyof T;
};

/**
 * @description
 * This file contains the types for the Table component.
 */
export type TableProps = {
  auto?: boolean;
  onSort?: (field: string, index?: number) => void;
  onReset?: () => void;
  fixedHeader?: boolean;
  index?: number;
  headers: string[] | Heading[];
  widths?: number[];
  children: React.ReactNode;
  cellSpacing?: number;
  cellPadding?: number;
  className?: string;
  filter?: string;
  unit?: "%" | "px" | "rem";
  checked?: boolean;
  hasCheckbox?: boolean;
  onChangeCheckbox?: (checked: boolean) => void;
  headerClassName?: string;
};

export type TableDataProps = {
  last?: boolean;
  asError?: boolean;
  first?: boolean;
  overflow?: boolean;
  innerText?: string;
  className?: string;
  formatAsCLP?: boolean;
  formatAsRut?: boolean;
  formatAsDate?: boolean;
  overflowWrap?: boolean;
  formatAsNumber?: boolean;
  formatAsStatus?: boolean;
  formatAsPercentage?: boolean;
  formatAsDigits?: boolean;
  children?: React.ReactNode;
  color?: string;
  dataId?: number;
  checked?: boolean;
  hasCheckbox?: boolean;
  icons?: React.ReactNode[];
  align?: "left" | "center" | "right";
  iconJustify?: "center" | "start" | "end" | "between" | "around";
  onClickDetail?: () => void;
  onChangeCheckbox?: (checked: boolean, dataId?: number) => void;
  detailText?: string;
  detailDisabled?: boolean;
  detailVariant?: ButtonProps["variant"];
  indexed?: boolean;
  hasRadioButton?: boolean;
  onChangeRadioButton?: (value: string | undefined) => void;
  isFixed?: boolean;
  right?: string;
};

export type TableRowProps = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
};

export type TableStatusProps = {
  id?: number;
  color?: string;
  onClick?: () => void;
  text?: TableDataProps["detailText"];
  disabled?: TableDataProps["detailDisabled"];
  variant?: ButtonProps["variant"];
  value: "Normal" | "Cerrado" | "Crítico" | "Por emisión OC";
};

export type TableColProps = {
  width?: number;
  unit?: "%" | "px" | "rem";
};
