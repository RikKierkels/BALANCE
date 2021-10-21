import { PropsWithChildren, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import useClickAway from "react-use/lib/useClickAway";
import useKey from "react-use/lib/useKey";
import FocusLock from "react-focus-lock";
import { ReactComponent as CloseIcon } from "../../assets/times.svg";
import IconButton from "../Buttons/IconButton";
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
      <Container role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <Dialog ref={ref}>
          {title && <Title id="modal-title">{title}</Title>}
          {children}
        </Dialog>
        <CloseButton isLight onClick={close}>
          <StyledCloseIcon />
        </CloseButton>
      </Container>
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
  padding: 0 ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.modal.backdrop};
`;

const Container = styled.div`
  position: relative;
`;

const Dialog = styled.section`
  width: calc(${({ theme }) => theme.app.width} * 0.5);
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.modal.background};
`;

const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-weight: 500;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: ${({ theme }) => theme.colors.modal.closeIcon};
`;

export default Modal;