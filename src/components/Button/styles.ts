import clsx from "clsx";
import { display, alignItems, gap, space, margin } from "tailwindcss-classnames";

export const classes = {
  wrap: clsx(
    gap('gap-1'),
    margin("mx-1"),
    display("flex"),
    space("space-x-3"),
    alignItems("items-center")
  ),
  disabledTest: "bg-secondary",
};
