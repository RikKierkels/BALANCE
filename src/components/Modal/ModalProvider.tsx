import React, { PropsWithChildren, useCallback, useState } from "react";
import useLockBodyScroll from "react-use/lib/useLockBodyScroll";
import Modal from "./Modal";

type ModalState = {
  content: React.ReactNode;
  options?: ModalOptions;
};

type ModalOptions = {
  title?: string;
};

type ModalContext = {
  close: () => void;
  open: (content: ModalState["content"], options?: ModalState["options"]) => void;
  isOpen: boolean;
};

const EMPTY_MODAL: ModalState = { content: null, options: { title: "" } };
const Context = React.createContext<ModalContext | undefined>(undefined);

export const useModal = () => {
  const context = React.useContext(Context);
  if (!context) throw new Error("useModal must be used within a ModalProvider.");

  return context;
};

const ModalProvider = ({ children }: PropsWithChildren<{}>) => {
  const [{ content, options }, setModal] = useState(EMPTY_MODAL);
  const isOpen = !!content;
  useLockBodyScroll(isOpen);

  const context: ModalContext = {
    close: useCallback(() => setModal(EMPTY_MODAL), [setModal]),
    open: useCallback((content, options) => setModal({ content, options }), [setModal]),
    isOpen,
  };

  return (
    <Context.Provider value={context}>
      {children}
      {isOpen && <Modal title={options?.title}>{content}</Modal>}
    </Context.Provider>
  );
};

export default ModalProvider;