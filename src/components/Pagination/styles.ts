/**
 * @description
 * This file contains the styles for the tw-pagination component.
 */
export const classes = {
  container: "flex items-center justify-between",
  controls: {
    root: "flex flex-1 justify-between sm:hidden",
    prev: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
    next: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50",
  },
  filter: {
    root: "sm:flex sm:flex-1 sm:items-center sm:justify-between",
    end: "flex items-center justify-end flex-2 sm:flex-none gap-3",
    show: "font-bold text-sm text-gray-700",
    info: "font-bold mx-3 sm:mx-3",
  },
  pagination: {
    root: "isolate inline-flex -space-x-px rounded-md shadow-sm",
    active:
      "relative z-10 inline-flex items-center bg-secondary px-3.5 py-2 text-sm font-bold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-6",
    page: "relative inline-flex items-center border-solid border-secondary px-3.5 py-2 bg-white text-sm font-bold text-gray-900 ring-1 ring-inset ring-secondary focus:z-20 focus:outline-offset-0 hover:cursor-pointer hover:bg-secondary hover:text-white",
    controlsRight:
      "relative inline-flex bg-white items-center rounded-r-full border-solid border-secondary px-2 py-2 text-black ring-1 ring-inset ring-secondary focus:z-20 focus:outline-offset-0 hover:cursor-pointer hover:bg-secondary hover:text-white",
    controlsLeft:
      "relative inline-flex bg-white items-center rounded-l-full border-solid border-secondary px-2 py-2 text-black ring-1 ring-inset ring-secondary focus:z-20 focus:outline-offset-0 hover:cursor-pointer hover:bg-secondary hover:text-white",
  },
};
