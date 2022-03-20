import React from "react";
import styled from "styled-components";
import InputCurrency from "./components/Form/InputCurrency";
import BalanceForm, { BalanceAmount } from "./components/Balance/BalanceForm";
import useLocalStorageReducer from "./hooks/use-local-storage-reducer";
import { reducer } from "./reducer";
import { ReactComponent as AddIcon } from "../src/assets/plus.svg";
import { ReactComponent as DeleteIcon } from "../src/assets/times.svg";
import { ReactComponent as UpdateIcon } from "./assets/redo.svg";
import { ReactComponent as BalanceIcon } from "./assets/play.svg";
import { useModal } from "./components/Modal/ModalProvider";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import FundCreateOrUpdateForm from "./components/Fund/FundCreateOrUpdateForm";
import { Fund, FundCreateOrUpdate, FundPrices } from "./shared/portfolio";
import FundPricesUpdateForm from "./components/Fund/FundPricesUpdateForm";
import { inputs } from "./components/Form/input-props";
import FundDeleteConfirmation from "./components/Fund/FundDeleteConfirmation";
import LinkButton from "./components/Buttons/LinkButton";
import SecondaryButton from "./components/Buttons/SecondaryButton";
import ActionRow from "./components/Row/ActionRow";
import StaticRow from "./components/Row/StaticRow";
import PortfolioTotal from "./components/Portfolio/PortfolioTotal";
import FundCreateOnboarding from "./components/Fund/FundCreateOnboarding";
import FundRow from "./components/Fund/FundRow";

const App = () => {
  const { open, close } = useModal();
  const [{ selectedFundIds, amount, portfolio, increment }, dispatch] = useLocalStorageReducer(
    reducer,
    { selectedFundIds: [], amount: undefined, portfolio: { funds: [], total: 0 }, increment: null },
    "state",
  );

  const isFundSelected = (id: string) => selectedFundIds.includes(id);
  const hasSelectedAllFunds = portfolio.funds.map(({ id }) => id).every(isFundSelected);
  const hasSelectedAnyFund = !!selectedFundIds.length;
  const hasAnyFund = !!portfolio.funds.length;

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

  if (!hasAnyFund) return <FundCreateOnboarding onCreateFundClick={handleOpenCreateFundModal} />;

  return (
    <Main>
      {hasSelectedAnyFund ? (
        <Actions>
          <LinkButton onClick={handleDeselectAllFunds}>Deselect</LinkButton>
          <PrimaryButton left={<DeleteIcon />} onClick={handleOpenDeleteFundModal}>
            Delete
          </PrimaryButton>
        </Actions>
      ) : (
        <Actions>
          <SecondaryButton left={<UpdateIcon />} onClick={handleOpenUpdateFundPricesModal}>
            Update prices
          </SecondaryButton>
          <PrimaryButton left={<AddIcon />} onClick={handleOpenCreateFundModal}>
            Add fund
          </PrimaryButton>
        </Actions>
      )}
      <HeaderRow
        labels={{ checkbox: "all funds" }}
        isSelected={hasSelectedAllFunds}
        onSelectedChange={handleSelectedAllFundsChange}
      >
        <span>Name</span>
        <span>Quantity x Price</span>
        <span>Total</span>
        <span>Actual / Target</span>
      </HeaderRow>
      <FundRows>
        {portfolio.funds.map((fund) => (
          <FundRow
            key={fund.id}
            fund={fund}
            increment={increment?.funds?.[fund.id]}
            labels={{ checkbox: fund.name, button: "Update" }}
            isSelected={isFundSelected(fund.id)}
            onSelectedChange={() => handleSelectedFundChange(fund)}
            onClick={() => handleOpenUpdateFundModal(fund)}
          />
        ))}
      </FundRows>
      <TotalRow>
        <Total total={portfolio.total} increment={increment?.total} />
      </TotalRow>
      <BalanceForm<BalanceAmount> defaultValues={{ amount }} onSubmit={handleBalancePortfolio}>
        {({ register }) => (
          <>
            <InputCurrency aria-label="amount" {...inputs.amount(register)} />
            <BalanceButton right={<BalanceIcon />} type="submit">
              Balance
            </BalanceButton>
          </>
        )}
      </BalanceForm>
    </Main>
  );
};

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  > * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const HeaderRow = styled(ActionRow)`
  border-top-left-radius: ${({ theme }) => theme.radius.row};
  border-top-right-radius: ${({ theme }) => theme.radius.row};
  background-color: ${({ theme }) => theme.colors.header.background};
`;

const FundRows = styled.ul`
  > * {
    border-bottom: 1px solid ${({ theme }) => theme.colors.fund.border};
  }
`;

const TotalRow = styled(StaticRow)`
  min-height: 4rem;
  border-bottom-left-radius: ${({ theme }) => theme.radius.row};
  border-bottom-right-radius: ${({ theme }) => theme.radius.row};
  line-height: normal;
  background-color: ${({ theme }) => theme.colors.total.background};
`;

const Total = styled(PortfolioTotal)`
  grid-column: 3;
`;

const BalanceButton = styled(PrimaryButton)`
  width: auto;
  align-items: center;
  font-size: ${({ theme }) => theme.font.lg};
`;

const Main = styled.main`
  ${Actions},
  ${TotalRow} {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export default App;