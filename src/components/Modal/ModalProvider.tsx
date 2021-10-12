import React, { PropsWithChildren, useCallback, useState } from "react";
import Modal from "./Modal";

const ModalContext = React.createContext<React.ReactNode>(undefined);

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider.");
  }

  return context;
};

type Props = PropsWithChildren<{}>;

const ModalProvider = ({ children }: Props) => {
  const [modal, setModal] = useState<React.ReactNode>();

  const close = useCallback(() => setModal(undefined), [setModal]);
  const open = setModal;
  const isOpen = !!modal;

  return (
    <ModalContext.Provider value={{ close, open, isOpen }}>
      {children}
      {isOpen && <Modal>{modal}</Modal>}
    </ModalContext.Provider>
  );
};

export default ModalProvider;