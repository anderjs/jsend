import React from "react";
import classNames from "clsx";
import styled from "styled-components";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Text, CommonTextProps } from "@nectiasw/components/Text";

// - Styles
import { classes } from "./styles";

export const Menu: React.FC<
  DetailProps & {
    children?: React.ReactNode;
    size?: CommonTextProps["size"];
    color?: CommonTextProps["color"];
  }
> = (props) => {
  const [show, setShow] = React.useState<boolean>(true);

  /**
   * @description
   * Initial value status.
   */
  React.useEffect(() => {
    if (typeof props?.initialValue === "boolean") {
      setShow(props.initialValue);
    }
  }, [props.initialValue]);

  /**
   * @description
   * Collapse function.
   */
  const handleSeeDetails = () => {
    setShow((status) => !status);
  };

  return (
    <>
      <div className={classes.collapse}>
        <div
          className={classes.texts}
          onClick={() => props.seeDetailsTitles && handleSeeDetails()}
        >
          <Text color={props.color} tag="h1" size={props.size} font="bold">
            {props.title}
          </Text>
        </div>
        <div onClick={handleSeeDetails}>
          <ChevronDownIcon
            className={classNames(
              show ? classes.open : classes.close,
              classes.icon
            )}
          />
        </div>
      </div>
      <br />
      {show && (
        <>
          <div className={classes.content}>{props.children}</div>
        </>
      )}
    </>
  );
};

Menu.defaultProps = {
  size: "xl",
  color: "primary",
};

export const Section: React.FC<
  SectionProps & {
    labelSize?: CommonTextProps["size"];
    valueSize?: CommonTextProps["size"];
    labelFont?: CommonTextProps["font"];
    valueFont?: CommonTextProps["font"];
    labelColor?: CommonTextProps["color"];
    valueColor?: CommonTextProps["color"];
  }
> = React.memo((props) => {
  const value = React.useMemo<string | number | undefined>(() => {
    if (props?.formatAs === "Hours") {
      return `${props?.value} Horas`;
    }

    if (props?.formatAs === "CLP") {
      const valueAsNumber = Number(props.value);

      const currency = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      });

      return currency.format(valueAsNumber);
    }

    return props?.value;
  }, [props?.formatAs, props.value]);

  return (
    <>
      <div className={classes.container}>
        <Text
          tag="h2"
          size={props.labelSize}
          font={props.labelFont}
          color={props.labelColor}
        >
          {props?.label}
        </Text>
        <Text
          tag="h3"
          size={props.valueSize}
          font={props.valueFont}
          color={props.valueColor}
          className={classes.value}
        >
          {value}
        </Text>
      </div>
    </>
  );
});

Section.defaultProps = {
  valueSize: "lg",
  labelSize: "sm",
  labelFont: "bold",
  valueFont: "bold",
  labelColor: "info",
  valueColor: "primary",
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Item = styled.div<{
  single?: boolean;
  wrap?: boolean;
  basis?: string;
}>`
  margin: 5px;
  flex: ${(props) =>
    props?.single ? "0 0 auto" : `1 1 ${props?.basis || "0%"}`};
  white-space: ${(props) => props?.wrap && "nowrap"};

  &:nth-child(3) {
    margin-left: auto;
  }
`;

export const Content = styled.div<{ justify: string }>`
  display: flex;
  justify-content: ${(props) => props?.justify};
`;

export type DetailProps = {
  title?: string;
  initialValue?: boolean;
  seeDetailsTitles?: boolean;
};

export type SectionProps = {
  label?: string;
  color?: string;
  formatAs?: "CLP" | "Hours" | "Default";
  orientation?: "right" | "left" | "bottom" | "top";
  value?: string | number;
};
