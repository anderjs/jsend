export const classes = {
    container: {
      text: 'text-xl font-medium text-darkened',
      child: 'text-xl font-bold text-secondary',
      panel: 'px-4 pt-4 pb-2',
      button: 'flex w-full justify-between items-center text-left font-bold focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75',
      disclosure: 'w-full my-1 mx-3 py-1 px-3',
      content: 'overflow-hidden mt-[5px]',
    },
    icon: {
      root: 'w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center',
      container: 'w-12 h-12 flex items-center justify-center',
      open: 'rotate-180 transform transition-transform duration-300 ease-in-out',
      close: 'rotate-0 transform transition-transform duration-300 ease-in-out',
      size: 'h-7 w-7 text-xxl text-black'
    }
  }