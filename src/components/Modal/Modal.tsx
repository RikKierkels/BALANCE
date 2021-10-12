import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

type Props = PropsWithChildren<{}>;

const Modal = ({ children }: Props) => {
  const container = document.getElementById("modal-root");
  return container ? ReactDOM.createPortal(children, container) : <>{children}</>;
};

export default Modal;