export const classes = {
  chevronIcon: (open: boolean) => (open ? "rotate-180 transform h-5 w-5" : "h-5 w-5"),
  timeline: {
    title: "text-base text-gray-400 font-bold mb-2 ml-6",
    disclosure:
      "col-span-9 col-start-1 pl-[27px] bg-gray-100  text-sm text-gray-500 transition ease-in-out delay-150",
    container: "bg-white rounded-[20px] px-2 py-5",
    grid: "grid grid-cols-9 transition-opacity",
    button: {
      container:
        "cursor-pointer flex col-span-9 mb-2 text-base mx-3  justify-between   py-2 text-left  font-semibold text-base focus:outline-none focus-visible:ring relative",
      stack: "flex items-center ml-2",
      style:
        "w-2.5 h-2.5 ml-[0.188rem] bg-transparent border-2 border-black  rounded-full",
      category: "ml-3",
    },

    list: {
      container: "absolute  border-l-2 border-dashed border-gray-300 ",
      item: "mb-5 ml-4 pt-3 relative",
      styles: "absolute w-2 h-2 bg-gray-300 rounded-full mt-1.5 left-[-19px]",
      name: "text-sm font-bold text-gray-400",
      date: "text-sm text-secondary font-bold dark:text-white",
      author: "mb-4 text-xs font-bold text-gray-400 dark:text-gray-400",
      lastItem: "bg-black",
    },

    buttonLine:
      "absolute h-[76%] border-r-2 border-dashed border-gray-300 left-[15px]   bottom-[-18px]",
    buttonLineUp:
      "absolute h-[76%] border-r-2 border-dashed border-gray-300  left-[15px] bottom-[25px]",
  },
};