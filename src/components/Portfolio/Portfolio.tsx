import React, { MutableRefObject, useRef } from "react";
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
import { Fund, FundCreateOrUpdate, FundPrices } from "../../shared/portfolio";
import FundPricesUpdateForm from "../Fund/FundPricesUpdateForm";
import { inputs } from "../Form/input-props";
import FundDeleteConfirmation from "../Fund/FundDeleteConfirmation";
import LinkButton from "../Buttons/LinkButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import ActionRow from "../Row/ActionRow";
import StaticRow from "../Row/StaticRow";
import PortfolioTotal from "./PortfolioTotal";
import FundRow from "../Fund/FundRow";
import { useAppState } from "../../AppStateProvider";
import useShortcut from "../../hooks/use-shortcut";
import Shortcut from "../Common/Shortcut";

const click = (button: HTMLButtonElement) => button.click();

const Portfolio = () => {
  const { open, close, isOpen: isModalOpen } = useModal();
  const [{ selectedFundIds, amount, portfolio, increment }, dispatch] = useAppState();
  const shortcuts = {
    delete: { shortcut: "D", ref: useShortcut<HTMLButtonElement>("d", click) },
    updatePrices: { shortcut: "P", ref: useShortcut<HTMLButtonElement>("p", click) },
    add: { shortcut: "N", ref: useShortcut<HTMLButtonElement>("n", click) },
    balance: { shortcut: "B", ref: useShortcut<HTMLButtonElement>("b", click) },
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