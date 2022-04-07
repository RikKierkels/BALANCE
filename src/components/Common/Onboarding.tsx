import React, { useCallback } from "react";
import styled from "styled-components";
import useShortcut from "../../hooks/use-shortcut";
import { ReactComponent as AddIcon } from "../../assets/plus.svg";
import { ReactComponent as FundIcon } from "../../assets/fund.svg";
import { useAppState } from "../../AppStateProvider";
import { useModal } from "../Modal/ModalProvider";
import FundCreateOrUpdateForm from "../Fund/FundCreateOrUpdateForm";
import PrimaryButton from "../Buttons/PrimaryButton";
import Shortcut from "./Shortcut";

const Onboarding = () => {
  const { open, close } = useModal();
  const [, dispatch] = useAppState();
  const addFundRef = useShortcut<HTMLButtonElement>("n", (button) => button.click());

  const handleOpenCreateFundModal = useCallback(
    () =>
      open(
        <FundCreateOrUpdateForm
          onCancel={close}
          onSubmit={(fund) => {
            dispatch({ type: "fundCreated", payload: { fund } });
            close();
          }}
        />,
        { title: "Add fund" },
      ),
    [open, close, dispatch],
  );

  return (
    <Main>
      <FundIconWrapper>
        <StyledFundIcon />
      </FundIconWrapper>
      <h2>Add your first fund</h2>
      <p>
        Funds are your investments. They can be anything from stocks to ETF's or bonds. After you add your first fund
        you can start balancing your portfolio.
      </p>
      <PrimaryButton
        ref={addFundRef}
        left={<AddIcon />}
        right={<Shortcut>N</Shortcut>}
        onClick={handleOpenCreateFundModal}
      >
        Add a fund
      </PrimaryButton>
    </Main>
  );
};

export default Onboarding;

const Main = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width: 60ch;
  padding: ${({ theme }) => theme.spacing.xxlg};
  background-color: ${({ theme }) => theme.colors.onboarding.background};

  > * + * {
    margin-top: ${({ theme }) => theme.spacing.xxlg};
  }

  > *:nth-child(3) {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const FundIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.75rem;
  height: 3.75rem;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledFundIcon = styled(FundIcon)`
  width: 2.5rem;
  height: 2.5rem;
  fill: ${({ theme }) => theme.colors.onboarding.icon};
`;