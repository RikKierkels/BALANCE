import React, { useCallback } from "react";
import styled from "styled-components";
import InputCurrency from "../Form/InputCurrency";
import PortfolioBalanceForm, { BalanceAmount } from "./PortfolioBalanceForm";
import { ReactComponent as AddIcon } from "../../assets/plus.svg";
import { ReactComponent as DeleteIcon } from "../../assets/times.svg";
import { ReactComponent as UpdateIcon } from "../../assets/redo.svg";
import { ReactComponent as BalanceIcon } from "../../assets/play.svg";
import { useModal } from "../Modal/ModalProvider";
import PrimaryButton from "../Buttons/PrimaryButton";
import FundCreateOrUpdateForm from "../Fund/FundCreateOrUpdateForm";
import { Fund } from "../../shared/portfolio";
import FundPricesUpdateForm from "../Fund/FundPricesUpdateForm";
import { inputs } from "../Form/input-props";
import FundDeleteConfirmation from "../Fund/FundDeleteConfirmation";
import LinkButton from "../Buttons/LinkButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import ActionRow from "../Row/ActionRow";
import StaticRow from "../Row/StaticRow";
import PortfolioTotal from "./PortfolioTotal";
import FundRow from "../Fund/FundRow";
import { AppAction, useAppState } from "../../AppStateProvider";
import useShortcut from "../../hooks/use-shortcut";
import Shortcut from "../Common/Shortcut";

const click = (button: HTMLButtonElement) => button.click();

const Portfolio = () => {
  const { open, close, isOpen: isModalOpen } = useModal();
  const [{ selectedFundIds, amount, portfolio, increment }, dispatch] = useAppState();
  const shortcuts = {
    addFund: { shortcut: "N", ref: useShortcut<HTMLButtonElement>("n", click) },
    deleteFunds: { shortcut: "D", ref: useShortcut<HTMLButtonElement>("d", click) },
    updatePrices: { shortcut: "P", ref: useShortcut<HTMLButtonElement>("p", click) },
    balance: { shortcut: "B", ref: useShortcut<HTMLButtonElement>("b", click) },
  };

  const dispatchAndClose = useCallback(
    (action: AppAction) => {
      dispatch(action);
      close();
    },
    [dispatch, close],
  );

  const handleOpenCreateFundModal = useCallback(
    () =>
      open(
        <FundCreateOrUpdateForm
          onCancel={close}
          onSubmit={(fund) => dispatchAndClose({ type: "fundCreated", payload: { fund } })}
        />,
        {
          title: "Add fund",
        },
      ),
    [open, close, dispatchAndClose],
  );

  const handleOpenUpdateFundModal = useCallback(
    (fund: Fund) =>
      open(
        <FundCreateOrUpdateForm
          fund={fund}
          onCancel={close}
          onSubmit={(updatedFund) => dispatchAndClose({ type: "fundUpdated", payload: { fund: updatedFund } })}
        />,
        {
          title: "Update fund",
        },
      ),
    [open, close, dispatchAndClose],
  );

  const handleOpenDeleteFundModal = useCallback(
    () =>
      open(
        <FundDeleteConfirmation
          onCancel={close}
          onConfirm={() => dispatchAndClose({ type: "fundsDeleted", payload: { ids: selectedFundIds } })}
        />,
        {
          title: `Delete ${selectedFundIds.length} fund(s)`,
        },
      ),
    [open, close, dispatchAndClose, selectedFundIds],
  );

  const handleOpenUpdateFundPricesModal = useCallback(
    () =>
      open(
        <FundPricesUpdateForm
          funds={portfolio.funds}
          onCancel={close}
          onSubmit={(prices) => dispatchAndClose({ type: "fundPricesUpdated", payload: { prices } })}
        />,
        {
          title: "Update prices",
        },
      ),
    [open, close, portfolio.funds, dispatchAndClose],
  );

  const isFundSelected = useCallback((id: string) => selectedFundIds.includes(id), [selectedFundIds]);
  const hasSelectedAllFunds = portfolio.funds.map(({ id }) => id).every(isFundSelected);
  const hasSelectedAnyFund = !!selectedFundIds.length;

  const handleSelectedFundChange = useCallback(
    ({ id }: Fund) => dispatch({ type: isFundSelected(id) ? "fundDeselected" : "fundSelected", payload: { id } }),
    [dispatch, isFundSelected],
  );

  const handleSelectedAllFundsChange = useCallback(
    () => dispatch({ type: hasSelectedAllFunds ? "allFundsDeselected" : "allFundsSelected" }),
    [dispatch, hasSelectedAllFunds],
  );

  const handleDeselectAllFunds = useCallback(() => dispatch({ type: "allFundsDeselected" }), [dispatch]);

  const handleBalancePortfolio = useCallback(
    ({ amount }: BalanceAmount) => dispatch({ type: "portfolioBalanced", payload: { amount } }),
    [dispatch],
  );

  return (
    <Main>
      {hasSelectedAnyFund ? (
        <Actions>
          <LinkButton onClick={handleDeselectAllFunds}>Deselect</LinkButton>
          <PrimaryButton
            ref={shortcuts.deleteFunds.ref}
            disabled={isModalOpen}
            left={<DeleteIcon />}
            right={<Shortcut>{shortcuts.deleteFunds.shortcut}</Shortcut>}
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
            ref={shortcuts.addFund.ref}
            disabled={isModalOpen}
            left={<AddIcon />}
            right={<Shortcut>{shortcuts.addFund.shortcut}</Shortcut>}
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
      <PortfolioBalanceForm<BalanceAmount> defaultValues={{ amount }} onSubmit={handleBalancePortfolio}>
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
      </PortfolioBalanceForm>
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

export default Portfolio;