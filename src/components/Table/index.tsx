/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { v4 } from "uuid";
import classNames from "clsx";
import { format } from "rut.js";

import { Builder } from "./builder";
import { classes } from "./styles";
import { Color } from "@nectiasw/theme";
import { Button } from "@nectiasw/components/Button";
import { Tooltip } from "@nectiasw/components/Tooltip";
import { Checkbox } from "@nectiasw/components/Checkbox";
import { RadioButton } from "@nectiasw/components/RadioButton";

import {
  Heading,
  TableProps,
  TableRowProps,
  TableDataProps,
  TableStatusProps,
} from "./types";

import {
  Col,
  Table,
  StatusColor,
  StyledThead,
  StyledTableData,
  StyledTableHead,
  StyledTableRow,
  HeaderContainer,
} from "./styled";


const SortIcon: React.FC = () => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 relative top-[1px] hover:cursor-pointer hover:text-darkened"
      attributeName="transform"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
);

/**
 * @description
 * This file contains the Table component for the Tailwind CSS framework.
 * @param props The properties of the Table component.
 */
export const TwTable: React.FunctionComponent<TableProps> = React.memo(
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

      const isAsc = objectRef?.sort === "ASC";

      const isCurrentSorting = title === sortingHeader;

      const isOrdering =
        objectRef?.sort === "ASC" || objectRef?.sort === "DESC";

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 relative top-[1px] hover:cursor-pointer hover:text-darkened"
                      attributeName="transform"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
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
  disabled = false,
}) => {
  return (
    <StyledTableRow align={align} disabled={disabled}>
      {children}
    </StyledTableRow>
  );
};

/**
 * @description
 * This file contains the TableWrapper component for the Tailwind CSS framework.
 */
export const TableWrapper: React.FunctionComponent<{ children: React.ReactNode}> = ({ children }) => {
  return <div className={classes.row.container}>{children}</div>;
};
