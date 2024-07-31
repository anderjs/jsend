import React from "react";

import { CommonTextProps, Text } from "@nectiasw/components/Text";


/**
 * @description
 * Empty state for containers.
 */
export const Empty: React.FC<EmptyProps> = React.memo((props) => {
  return (
    <div>
      {props?.title && (
        <Text {...props.titleProps}> 
          {props.title}
        </Text>
      )}
      {props?.description && (
        <Text {...props.decriptionProps}>
          {props.description}
        </Text>
      )}
    </div>
  );
});

Empty.defaultProps = {
  titleProps: {
    tag: "h1",
    size: "4xl",
    font: "bold",
    color: "secondary"
  },
  decriptionProps: {
    tag: "p",
    size: "xl",
    font: "medium"
  }
};



export type EmptyProps = {
  title?: string;
  description?: string;
  titleProps?: CommonTextProps;
  decriptionProps?: CommonTextProps;
};
