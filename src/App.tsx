import React, { useState } from "react";
import { Portfolio } from "./shared/portfolio";
import FundListItem from "./components/Fund/FundListItem";
import FundList from "./components/Fund/FundList";
import Theme from "./design/Theme";
import PortfolioHeader from "./components/Portfolio/PortfolioHeader";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";
import styled from "styled-components";
import { PrimaryButton } from "./components/Buttons/Buttons";
import BalanceInput from "./components/Balance/BalanceInput";
import BalanceForm from "./components/Balance/BalanceForm";

const App = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [portfolio, _] = useState<Portfolio>({
    funds: [
      { id: "HSBC World", quantity: 10, price: 10, total: 100, weight: { actual: 0.25, target: 0.5 } },
      { id: "iShares Emerging Markets", quantity: 5, price: 20, total: 100, weight: { actual: 0.25, target: 0.25 } },
      { id: "Vanguard S&P500", quantity: 5, price: 40, total: 200, weight: { actual: 0.5, target: 0.25 } },
    ],
    total: 400,
  });

  return (
    <Theme>
      <AppContainer>
        <PortfolioHeader>
          <span />
          <PortfolioTotal total={portfolio.total} />
        </PortfolioHeader>
        <FundList>
          {portfolio.funds.map((fund) => (
            <FundListItem key={fund.id} fund={fund} />
          ))}
        </FundList>
        <BalanceForm onSubmit={() => {}}>
          <PrimaryButton type="submit">Balance</PrimaryButton>
          <BalanceInput amount={amount} onChange={setAmount} />
        </BalanceForm>
      </AppContainer>
    </Theme>
  );
};

const AppContainer = styled.section`
  ${FundList} {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export default App;