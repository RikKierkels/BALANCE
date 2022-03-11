import React from "react";
import styled from "styled-components";
import { ReactComponent as UpdateIcon } from "../../assets/pencil.svg";
import { Fund } from "../../shared/portfolio";
import { row } from "../../design/mixins";
import IconButton from "../Buttons/IconButton";
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
  <FundRow>
    <Checkbox {...checkboxes.fund(isSelected, fund.name)} onChange={() => onSelectedChange(fund)} />
    <FundName>{fund.name}</FundName>
    <FundQuantityPrice quantity={fund.quantity} price={fund.price} />
    <FundTotal total={fund.total} />
    <FundWeight weight={fund.weight} />
    <IconButton onClick={() => onUpdateClick(fund)}>
      <UpdateIcon />
    </IconButton>
  </FundRow>
);

const FundRow = styled.li`
  ${row("0.25fr 1.5fr 1fr 1fr 1fr 0.25fr")};
  background-color: ${({ theme }) => theme.colors.fund.background};
  font-size: ${({ theme }) => theme.font.sm};
`;

const FundName = styled.span`
  font-size: ${({ theme }) => theme.font.md};
  font-weight: 500;
`;

export default FundListItem;