import React from "react";
import styled from "styled-components";
import FundListItem from "./components/Fund/FundListItem";
import FundList from "./components/Fund/FundList";
import PortfolioHeader from "./components/Portfolio/PortfolioHeader";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";
import BalanceInput from "./components/Balance/BalanceInput";
import BalanceForm from "./components/Balance/BalanceForm";
import useLocalStorageReducer from "./hooks/use-local-storage-reducer";
import { reducer } from "./shared/reducer";
import { ReactComponent as AddIcon } from "../src/assets/plus.svg";
import { useModal } from "./components/Modal/ModalProvider";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import IconButton from "./components/Buttons/IconButton";
import FundForm from "./components/Fund/FundForm";
import { FundCreateOrUpdate } from "./shared/portfolio";

const App = () => {
  const { open, close } = useModal();
  const [{ portfolio, amount }, dispatch] = useLocalStorageReducer(
    reducer,
    { portfolio: { funds: [], total: 0 }, amount: null },
    "state",
  );

  const handleBalancePortfolio = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: "portfolioBalanced" });
  };

  const handleCreateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundCreated", payload: { fund } });
    close();
  };

  const handleUpdateFund = (id: string) => (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundUpdated", payload: { id, fund } });
    close();
  };

  return (
    <AppContainer>
      <PortfolioHeader>
        <IconButton onClick={() => open(<FundForm onSubmit={handleCreateFund} />)}>
          <AddIcon />
        </IconButton>
        <PortfolioTotal total={portfolio.total} />
      </PortfolioHeader>
      <FundList>
        {portfolio.funds.map((fund) => (
          <FundListItem
            key={fund.id}
            fund={fund}
            onUpdateClicked={() => open(<FundForm fund={fund} onSubmit={handleUpdateFund(fund.id)} />)}
          />
        ))}
      </FundList>
      <BalanceForm onSubmit={handleBalancePortfolio}>
        <PrimaryButton type="submit">Balance</PrimaryButton>
        <BalanceInput
          required={true}
          amount={amount}
          onChange={(amount) => dispatch({ type: "amountUpdated", payload: { amount } })}
        />
      </BalanceForm>
    </AppContainer>
  );
};

const AppContainer = styled.main`
  ${FundList} {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export default App;