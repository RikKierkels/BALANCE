import React from "react";
import styled from "styled-components";
import { Fund } from "../../shared/portfolio";
import FundTotal from "./FundTotal";
import FundWeight from "./FundWeight";
import FundQuantityPrice from "./FundQuantityPrice";
import Checkbox from "../Form/Checkbox";
import { checkboxes } from "../Form/input-props";

type Props = {
  fund: Fund;
  isSelected: boolean;
  onSelectedChange: (fund: Fund) => void;
  onUpdateClick: (fund: Fund) => void;
};

const FundListItem = ({ fund, isSelected, onSelectedChange, onUpdateClick }: Props) => (
  <FundContainer isSelected={isSelected}>
    <Checkbox {...checkboxes.fund(isSelected, fund.name)} onChange={() => onSelectedChange(fund)} />
    <FundClickArea aria-label="Update" onClick={() => onUpdateClick(fund)}>
      <FundName>{fund.name}</FundName>
      <FundQuantityPrice quantity={fund.quantity} price={fund.price} />
      <FundTotal total={fund.total} />
      <FundWeight weight={fund.weight} />
    </FundClickArea>
  </FundContainer>
);

const FundContainer = styled.li<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.fund.positive : theme.colors.fund.background};

  > * {
    align-self: stretch;
    background-color: inherit;
  }

  > *:first-child {
    padding: ${({ theme }) => theme.spacing.xlg};
  }

  > *:last-child {
    padding-right: ${({ theme }) => theme.spacing.xlg};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.fund.positive};
  }
`;

const FundClickArea = styled.button`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
  text-align: start;
  font-size: ${({ theme }) => theme.font.sm};

  &:focus {
    outline: 0;
  }
`;

const FundName = styled.span`
  font-size: ${({ theme }) => theme.font.md};
  font-weight: 500;
`;

export default FundListItem;