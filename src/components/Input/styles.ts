import classNames from "clsx";
import {
  width,
  margin,
  display,
  position,
  justifyContent,
  alignItems,
  pointerEvents,
} from "tailwindcss-classnames";

export const classes = {
  icon: classNames(
    width("w-10"),
    margin("ml-2"),
    position("absolute"),
    pointerEvents("pointer-events-none")
  ),
  relativeAddOn: classNames(
    display("flex"),
    position("relative"),
    alignItems("items-center"),
    justifyContent("justify-start")
  ),
  relativeAddOff: position("relative"),
  container: "form-input focus:outline-none",
  flow: "absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer hover:text-primary",
  modify: "text-white mr-1",
};