export const classes = {
    table: {
      container: "table-fixed",
    },
    colHead: "flex justify-between items-center",
    kind: "rounded-full self-center",
    row: {
      delete:
        "text-sm font-bold hover:cursor-pointer flex items-center justify-center gap-1 text-info hover:text-secondary",
      sortable: "transition ease-in-out duration-300",
      container: "border rounded-full p-2 bg-white text-base font-bold",
      innerText:
        "text-ellipsis whitespace-nowrap overflow-hidden sm:text-clip sm:overflow-visible",
    },
    data: {
      container: "bg-white h-[52px]",
      borders: "text-base font-bold",
    },
    status: {
      root: "flex flex-wrap justify-start items-center w-full",
      item: "shrink-0 basis-0",
    },
    cols: {
      grids: "flex items-center",
      details: "flex items-center",
    },
    selectable: "inline-flex align-middle mr-4 cursor-pointer",
    icons: (justify?: string) =>
      `flex items-center flex gap-2.5 justify-${justify ?? "center"}`,
  };