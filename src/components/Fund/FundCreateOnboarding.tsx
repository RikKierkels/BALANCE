import styled from "styled-components";
import PrimaryButton from "../Buttons/PrimaryButton";
import { ReactComponent as AddIcon } from "../../assets/plus.svg";
import { ReactComponent as FundIcon } from "../../assets/fund.svg";
import React from "react";

type Props = {
  onCreateFundClick: () => void;
};

const FundCreateOnboarding = ({ onCreateFundClick }: Props) => (
  <Main>
    <FundIconWrapper>
      <StyledFundIcon />
    </FundIconWrapper>
    <h2>Add your first fund</h2>
    <p>
      Funds are your investments. They can be anything from stocks to ETF's or bonds. After you add your first fund you
      can start balancing your portfolio.
    </p>
    <PrimaryButton left={<AddIcon />} onClick={onCreateFundClick}>
      Add a fund
    </PrimaryButton>
  </Main>
);

export default FundCreateOnboarding;

const Main = styled.main`
  margin-left: auto;
  margin-right: auto;
  max-width: 60ch;
  padding: ${({ theme }) => theme.spacing.xlg};
  background-color: white;

  > * + * {
    margin-top: ${({ theme }) => theme.spacing.lg};
  }

  > *:nth-child(3) {
    margin-top: ${({ theme }) => theme.spacing.sm};
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
  fill: ${({ theme }) => theme.colors.button.iconDarkHover};
`;