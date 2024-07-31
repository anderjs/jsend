export const classes = {
    background: 'bg-app',
  
    displayleft: 'relative float-left h-20 mt-7 ml-16',
    displayright: 'relative float-right h-20 mt-7',
  
    logo: {
      root: 'cursor-pointer',
      wrapper: 'rounded-full border border-solid border-disabled px-6 py-3 bg-white',
      container: 'flex  items-center justify-center sm:items-stretch sm:justify-start container-size',
    },
  
  
    router: {
      routes: 'flex space-x-4',
      root: 'hidden sm:ml-6 sm:block',
      route: 'rounded-md px-3 ml-2 py-2 text-sm font-medium'
    },
    menu: {
      root: 'mr-16 absolute inset-y-0 right-0 flex items-center align-middle pr-3 sm:static sm:inset-auto sm:pr-0 rounded-full border border-solid border-disabled bg-white z-40',
      button: 'rounded-full  my-2 p-3 ml-2 text-darkened focus:outline-none focus:ring-1 focus:ring-offset-1 hover:cursor-pointer hover:bg-slate-100',
      active: 'rounded-full  my-2 p-3 ml-2 bg-secondary text-white focus:outline-none focus:ring-1 focus:ring-offset-1 hover:cursor-pointer',
      headless: 'h-6 w-6',
      engine: 'transform transition duration-500 hover:rotate-[-120deg] ',
    },
    profile: {
      image: 'h-8 w-8 rounded-full;',
      root: 'relative ml-9',
      pick: 'relative pl-[0.75rem] pr-[1.12rem] ',
      name: 'font-bold text-base h-[1.375rem]',
      info: 'flex flex-col text-sm font-medium text-darkened',
      badge: 'flex rounded-full bg-darkened text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800',
      role: 'font-medium text-sm float-right',
    },
    sr: 'sr-only',
  }