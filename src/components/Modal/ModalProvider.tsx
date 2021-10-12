import React, { PropsWithChildren, useCallback, useState } from "react";
import { useLockBodyScroll } from "react-use";
import Modal from "./Modal";

type ModalContext = {
  close: () => void;
  open: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  isOpen: boolean;
};
const Context = React.createContext<ModalContext | undefined>(undefined);

export const useModal = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider.");
  }

  return context;
};

const ModalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [modal, setModal] = useState<React.ReactNode>();

  const close = useCallback(() => setModal(undefined), [setModal]);
  const open = setModal;
  const isOpen = !!modal;

  useLockBodyScroll(isOpen);

  return (
    <Context.Provider value={{ close, open, isOpen }}>
      {children}
      {isOpen && <Modal>{modal}</Modal>}
    </Context.Provider>
  );
};

export default ModalProvider;