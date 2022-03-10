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
import { inputs } from "./components/Form/input-props";
import FundDeleteConfirmation from "./components/Fund/FundDeleteConfirmation";

const App = () => {
  const { open, close } = useModal();
  const [{ amount, portfolio }, dispatch] = useLocalStorageReducer(
    reducer,
    { amount: undefined, portfolio: { funds: [], total: 0 }, increment: null },
    "state",
  );

  const handleOpenCreateFundModal = () =>
    open(<FundCreateOrUpdateForm onSubmit={handleCreateFund} />, { title: "Add a new fund" });

  const handleCreateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundCreated", payload: { fund } });
    close();
  };

  const handleOpenUpdateFundModal = (fund: Fund) =>
    open(<FundCreateOrUpdateForm fund={fund} onSubmit={handleUpdateFund} />, { title: "Update your fund" });

  const handleUpdateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundUpdated", payload: { fund } });
    close();
  };

  const handleOpenDeleteFundModal = (id: string) =>
    open(<FundDeleteConfirmation onConfirm={() => handleDeleteFund(id)} onCancel={close} />, {
      title: "Are you sure you want to remove this fund?",
    });

  const handleDeleteFund = (id: string) => {
    dispatch({ type: "fundDeleted", payload: { id } });
    close();
  };

  const handleOpenUpdateFundPricesModal = () =>
    open(<FundPricesUpdateForm funds={portfolio.funds} onSubmit={handleUpdatePrices} />, {
      title: "Update fund prices",
    });

  const handleUpdatePrices = (prices: FundPrices) => {
    dispatch({ type: "fundPricesUpdated", payload: { prices } });
    close();
  };

  const handleBalancePortfolio = ({ amount }: BalanceAmount) =>
    dispatch({ type: "portfolioBalanced", payload: { amount } });

  return (
    <AppContainer>
      <PortfolioHeader>
        <div>
          <IconButton onClick={handleOpenCreateFundModal}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={handleOpenUpdateFundPricesModal}>
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
            onUpdateClick={handleOpenUpdateFundModal}
            onDeleteClick={handleOpenDeleteFundModal}
          />
        ))}
      </FundList>
      <BalanceForm<BalanceAmount> defaultValues={{ amount }} onSubmit={handleBalancePortfolio}>
        {({ register }) => (
          <>
            <PrimaryButton type="submit">Balance</PrimaryButton>
            <InputCurrency aria-label="amount" {...inputs.amount(register)} />
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