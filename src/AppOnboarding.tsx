import React from "react";
import styled from "styled-components";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import { ReactComponent as AddIcon } from "./assets/plus.svg";
import { ReactComponent as FundIcon } from "./assets/fund.svg";
import FundCreateOrUpdateForm from "./components/Fund/FundCreateOrUpdateForm";
import { useModal } from "./components/Modal/ModalProvider";
import { useAppState } from "./AppStateProvider";
import { FundCreateOrUpdate } from "./shared/portfolio";

const AppOnboarding = () => {
  const { open, close } = useModal();
  const [_, dispatch] = useAppState();

  const handleOpenCreateFundModal = () =>
    open(<FundCreateOrUpdateForm onCancel={close} onSubmit={handleCreateFund} />, { title: "Add fund" });

  const handleCreateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundCreated", payload: { fund } });
    close();
  };

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
      <PrimaryButton left={<AddIcon />} onClick={handleOpenCreateFundModal}>
        Add a fund
      </PrimaryButton>
    </Main>
  );
};

export default AppOnboarding;

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
    margin-top: ${({ theme }) => theme.spacing.sm};
  }

  > *:last-child {
    margin-top: ${({ theme }) => theme.spacing.xxlg};
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