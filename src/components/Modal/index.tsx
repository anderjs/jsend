import React from "react";

// - Prime React
import { Dialog } from "primereact/dialog";

// - Tailwind Styles
import { Tailwind } from "./styles";

export const Modal: React.FunctionComponent<ModalProps> = ({
  modal,
  isOpen,
  children,
  onClose = () => {},
}) => {
  return (
    <Dialog
      modal={modal}
      onHide={onClose}
      visible={isOpen}
      maskStyle={Tailwind.dialog.mask.style}
      headerClassName={Tailwind.dialog.header.className}
      contentClassName={Tailwind.dialog.content.className}
    >
      {children && children}
    </Dialog>
  );
};

export type ModalProps = {
  modal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};
