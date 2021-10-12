import { PropsWithChildren, useRef } from "react";
import ReactDOM from "react-dom";
import { useClickAway, useKey } from "react-use";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/times.svg";
import IconButton from "../Buttons/IconButton";
import { useModal } from "./ModalProvider";

const Modal = ({ children }: PropsWithChildren<{}>) => {
  const ref = useRef(null);
  const { close } = useModal();
  useClickAway(ref, close);
  useKey("Escape", close);

  const modal = (
    <Backdrop>
      <Container>
        <Card ref={ref}>{children}</Card>
        <CloseButton isLight onClick={close}>
          <StyledCloseIcon />
        </CloseButton>
      </Container>
    </Backdrop>
  );

  const container = document.getElementById("modal-root");
  return container ? ReactDOM.createPortal(modal, container) : modal;
};

const Backdrop = styled.div`
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

const Card = styled.section`
  width: calc(${({ theme }) => theme.app.width} * 0.5);
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.modal.background};
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