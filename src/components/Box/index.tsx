import React from "react";
import { classes } from "./styles";

export const Box: React.FC<BoxProps> = React.memo((props) => {
  const {
    blur,
    clear,
    color,
    top,
    left,
    right,
    float,
    bottom,
    scale,
    width,
    height,
    margin,
    padding,
    display,
    children,
    position,
    className,
    container,
    insetY,
    insetX,
    scaleY,
    scaleX,
    zIndex,
    maxWidth,
    maxHeight,
    borderBox,
    whiteSpace,
    wordBreak,
    ringColor,
    ringOfsset,
    ringWidth,
    textAlign,
    fullWidth,
    fullHeight,
    textOverflow,
    textTransform,
    textDecoration,
    marginY,
    marginX,
    paddingX,
    paddingY,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    minWidth,
    minHeight,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    minWidthScreen,
    minHeightScreen,
    maxWidthScreen,
    maxHeightScreen,
    visibility,
    borderStyle,
    borderWidth,
    breakAfter,
    breakBefore,
    breakInside,
    brightness,
    borderRadius,
    opacity,
    onHover,
    select,
    rotate,
    translate,
    lineHeight,
    borderColor,
    borderBottom,
    borderLeft,
    borderRight,
    borderTop,
    backgroundColor,
    ...args
  } = props;

  /**
   * @description
   * Optimizing assets for building the component.
   */
  const classNames = React.useMemo(
    () =>
      classes({
        blur,
        clear,
        color,
        top,
        left,
        right,
        float,
        bottom,
        scale,
        width,
        height,
        margin,
        padding,
        display,
        children,
        position,
        className,
        container,
        insetY,
        insetX,
        scaleY,
        scaleX,
        zIndex,
        maxWidth,
        maxHeight,
        borderBox,
        whiteSpace,
        wordBreak,
        ringColor,
        ringOfsset,
        ringWidth,
        textAlign,
        fullWidth,
        fullHeight,
        textOverflow,
        textTransform,
        textDecoration,
        marginY,
        marginX,
        paddingX,
        paddingY,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        minWidth,
        minHeight,
        paddingTop,
        paddingLeft,
        paddingRight,
        paddingBottom,
        visibility,
        borderStyle,
        borderWidth,
        breakAfter,
        breakBefore,
        breakInside,
        borderBottom,
        borderLeft,
        borderRight,
        borderTop,
        onHover,
        select,
        rotate,
        translate,
        brightness,
        lineHeight,
        borderRadius,
        borderColor,
        minWidthScreen,
        maxWidthScreen,
        maxHeightScreen,
        minHeightScreen,
        backgroundColor,
        opacity,
      }),
    [
      blur,
      clear,
      color,
      top,
      left,
      right,
      float,
      bottom,
      scale,
      width,
      height,
      margin,
      padding,
      display,
      children,
      position,
      className,
      container,
      insetY,
      insetX,
      scaleY,
      scaleX,
      zIndex,
      maxWidth,
      maxHeight,
      borderBox,
      whiteSpace,
      wordBreak,
      ringColor,
      ringOfsset,
      ringWidth,
      textAlign,
      fullWidth,
      fullHeight,
      textOverflow,
      textTransform,
      textDecoration,
      marginY,
      marginX,
      paddingX,
      paddingY,
      marginTop,
      marginLeft,
      marginRight,
      marginBottom,
      minWidth,
      minHeight,
      paddingTop,
      paddingLeft,
      paddingRight,
      paddingBottom,
      visibility,
      borderStyle,
      borderWidth,
      breakAfter,
      breakBefore,
      breakInside,
      onHover,
      select,
      rotate,
      translate,
      brightness,
      lineHeight,
      borderColor,
      borderRadius,
      borderBottom,
      borderRight,
      borderLeft,
      borderTop,
      minWidthScreen,
      maxWidthScreen,
      maxHeightScreen,
      minHeightScreen,
      backgroundColor,
      opacity,
    ]
  );

  if (props?.as) {
    return React.createElement(props.as ?? "div", {
      children,
      className: classNames,
    });
  }

  return (
    <div {...args} className={classNames}>
      {children}
    </div>
  );
});

enum Rule {
  REM = "rem",
  PIXELS = "px",
}

type RotateDegree = "0" | "1" | "2" | "3" | "6" | "12" | "45" | "90" | "180";

type BrightnessLevel =
  | "0"
  | "50"
  | "75"
  | "90"
  | "95"
  | "100"
  | "105"
  | "110"
  | "125"
  | "150"
  | "200";

type ScaleLevel = "0" | "50" | "75" | "90" | "95" | "100";

type BorderWidth =
  | "0"
  | "2"
  | "4"
  | "8"
  | "x-0"
  | "x-2"
  | "x-4"
  | "x-8"
  | "x"
  | "y-0"
  | "y-2"
  | "y-4"
  | "y-8"
  | "y"
  | "s-0"
  | "s-2"
  | "s-4"
  | "s-8"
  | "s"
  | "e-0"
  | "e-2"
  | "e-4"
  | "e-8"
  | "e"
  | "t-0"
  | "t-2"
  | "t-4"
  | "t-8"
  | "t"
  | "r-0"
  | "r-2"
  | "r-4"
  | "r-8"
  | "r"
  | "b-0"
  | "b-2"
  | "b-4"
  | "b-8"
  | "b"
  | "l-0"
  | "l-2"
  | "l-4"
  | "l-8"
  | "l";

type Radius = "none" | "sm" | "full" | "md" | "lg" | "xl" | "2xl" | "3xl";

type OpacityValue =
  | "0"
  | "5"
  | "10"
  | "20"
  | "25"
  | "30"
  | "40"
  | "50"
  | "60"
  | "70"
  | "75"
  | "80"
  | "90"
  | "95"
  | "100";

type BorderRadius =
  | Radius
  | `s-${Radius}`
  | `e-${Radius}`
  | `t-${Radius}`
  | `r-${Radius}`
  | `b-${Radius}`
  | `ss-${Radius}`
  | `se-${Radius}`
  | `ee-${Radius}`
  | `es-${Radius}`
  | `tl-${Radius}`
  | `tr-${Radius}`
  | `bl-${Radius}`
  | `br-${Radius}`;

type BreakTiming =
  | "auto"
  | "avoid"
  | "all"
  | "avoid-page"
  | "page"
  | "left"
  | "right"
  | "column";

type ScreenSize =
  | "0"
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full"
  | "min"
  | "max"
  | "fit"
  | "prose";

type BlurLevel = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type SelectProperties = "none" | "text" | "all" | "auto";

type TextOverflowProperties = "truncate" | "ellipsis" | "clip";

type DisplayProperties = "block" | "inline" | "inline-block" | string;

type PositionProperties =
  | "static"
  | "relative"
  | "absolute"
  | "sticky"
  | "fixed";

type OverflowProperties =
  | "auto"
  | "hidden"
  | "clip"
  | "visible"
  | "scroll"
  | "x-auto"
  | "y-auto"
  | "x-hidden"
  | "y-hidden"
  | "x-clip"
  | "y-visible"
  | "x-scroll"
  | "y-scroll";

type whiteSpaceProperties =
  | "normal"
  | "nowrap"
  | "pre"
  | "pre-line"
  | "pre-wrap"
  | "break-spaces";

export type BoxProps = {
  id?: string;
  as?: string;
  rule?: Rule;
  color?: string;
  blur?: BlurLevel;
  grid?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  fullWidth?: boolean;
  fullHeight?: boolean;
  width?: number | string;
  height?: number | string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  insetX?: number | string;
  insetY?: number | string;
  margin?: number | string;
  marginX?: number | string;
  marginY?: number | string;
  padding?: number | string;
  paddingY?: number | string;
  paddingX?: number | string;
  paddingTop?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  minWidthScreen?: ScreenSize | string;
  minHeightScreen?: ScreenSize | string;
  maxWidthScreen?: ScreenSize | string;
  maxHeightScreen?: ScreenSize | string;
  marginTop?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  backgroundColor?: string;
  zIndex?: number | string;
  display?: DisplayProperties;
  position?: PositionProperties;
  overflow?: OverflowProperties;
  borderWidth?: BorderWidth | string | number;
  textOverflow?: TextOverflowProperties;
  borderTop?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  container?: boolean;
  breakAfter?: BreakTiming;
  breakInside?: BreakTiming;
  breakBefore?: BreakTiming;
  float?: "left" | "right";
  borderBox?: "border" | "content";
  clear?: "left" | "right" | "both" | "none";
  borders?: string[];
  wordBreak?: "normal" | "words" | "all" | "keep";
  borderStyle?: "solid" | "dashed";
  borderColor?: string;
  visibility?: "visibile" | "invisible" | "collapse";
  textAlign?: "left" | "center" | "right" | "justify" | "start" | "end";
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  textDecoration?: "underline" | "overline" | "line-through" | "no-underline";
  lineHeight?: number | string;
  ringColor?: string | number;
  ringWidth?: string | number;
  ringOfsset?: string | number;
  brightness?: BrightnessLevel;
  borderRadius?: BorderRadius;
  scale?: ScaleLevel | string;
  scaleY?: ScaleLevel | string;
  scaleX?: ScaleLevel | string;
  rotate?: RotateDegree;
  select?: SelectProperties;
  whiteSpace?: whiteSpaceProperties;
  onHover?: Partial<BoxProps> & Exclude<BoxProps, "hover">;
  opacity?: OpacityValue;
} & React.DetailedHTMLProps<
  React.HtmlHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
