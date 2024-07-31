import React from "react";
import { classes } from "./styles";
import { CardProps, CardTitleProps } from "./types";

export const Card: React.FunctionComponent<CardProps> = ({
  requirement,
  description,
  Icon,
}) => (
  <div className={classes.card.size}>
    <div className={classes.card.style}>
      <div className={classes.card.separator}>
        <div>
          <h1 className={classes.card.title}> {requirement} </h1>
          <h2 className={classes.card.body}>{description}</h2>
        </div>
        <div className={classes.card.icon}>{Icon && <Icon />} </div>
      </div>
    </div>
  </div>
);


export const DangerTitle: React.FC<CardTitleProps> = ({ title, Icon }) => (
  <div className={classes.title.rule}>
    <div className={classes.title.icon}>{Icon && <Icon />}</div>
    <div />
    <h1 className={classes.title.danger}> {title}</h1>
  </div>
);


export const CheckTitle: React.FC<CardTitleProps> = ({ title, Icon }) => (
  <div className={classes.title.rule}>
    <div className={classes.title.icon}>{Icon && <Icon />}</div>
    <div />
    <h1 className={classes.title.pass}>{title}</h1>
  </div>
);

export const AlertTitle: React.FC<CardTitleProps> = ({ title, Icon }) => (
  <div className={classes.title.rule}>
    <div className={classes.title.icon}>{Icon && <Icon />}</div>
    <div />
    <h1 className={classes.title.alert}>{title}</h1>
  </div>
);
