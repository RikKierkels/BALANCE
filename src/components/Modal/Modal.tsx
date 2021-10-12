import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

type Props = PropsWithChildren<{}>;

const Modal = ({ children }: Props) => {
  const container = document.getElementById("modal-root");

  const m = (
    <Backdrop>
      <Card>{children}</Card>
    </Backdrop>
  );

  return container ? ReactDOM.createPortal(m, container) : m;
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

const Card = styled.section`
  width: calc(${({ theme }) => theme.app.width} * 0.5);
  background-color: ${({ theme }) => theme.colors.modal.background};
`;

export default Modal;