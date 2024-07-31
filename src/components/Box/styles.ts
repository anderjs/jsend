import clsx from "clsx";
import { BoxProps } from "./index";

type ContainerArgs = Partial<BoxProps>;

export const classes = (props: ContainerArgs) =>
  clsx(
    props?.fullWidth && `w-full`,
    props?.fullHeight && `h-full`,
    props?.container && `container`,
    props?.width && `w-${props.width}`,
    props?.blur && `blur-${props.blur}`,
    props?.height && `h-${props.height}`,
    props?.margin && `m-${props.margin}`,
    props?.color && `text-${props.color}`,
    props?.padding && `p-${props.padding}`,
    props?.marginY && `my-${props.marginY}`,
    props?.marginX && `mx-${props?.marginX}`,
    props?.paddingX && `px-${props.paddingX}`,
    props?.paddingY && `py-${props.paddingY}`,
    props?.display && `${props.display}`,
    props?.textAlign && `text-${props.textAlign}`,
    props?.marginTop && `mt-${props?.marginTop}`,
    props?.paddingTop && `pt-${props.paddingTop}`,
    props?.marginLeft && `ml-${props.marginLeft}`,
    props?.paddingLeft && `pl-${props.paddingLeft}`,
    props?.marginRight && `mr-${props.marginRight}`,
    props?.paddingRight && `pr-${props.paddingRight}`,
    props?.marginBottom && `mb-${props.marginBottom}`,
    props?.lineHeight && `leading-${props.lineHeight}`,
    props?.borderWidth && `border-${props.borderWidth}`,
    props?.paddingBottom && `pb-${props.paddingBottom}`,
    props?.borderStyle && `border-${props.borderStyle}`,
    props?.brightness && `brightness-${props.brightness}`,
    props?.top && `top-${props.top}`,
    props?.left && `left-${props.left}`,
    props?.zIndex && `z-${props.zIndex}`,
    props?.float && `float-${props.float}`,
    props?.right && `right-${props.right}`,
    props?.bottom && `bottom-${props.bottom}`,
    props?.insetX && `inset-x-${props.insetX}`,
    props?.insetY && `inset-y-${props.insetY}`,
    props?.borderBox && `box-${props.borderBox}`,
    props?.position && `${props.position}`,
    props?.overflow && `overflow-${props.overflow}`,
    props?.visibility && props.visibility,
    props?.clear && `clear-${props.clear}`,
    props?.onHover && hoverFn(props.onHover),
    props?.maxWidth && `max-w-${props.maxWidth}`,
    props?.minWidth && `min-h-${props.minWidth}`,
    props?.textTransform && props.textTransform,
    props?.maxHeight && `max-h-${props.maxHeight}`,
    props?.minHeight && `min-h-${props.minHeight}`,
    props?.textDecoration && props.textDecoration,
    props?.textOverflow && `text-${props.textOverflow}`,
    props?.whiteSpace && `whitespace-${props.whiteSpace}`,
    props?.backgroundColor && `bg-${props.backgroundColor}`,
    props?.breakAfter && `break-after-${props.breakAfter}`,
    props?.breakBefore && `break-before-${props.breakBefore}`,
    props?.breakInside && `break-inside-${props.breakInside}`,
    props?.maxWidthScreen && `max-w-screen-${props.maxWidthScreen}`,
    props?.minWidthScreen && `min-w-screen-${props.minHeightScreen}`,
    props?.minHeightScreen && `min-h-screen-${props.maxHeightScreen}`,
    props?.maxHeightScreen && `max-h-screen-${props.maxHeightScreen}`,
    props?.ringColor && `ring-${props.ringColor}`,
    props?.ringWidth && `ring-${props.ringWidth}`,
    props?.ringOfsset && `ring-offset-${props.ringOfsset}`,
    props?.scale && `scale-${props.scale}`,
    props?.rotate && `rotate-${props.rotate}`,
    props?.select && `select-${props.select}`,
    props?.scaleY && `scale-y-${props.scaleY}`,
    props?.scaleX && `scale-x-${props.scaleX}`,
    props?.opacity && `opacity-${props.opacity}`,
    props?.wordBreak && `break-${props.wordBreak}`,
    props?.borderTop && `border-t`,
    props?.borderLeft && `border-l`,
    props?.borderRight && `border-r`,
    props?.borderBottom && `border-b`,
    props?.borderColor && `border-${props.borderColor}`,
    props?.borderRadius && `rounded-${props.borderRadius}`,
    props?.className
  );

/**
 * @description
 * Hover utility to avoid redundant hovering classes.
 */
export const hoverFn = (props: BoxProps): string => {
  const classNames = classes(props).split(" ");

  return classNames.map((key) => `hover:${key}`).join(" ");
};
