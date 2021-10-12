import React from "react";
import styled from "styled-components";
import Theme from "./design/Theme";
import FundListItem from "./components/Fund/FundListItem";
import FundList from "./components/Fund/FundList";
import PortfolioHeader from "./components/Portfolio/PortfolioHeader";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";
import { PrimaryButton, IconButton } from "./components/Buttons";
import BalanceInput from "./components/Balance/BalanceInput";
import BalanceForm from "./components/Balance/BalanceForm";
import useLocalStorageReducer from "./shared/use-local-storage-reducer";
import { reducer } from "./shared/reducer";
import { AddIcon } from "./components/Icons";
import { useModal } from "./components/Modal/ModalProvider";

const App = () => {
  const { open } = useModal();
  const [{ portfolio, amount }, dispatch] = useLocalStorageReducer(
    reducer,
    {
      portfolio: {
        funds: [
          { id: "HSBC World", quantity: 10, price: 10, total: 100, weight: { actual: 0.25, target: 0.5 } },
          { id: "iShares Emerging", quantity: 5, price: 20, total: 100, weight: { actual: 0.25, target: 0.25 } },
          { id: "Vanguard S&P500", quantity: 5, price: 40, total: 200, weight: { actual: 0.5, target: 0.25 } },
        ],
        total: 400,
      },
      amount: null,
    },
    "state",
  );

  const handleSubmit = (event: React.FormEvent) => (event.preventDefault(), dispatch({ type: "balanced" }));

  return (
    <AppContainer>
      <PortfolioHeader>
        <IconButton onClick={() => open(<div>Hi mom</div>)}>
          <AddIcon />
        </IconButton>
        <PortfolioTotal total={portfolio.total} />
      </PortfolioHeader>
      <FundList>
        {portfolio.funds.map((fund) => (
          <FundListItem key={fund.id} fund={fund} />
        ))}
      </FundList>
      <BalanceForm onSubmit={handleSubmit}>
        <PrimaryButton type="submit">Balance</PrimaryButton>
        <BalanceInput amount={amount} onChange={(amount) => dispatch({ type: "amountChanged", payload: { amount } })} />
      </BalanceForm>
    </AppContainer>
  );
};

const AppContainer = styled.section`
  ${FundList} {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export default App;