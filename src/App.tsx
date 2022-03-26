import React, { MutableRefObject, useRef } from "react";
import styled from "styled-components";
import InputCurrency from "./components/Form/InputCurrency";
import BalanceForm, { BalanceAmount } from "./components/Balance/BalanceForm";
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
import FundRow from "./components/Fund/FundRow";
import { useAppState } from "./AppStateProvider";
import useShortcut from "./hooks/use-shortcut";
import Shortcut from "./components/Common/Shortcut";

// Defer the click so the pressed shortcut key isn't filled in the focussed input of a modal.
const handleShortcutPress = (button: HTMLButtonElement) => setTimeout(() => button.click(), 0);

const App = () => {
  const { open, close, isOpen: isModalOpen } = useModal();
  const [{ selectedFundIds, amount, portfolio, increment }, dispatch] = useAppState();
  const shortcuts = {
    delete: { shortcut: "D", ref: useShortcut<HTMLButtonElement>("d", handleShortcutPress) },
    updatePrices: { shortcut: "P", ref: useShortcut<HTMLButtonElement>("p", handleShortcutPress) },
    add: { shortcut: "N", ref: useShortcut<HTMLButtonElement>("n", handleShortcutPress) },
    balance: { shortcut: "B", ref: useShortcut<HTMLButtonElement>("b", handleShortcutPress) },
  };

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
      {hasSelectedAnyFund ? (
        <Actions>
          <LinkButton onClick={handleDeselectAllFunds}>Deselect</LinkButton>
          <PrimaryButton
            ref={shortcuts.delete.ref}
            disabled={isModalOpen}
            left={<DeleteIcon />}
            right={<Shortcut>{shortcuts.delete.shortcut}</Shortcut>}
            onClick={handleOpenDeleteFundModal}
          >
            Delete
          </PrimaryButton>
        </Actions>
      ) : (
        <Actions>
          <SecondaryButton
            ref={shortcuts.updatePrices.ref}
            disabled={isModalOpen}
            left={<UpdateIcon />}
            right={<Shortcut isLight>{shortcuts.updatePrices.shortcut}</Shortcut>}
            onClick={handleOpenUpdateFundPricesModal}
          >
            Update prices
          </SecondaryButton>
          <PrimaryButton
            ref={shortcuts.add.ref}
            disabled={isModalOpen}
            left={<AddIcon />}
            right={<Shortcut>{shortcuts.add.shortcut}</Shortcut>}
            onClick={handleOpenCreateFundModal}
          >
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
        <span>Actual / Target</span>
        <span>Amount</span>
        <span>Price</span>
        <span>Total</span>
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
            <BalanceButton
              ref={shortcuts.balance.ref}
              disabled={isModalOpen}
              left={<BalanceIcon />}
              right={<Shortcut>{shortcuts.balance.shortcut}</Shortcut>}
            >
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
  grid-column: 5;
  text-align: end;
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