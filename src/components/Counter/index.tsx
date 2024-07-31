import React from "react";
import classNames from "clsx";
import styled from "styled-components";

// - Styles
import { classes } from "./styles";

export const Counter: React.FunctionComponent<CounterProps> = ({
  passedDays,
  remainingDays,
  message,
  color,
}) => {
  const classRef = classNames({
    "text-4xl": remainingDays && Math.abs(remainingDays) < 100,
    "text-3xl": remainingDays && Math.abs(remainingDays) >= 100,
  });

  return (
    <div className={classes.container}>
      <Circle className={classes.circle} color={color}>
        <div className={classNames(classes.number, classRef)}>
          {remainingDays}
        </div>
        <div className={classes.unit}>días</div>
      </Circle>
      <div className={classes.info}>
        <div className={classes.message}>{message}</div>
        <PassedDays color={color}>{passedDays} días</PassedDays>
        <div className={classes.transcurridoLabel}>transcurridos</div>
      </div>
    </div>
  );
};

export const Circle = styled.div`
  background-color: ${({ color }) => color};
`;

export const PassedDays = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: -0.3125rem;
  margin-top: 0.3125rem;
  color: ${({ color }) => color};
`;

export type CounterProps = {
    color?: string;
    message?: string;
    passedDays?: number;
    remainingDays?: number;
    children?: React.ReactNode;
  };
  