import React from "react";
import { TooltipContainer, TooltipArrow, TooltipText } from "./styled";

export const Tooltip: React.FC<TooltipProps> = React.memo((props) => {
  const [visible, setVisible] = React.useState<boolean>(
    props?.controlled ?? props?.active ?? false
  );

  const handleShow = (): void => {
    if (props?.controlled === false) {
      return;
    }

    setVisible(true);
  };

  const handleHide = (): void => {
    if (props?.active) {
      return;
    }

    setVisible(false);
  };
  
  React.useEffect(() => {
    setVisible(!!props?.controlled);
  }, [props?.controlled]);

  const splitText = React.useMemo(() => {
    if (props?.text) {
      return props.text
        .split("{break}")
        .map((line, index) => (
          <div key={index}>{line.replace("{break}", "")}</div>
        ));
    }

    return "";
  }, [props.text]);

  return (
    <TooltipContainer
      tableData={props?.tableData}
      tableHead={props?.tableHead}
      className={props?.className}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
      zIndex={props?.zIndex}
    >
      {props.children}
      <TooltipText
        visible={visible}
        maxWidth={props?.maxWidth}
        orientation={props.orientation}
        zIndex={props?.zIndexText}
        infoWidth={props?.infoWidth}
      >
        {splitText}
        <TooltipArrow orientation={props.orientation} />
      </TooltipText>
    </TooltipContainer>
  );
});



export type TooltipProps = {
  text: string;
  active?: boolean;
  zIndex?: number;
  className?: string;
  infoWidth?: number;
  tableData?: boolean;
  tableHead?: boolean;
  zIndexText?: number;
  controlled?: boolean;
  maxWidth?: number | string;
  children: React.ReactNode;
  orientation?: "top" | "left" | "right" | "bottom" | "bottom-left" | "bottom-right";
};