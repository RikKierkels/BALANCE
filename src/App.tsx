import React from "react";
import styled from "styled-components";
import FundListItem from "./components/Fund/FundListItem";
import FundList from "./components/Fund/FundList";
import PortfolioHeader from "./components/Portfolio/PortfolioHeader";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";
import InputCurrency from "./components/Form/InputCurrency";
import BalanceForm, { BalanceAmount } from "./components/Balance/BalanceForm";
import useLocalStorageReducer from "./hooks/use-local-storage-reducer";
import { reducer } from "./reducer";
import { ReactComponent as AddIcon } from "../src/assets/plus.svg";
import { ReactComponent as DeleteIcon } from "../src/assets/times.svg";
import { useModal } from "./components/Modal/ModalProvider";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import FundCreateOrUpdateForm from "./components/Fund/FundCreateOrUpdateForm";
import { Fund, FundCreateOrUpdate, FundPrices } from "./shared/portfolio";
import FundPricesUpdateForm from "./components/Fund/FundPricesUpdateForm";
import { checkboxes, inputs } from "./components/Form/input-props";
import FundDeleteConfirmation from "./components/Fund/FundDeleteConfirmation";
import LinkButton from "./components/Buttons/LinkButton";
import Checkbox from "./components/Form/Checkbox";

const App = () => {
  const { open, close } = useModal();
  const [{ selectedFundIds, amount, portfolio }, dispatch] = useLocalStorageReducer(
    reducer,
    { selectedFundIds: [], amount: undefined, portfolio: { funds: [], total: 0 }, increment: null },
    "state",
  );

  const isFundSelected = (id: string) => selectedFundIds.includes(id);
  const hasSelectedAllFunds = portfolio.funds.map(({ id }) => id).every(isFundSelected);
  const hasSelectedAnyFund = !!selectedFundIds.length;

  const handleOpenCreateFundModal = () =>
    open(<FundCreateOrUpdateForm onCancel={close} onSubmit={handleCreateFund} />, { title: "Add fund" });

  const handleCreateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundCreated", payload: { fund } });
    close();
  };

  const handleOpenUpdateFundModal = (fund: Fund) =>
    open(<FundCreateOrUpdateForm fund={fund} onCancel={close} onSubmit={handleUpdateFund} />, {
      title: "Update fund",
    });

  const handleUpdateFund = (fund: FundCreateOrUpdate) => {
    dispatch({ type: "fundUpdated", payload: { fund } });
    close();
  };

  const handleOpenDeleteFundModal = () =>
    open(<FundDeleteConfirmation onConfirm={handleDeleteFunds} onCancel={close} />, {
      title: `Delete ${selectedFundIds.length} fund${selectedFundIds.length > 1 ? "s" : ""}?`,
    });

  const handleDeleteFunds = () => {
    dispatch({ type: "fundsDeleted", payload: { ids: selectedFundIds } });
    close();
  };

  const handleOpenUpdateFundPricesModal = () =>
    open(<FundPricesUpdateForm funds={portfolio.funds} onSubmit={handleUpdatePrices} />, {
      title: "Update prices",
    });

  const handleUpdatePrices = (prices: FundPrices) => {
    dispatch({ type: "fundPricesUpdated", payload: { prices } });
    close();
  };

  const handleBalancePortfolio = ({ amount }: BalanceAmount) =>
    dispatch({ type: "portfolioBalanced", payload: { amount } });

  const handleSelectedFundChange = ({ id }: Fund) =>
    dispatch({ type: isFundSelected(id) ? "fundDeselected" : "fundSelected", payload: { id } });

  const handleSelectedAllFundsChange = () =>
    dispatch({ type: hasSelectedAllFunds ? "allFundsDeselected" : "allFundsSelected" });

  const handleDeselectAllFunds = () => {
    dispatch({ type: "allFundsDeselected" });
  };

  return (
    <AppContainer>
      <PortfolioHeader>
        <Checkbox {...checkboxes.fund(hasSelectedAllFunds)} onChange={handleSelectedAllFundsChange} />
        <PortfolioTotal total={portfolio.total} />
        <Actions>
          {hasSelectedAnyFund ? (
            <>
              <LinkButton onClick={handleDeselectAllFunds}>Deselect</LinkButton>
              <PrimaryButton left={<DeleteIcon />} onClick={handleOpenDeleteFundModal}>
                Delete
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton left={<AddIcon />} onClick={handleOpenCreateFundModal}>
              Add fund
            </PrimaryButton>
          )}
        </Actions>
      </PortfolioHeader>
      <FundList>
        {portfolio.funds.map((fund) => (
          <FundListItem
            key={fund.id}
            fund={fund}
            isSelected={isFundSelected(fund.id)}
            onSelectedChange={handleSelectedFundChange}
            onUpdateClick={handleOpenUpdateFundModal}
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

const Actions = styled.div`
  margin-left: auto;

  > * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

export default App;