import clsx from "clsx";
import type { FlexProps, FlexItemProps } from ".";

type ParentArgs = Partial<FlexProps>;

type ChildArgs = Partial<FlexItemProps>;


export const classes = {
  child: ({
    self,
    grow,
    basis,
    order,
    shrink,
    className,
    justifySelf,
  }: ChildArgs) => clsx(
    self && `self-${self}`,
    basis && `basis-${basis}`,
    order && `order-${order}`,
    className && className,
    justifySelf && `justify-${justifySelf}`,
    typeof grow === "number" && `grow-${grow}`,
    typeof shrink === "number" && `shrink-${shrink}`
  ),
  parent: ({
    gap,
    wrap,
    spaceX,
    spaceY,
    display,
    direction,
    className,
    alignItems,
    justifyContent,
  }: ParentArgs) =>
    clsx(
      display && "flex",
      gap && `gap-${gap}`,
      wrap && `flex-${wrap}`,
      className && className,
      spaceX && `space-x-${spaceX}`,
      spaceY && `space-y-${spaceY}`,
      direction && `flex-${direction}`,
      alignItems && `items-${alignItems}`,
      justifyContent && `justify-${justifyContent}`,
    ),
};
