import React from "react";
import classNames from "clsx";

/**
 * @description
 * Col grid container for tailwind dynamic grid.
 */
export const Container: React.FunctionComponent<ContainerProps> = ({
  className,
  children,
  start = 2,
  cols = 10,
}) => {
  return (
    <div
      className={classNames(
        `col-start-${start} col-span-${cols}`,
        className && className
      )}
    >
      {children}
    </div>
  );
};

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  start?: number;
};
