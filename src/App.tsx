import React from "react";
import styled from "styled-components";
import FundListItem from "./components/Fund/FundListItem";
import FundList from "./components/Fund/FundList";
import PortfolioHeader from "./components/Portfolio/PortfolioHeader";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";
import InputCurrency from "./components/Form/InputCurrency";
import BalanceForm, { BalanceAmount } from "./components/Balance/BalanceForm";
import useLocalStorageReducer from "./hooks/use-local-storage-reducer";
import { reducer } from "./shared/reducer";
import { ReactComponent as AddIcon } from "../src/assets/plus.svg";
import { ReactComponent as MoneyIcon } from "../src/assets/money.svg";
import { useModal } from "./components/Modal/ModalProvider";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import IconButton from "./components/Buttons/IconButton";
import FundCreateOrUpdateForm from "./components/Fund/FundCreateOrUpdateForm";
import { Fund, FundCreateOrUpdate, FundPrices } from "./shared/portfolio";
import FundPricesUpdateForm from "./components/Fund/FundPricesUpdateForm";

const App = () => {
  const { open, close } = useModal();
  const [{ amount, portfolio }, dispatch] = useLocalStorageReducer(
    reducer,
    { amount: undefined, portfolio: { funds: [], total: 0 } },
    "state",
  );

  const handleOpenCreateModal = () =>
    open(<FundCreateOrUpdateForm onSubmit={handleCreateFund} />, { title: "Fund creation" });

  const handleOpenUpdateModal = (fund: Fund) =>
    open(<FundCreateOrUpdateForm fund={fund} onSubmit={handleUpdateFund} />, { title: "Fund update" });

  const handleOpenUpdatePricesModal = () =>
    open(<FundPricesUpdateForm funds={portfolio.funds} onSubmit={handleUpdatePrices} />, {
      title: "Price update",
    });

  const handleBalancePortfolio = ({ amount }: BalanceAmount) =>
    dispatch({ type: "portfolioBalanced", payload: { amount } });

  const handleCreateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundCreated", payload: { fund } });
    close();
  };

  const handleUpdateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundUpdated", payload: { fund } });
    close();
  };

  const handleUpdatePrices = (prices: FundPrices) => {
    dispatch({ type: "fundPricesUpdated", payload: { prices } });
    close();
  };

  const handleDeleteFund = (id: string) => dispatch({ type: "fundDeleted", payload: { id } });

  return (
    <AppContainer>
      <PortfolioHeader>
        <div>
          <IconButton onClick={handleOpenCreateModal}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={handleOpenUpdatePricesModal}>
            <MoneyIcon />
          </IconButton>
        </div>
        <PortfolioTotal total={portfolio.total} />
      </PortfolioHeader>
      <FundList>
        {portfolio.funds.map((fund) => (
          <FundListItem
            key={fund.id}
            fund={fund}
            onUpdateClick={handleOpenUpdateModal}
            onDeleteClick={handleDeleteFund}
          />
        ))}
      </FundList>
      <BalanceForm<BalanceAmount> defaultValues={{ amount }} onSubmit={handleBalancePortfolio}>
        {({ register }) => (
          <>
            <PrimaryButton type="submit">Balance</PrimaryButton>
            <InputCurrency aria-label="amount" {...register("amount", { required: true, min: 0 })} />
          </>
        )}
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