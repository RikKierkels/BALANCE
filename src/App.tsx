import React from "react";
import styled from "styled-components";
import FundRows from "./components/Fund/FundRows";
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
import { inputs } from "./components/Form/input-props";
import FundDeleteConfirmation from "./components/Fund/FundDeleteConfirmation";
import LinkButton from "./components/Buttons/LinkButton";
import SecondaryButton from "./components/Buttons/SecondaryButton";
import SelectableRow from "./components/Fund/SelectableRow";
import NonSelectableRow from "./components/Fund/NonSelectableRow";
import FundQuantityPrice from "./components/Fund/FundQuantityPrice";
import FundTotal from "./components/Fund/FundTotal";
import FundWeight from "./components/Fund/FundWeight";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";

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
    open(<FundDeleteConfirmation onCancel={close} onConfirm={handleDeleteFunds} />, {
      title: `Delete ${selectedFundIds.length} fund${selectedFundIds.length > 1 ? "s" : ""}?`,
    });

  const handleDeleteFunds = () => {
    dispatch({ type: "fundsDeleted", payload: { ids: selectedFundIds } });
    close();
  };

  const handleOpenUpdateFundPricesModal = () =>
    open(<FundPricesUpdateForm funds={portfolio.funds} onCancel={close} onSubmit={handleUpdatePrices} />, {
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
    <Main>
      <Actions>
        {hasSelectedAnyFund ? (
          <>
            <LinkButton onClick={handleDeselectAllFunds}>Deselect</LinkButton>
            <PrimaryButton left={<DeleteIcon />} onClick={handleOpenDeleteFundModal}>
              Delete
            </PrimaryButton>
          </>
        ) : (
          <>
            <SecondaryButton onClick={handleOpenUpdateFundPricesModal}>Update prices</SecondaryButton>
            <PrimaryButton left={<AddIcon />} onClick={handleOpenCreateFundModal}>
              Add fund
            </PrimaryButton>
          </>
        )}
      </Actions>
      <FundHeaderRow
        labels={{ checkbox: "all funds" }}
        isSelected={hasSelectedAllFunds}
        onSelectedChange={handleSelectedAllFundsChange}
      >
        <FundName>Name</FundName>
        <span>Quantity x Price</span>
        <span>Total</span>
        <span>Actual / Target weight</span>
      </FundHeaderRow>
      <FundRows>
        {portfolio.funds.map((fund) => (
          <FundRow
            forwardedAs="li"
            key={fund.id}
            labels={{ checkbox: fund.name, button: "Update" }}
            isSelected={isFundSelected(fund.id)}
            onSelectedChange={() => handleSelectedFundChange(fund)}
            onClick={() => handleOpenUpdateFundModal(fund)}
          >
            <FundName>{fund.name}</FundName>
            <FundQuantityPrice quantity={fund.quantity} price={fund.price} />
            <FundTotal total={fund.total} />
            <FundWeight weight={fund.weight} />
          </FundRow>
        ))}
      </FundRows>
      <FundTotalRow>
        <PortfolioTotal total={portfolio.total} />
      </FundTotalRow>
      <BalanceForm<BalanceAmount> defaultValues={{ amount }} onSubmit={handleBalancePortfolio}>
        {({ register }) => (
          <>
            <PrimaryButton type="submit">Balance</PrimaryButton>
            <InputCurrency aria-label="amount" {...inputs.amount(register)} />
          </>
        )}
      </BalanceForm>
    </Main>
  );
};

const FundHeaderRow = styled(SelectableRow)`
  background-color: ${({ theme }) => theme.colors.header.background};
`;

const FundRow = styled(SelectableRow)`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.fund.positive : theme.colors.fund.background};

  &:hover {
    background-color: ${({ theme }) => theme.colors.fund.positive};
  }
`;

const FundTotalRow = styled(NonSelectableRow)`
  background-color: ${({ theme }) => theme.colors.header.background};
  min-height: 3rem;

  span {
    grid-column: 3;
  }
`;

const FundName = styled.span`
  font-size: ${({ theme }) => theme.font.md};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  > * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const Main = styled.main`
  ${FundHeaderRow} {
    margin-top: ${({ theme }) => theme.spacing.md};
  }

  ${FundTotalRow} {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export default App;