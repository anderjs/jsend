import { classNames } from "primereact/utils";

export const Tailwind = {
  dialog: {
    header: {
      className: "hidden relative",
    },
    content: {
      className: classNames("bg-white rounded-[20px]", "overflow-hidden"),
    },
    mask: {
      style: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    },
    transition: ({ props }: { props: { position: string } }) => {
      return props.position === "top"
        ? {
            enterFromClass:
              "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0",
            enterActiveClass: "transition-all duration-200 ease-out",
            leaveActiveClass: "transition-all duration-200 ease-out",
            leaveToClass:
              "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0",
          }
        : props.position === "bottom"
        ? {
            enterFromClass: "opacity-0 scale-75 translate-y-full",
            enterActiveClass: "transition-all duration-200 ease-out",
            leaveActiveClass: "transition-all duration-200 ease-out",
            leaveToClass:
              "opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0",
          }
        : props.position === "left" ||
          props.position === "top-left" ||
          props.position === "bottom-left"
        ? {
            enterFromClass:
              "opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0",
            enterActiveClass: "transition-all duration-200 ease-out",
            leaveActiveClass: "transition-all duration-200 ease-out",
            leaveToClass:
              "opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0",
          }
        : props.position === "right" ||
          props.position === "top-right" ||
          props.position === "bottom-right"
        ? {
            enterFromClass:
              "opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0",
            enterActiveClass: "transition-all duration-200 ease-out",
            leaveActiveClass: "transition-all duration-200 ease-out",
            leaveToClass:
              "opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0",
          }
        : {
            enterFromClass: "opacity-0 scale-75",
            enterActiveClass: "transition-all duration-200 ease-out",
            leaveActiveClass: "transition-all duration-200 ease-out",
            leaveToClass: "opacity-0 scale-75",
          };
    },
  },
};
