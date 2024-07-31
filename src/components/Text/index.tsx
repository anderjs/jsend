/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import classNames from "clsx";
import { classes } from "./styles";

export type CommonTextProps = {
  tag?: string;
  color?:
    | "info"
    | "opaque"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "white"
    | "darkened";
  customColor?: string;
  className?: string;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  font?:
    | "medium"
    | "bold"
    | "semibold"
    | "extrabold"
    | "normal"
    | "thin"
    | "regular"
    | "light"
    | "black"
    | "extralight";
  children?: React.ReactNode;
  style?: "italic" | "non-italic";
  sans?: boolean;
  leading?: string | number;
};

export type MessageTextProps = {
  className?: string;
  confirmation?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
};

export const Text: React.FunctionComponent<CommonTextProps> = (props) => {
  if (props?.tag) {
    const element = React.createElement(
      props.tag,
      {
        className: classNames(
          "m-0 p-0",
          props.sans && "font-sans",
          props.className && props.className,
          props.font && `font-${props.font}`,
          props.size && `text-${props.size}`,
          props.color && `text-${props.color}`,
          props.style && `font-${props.style}`,
          props.leading && `leading-${props.leading}`,
          props.customColor && `text-${props.customColor}`
        ),
      },
      props.children
    );

    return element;
  }

  return (
    <p
      className={classNames(
        "m-0 p-0",
        props.sans && "font-sans",
        props.className && props.className,
        props.font && `font-${props.font}`,
        props.size && `text-${props.size}`,
        props.color && `text-${props.color}`,
        props.style && `font-${props.style}`,
        props.leading && `leading-${props.leading}`,
        props.customColor && `text-${props.customColor}`
      )}
    >
      {props.children}
    </p>
  );
};

Text.defaultProps = {
  color: "info",
  size: "base",
  font: "medium",
};

/**
 * @description
 * Title component for the application on TailwindCSS.
 */
export const Title: React.FunctionComponent<CommonTextProps> = ({
  color,
  size,
  font,
  children,
}) => {
  return (
    <h1 className={classNames(`text-${size}`, `text-${color}`, `font-${font}`)}>
      {children}
    </h1>
  );
};

Title.defaultProps = {
  color: "info",
  size: "4xl",
  font: "bold",
};

/**
 * @description
 * Subtitle component for the application on TailwindCSS.
 */
export const Subtitle: React.FunctionComponent<CommonTextProps> = ({
  size,
  color,
  font,
  children,
}) => {
  return (
    <h2 className={classNames(`text-${size}`, `text-${color}`, `font-${font}`)}>
      {children}
    </h2>
  );
};

Subtitle.defaultProps = {
  color: "info",
  size: "xl",
  font: "normal",
};

/**
 * @description
 * Subtitle component for the application on TailwindCSS.
 */
export const Item: React.FunctionComponent<{ children?: React.ReactNode }> = ({ children }) => {
  return <h2 className={classes.inscription.title}>{children}</h2>;
};

/**
 * @description
 * Description component for the application on TailwindCSS.
 */
export const Description: React.FunctionComponent<{ content?: boolean, children?: React.ReactNode }> = ({
  content,
  children,
}) => {
  return (
    <h3
      className={classNames(
        classes.container.description,
        content && classes.container.content
      )}
    >
      {children}
    </h3>
  );
};

export const Success: React.FC<MessageTextProps> = (props) => {
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    if (props?.onDismiss) {
      window?.setTimeout(() => {
        if (isMounted.current) {
          props?.onDismiss?.();
        }
      }, dismissTimeout);

      return () => {
        isMounted.current = false;
      };
    }
  }, [props?.onDismiss]);

  return (
    <span
      className={classNames(
        classes.success.confirmation,
        props?.className && props.className,
        props?.confirmation ? classes.success.show : classes.success.hide
      )}
    >
      {props.children}
    </span>
  );
};

export const Error: React.FC<MessageTextProps> = (props) => {
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    if (props?.onDismiss) {
      window?.setTimeout(() => {
        if (isMounted.current) {
          props?.onDismiss?.();
        }
      }, dismissTimeout);

      return () => {
        isMounted.current = false;
      };
    }
  }, [props?.onDismiss]);

  return (
    <span
      className={classNames(
        classes.error.confirmation,
        props?.className && props.className,
        props?.confirmation ? classes.error.show : classes.error.hide
      )}
    >
      {props?.confirmation && props.children}
    </span>
  );
};

const dismissTimeout = 5000;