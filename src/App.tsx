import React from "react";
import styled from "styled-components";
import FundListItem from "./components/Fund/FundListItem";
import FundList from "./components/Fund/FundList";
import PortfolioHeader from "./components/Portfolio/PortfolioHeader";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";
import BalanceInput from "./components/Balance/BalanceInput";
import BalanceForm from "./components/Balance/BalanceForm";
import useLocalStorageReducer from "./shared/use-local-storage-reducer";
import { reducer } from "./shared/reducer";
import { ReactComponent as AddIcon } from "../src/assets/plus.svg";
import { useModal } from "./components/Modal/ModalProvider";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import IconButton from "./components/Buttons/IconButton";
import FundForm, { PartialFund } from "./components/Fund/FundForm";

const App = () => {
  const { open, close } = useModal();
  const [{ portfolio, amount }, dispatch] = useLocalStorageReducer(
    reducer,
    { portfolio: { funds: [], total: 0 }, amount: null },
    "state",
  );

  const handleBalance = (event: React.FormEvent) => (event.preventDefault(), dispatch({ type: "balanced" }));
  const handleAddFund = (fund: PartialFund) => (dispatch({ type: "fundAdded", payload: { fund } }), close());

  return (
    <AppContainer>
      <PortfolioHeader>
        <IconButton onClick={() => open(<FundForm onSubmit={handleAddFund} />)}>
          <AddIcon />
        </IconButton>
        <PortfolioTotal total={portfolio.total} />
      </PortfolioHeader>
      <FundList>
        {portfolio.funds.map((fund) => (
          <FundListItem key={fund.id} fund={fund} />
        ))}
      </FundList>
      <BalanceForm onSubmit={handleBalance}>
        <PrimaryButton type="submit">Balance</PrimaryButton>
        <BalanceInput
          required={true}
          amount={amount}
          onChange={(amount) => dispatch({ type: "amountChanged", payload: { amount } })}
        />
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