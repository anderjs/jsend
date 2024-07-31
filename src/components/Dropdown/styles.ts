export const classes = {
  container: {
    root: "relative inline-block text-left",
    circle: "text-secondary rounded-full border-secondary border-[1px]",
    title:
      "inline-flex w-full justify-center gap-x-1.5 px-4 py-2 rounded-full border-solid border-[1px] border-secondary bg-white text-sm font-medium ring-inset hover:bg-primary",
    chevron: "-mr-1 h-5 w-5",
    button: "text-secondary hover:text-white",
    ellipsis:
      "inline-flex w-full justify-center gap-1 px-2 py-2 rounded-full text-sm font-semibold",
  },
  options: {
    padding: "py-2",
    items:
      "absolute w-auto divide-y divide-gray-100 rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-solid border-[1px] border-secondary z-50 overflow-hidden",
    left: "right-10 mt-2",
    right: "left-10 mt-2",
    bottom: "top-10 right-0 mt-2",
    top: "bottom-10 right-0 mt-2",
    item: (color: string) =>
      `block px-4 py-4 text-sm hover:cursor-pointer text-${color} font-medium whitespace-nowrap w-full`,
    active: "bg-gray-100 hover:cursor-pointer font-medium",
    inactive: (color: string) =>
      `text-${color} hover:bg-gray-100 hover:cursor-pointer font-medium`,
  },
};
