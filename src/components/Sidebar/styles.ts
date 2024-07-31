/**
 * @description
 * This file contains the styles for the navbar component.
 */
export const classes = {
  content: "fixed col-span-3",
  container: "col-span-3 grid grid-cols-3",
  show: "font-normal text-base transition-all duration-700 ease-in-out",
  hidden: "hidden",
  background: "bg-transparent h-screen relative flex flex-col",
  backgroundSize: {
    open: "transition-all duration-400 ease-in-out",
    closed: "transition-all duration-400 ease-in-out",
  },
  icontainer: "mb-8",
  list: {
    container: "w-full",
    item: "text-sm flex items-center rounded-md mb-1",
    wrap: "flex items-center space-x-3 mx-1",
  },
  menu: {
    icon: "w-6 h-6",
    title: "text-sm font-medium ",
  },
  separator: "max-w-[11.875rem] border-b-2 border-solid mt-4 mb-4"
};