import { PropsWithChildren, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import useClickAway from "react-use/lib/useClickAway";
import useKey from "react-use/lib/useKey";
import FocusLock from "react-focus-lock";
import { useModal } from "./ModalProvider";

const MODAL_CONTAINER_ID = "modal-root";
type Props = PropsWithChildren<{ title?: string }>;

const Modal = ({ children, title }: Props) => {
  const container = document.getElementById(MODAL_CONTAINER_ID);
  if (!container) throw new Error(`Error rendering <Modal/>. Cannot find an element with id: ${MODAL_CONTAINER_ID}.`);

  const ref = useRef(null);
  const { close } = useModal();
  useClickAway(ref, close);
  useKey("Escape", close);

  return ReactDOM.createPortal(
    <Backdrop>
      <Dialog ref={ref} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {title && <h2 id="modal-title">{title}</h2>}
        <Body>{children}</Body>
      </Dialog>
    </Backdrop>,
    container,
  );
};

const Backdrop = styled(FocusLock)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 0 ${({ theme }) => theme.spacing.xxlg};
  background-color: ${({ theme }) => theme.colors.modal.backdrop};
`;

const Dialog = styled.section`
  width: calc(${({ theme }) => theme.app.width} * 0.5);
  border-radius: ${({ theme }) => theme.radius.modal};
  background-color: ${({ theme }) => theme.colors.modal.background};

  > * {
    padding: ${({ theme }) => theme.spacing.xlg} ${({ theme }) => theme.spacing.xxlg};
  }

  > *:first-child {
    border-bottom: 2px solid ${({ theme }) => theme.colors.modal.border};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Modal;