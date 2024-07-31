import React from "react";
import classNames from "clsx";


/**
 * @description
 * Grid view system for CCC components.
 * Avoid "autofill" prop for default behaviour.
 * @param props - Props for grid.
 */
export const Grid: React.FunctionComponent<GridProps> = (props) => {
  if (props.autofill) {
    return (
      <div
        className={classNames(
          "grid",
          props.cols && `grid-cols-${props.cols}`,
          props.gap && `gap-${props.gap}`,
          props.gapX && `gap-x-${props.gapX}`,
          props.gapY && `gap-y-${props.gapY}`,
          props.autofill && `md:grid lg:grid xl:grid`,
          props.autofill &&
            `md:grid-cols-${props.cols} lg:grid-cols-${props.cols} xl:grid-cols-${props.cols}`
        )}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "grid",
        props.cols && `grid-cols-${props.cols}`,
        props.gap && `gap-${props.gap}`,
        props.gapX && `gap-x-${props.gapX}`,
        props.gapY && `gap-y-${props.gapY}`,
        props.xs && `xs:grid xs:grid-cols-${props.xs}`,
        props.md && `md:grid md:grid-cols-${props.md}`,
        props.lg && `lg:grid lg:grid-cols-${props.lg}`,
        props.xl && `xl:grid xl:grid-cols-${props.xl}`
      )}
    >
      {props.children}
    </div>
  );
};

Grid.defaultProps = {
  cols: 9,
  autofill: true,
};

/**
 * @description
 * Colspan system for Grid CCC Components.
 */
export const Colspan: React.FunctionComponent<ColspanProps> = (props) => {
  return (
    <div
      className={classNames(
        props.start && `col-start-${props.start}`,
        props.cols && `col-span-${props.cols}`,
        props.end && `col-end-${props.end}`,
        props.xl && `xl:col-span-${props.xl}`,
        props.md && `md:col-span-${props.md}`,
        props.lg && `lg:col-span-${props.lg}`,
        props.xs && `xs:col-span-${props.xs}`
      )}
    >
      {props.children}
    </div>
  );
};

Colspan.defaultProps = {
  start: 1,
};


export type GridProps = {
    md?: number;
    lg?: number;
    xs?: number;
    xl?: number;
    gap?: number;
    cols?: number;
    gapX?: number;
    gapY?: number;
    autofill?: boolean;
    children?: React.ReactNode;
  };
  
  export type ColspanProps = {
    md?: number;
    lg?: number;
    xs?: number;
    xl?: number;
    end?: number;
    cols?: number;
    start?: number;
    autofill?: number;
    children?: React.ReactNode;
  };