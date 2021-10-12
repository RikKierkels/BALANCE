import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useLockBodyScroll } from "react-use";
import Modal from "./Modal";

type ModalContext = {
  close: () => void;
  open: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  isOpen: boolean;
};
const ModalContext = React.createContext<ModalContext | undefined>(undefined);

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

  useLockBodyScroll(isOpen);

  return (
    <ModalContext.Provider value={{ close, open, isOpen }}>
      {children}
      {isOpen && <Modal>{modal}</Modal>}
    </ModalContext.Provider>
  );
};

export default ModalProvider;