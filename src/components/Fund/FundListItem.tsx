import React from "react";
import styled from "styled-components";
import { ReactComponent as UpdateIcon } from "../../assets/pencil.svg";
import { ReactComponent as DeleteIcon } from "../../assets/times.svg";
import { Fund } from "../../shared/portfolio";
import { row } from "../../design/mixins";
import IconButton from "../Buttons/IconButton";
import FundTotal from "./FundTotal";
import FundWeight from "./FundWeight";
import FundQuantityPrice from "./FundQuantityPrice";

type Props = {
  fund: Fund;
  onUpdateClick: (fund: Fund) => void;
  onDeleteClick: (id: string) => void;
};

const FundListItem = ({ fund, onUpdateClick, onDeleteClick }: Props) => (
  <FundRow>
    <FundName>{fund.name}</FundName>
    <FundQuantityPrice quantity={fund.quantity} price={fund.price} />
    <FundTotal total={fund.total} />
    <FundWeight weight={fund.weight} />
    <IconButton onClick={() => onUpdateClick(fund)}>
      <UpdateIcon />
    </IconButton>
    <IconButton onClick={() => onDeleteClick(fund.id)}>
      <DeleteIcon />
    </IconButton>
  </FundRow>
);

const FundRow = styled.li`
  ${row("1.5fr 1fr 1fr 1fr 0.25fr 0.25fr")};
  background-color: ${({ theme }) => theme.colors.fund.background};
  font-size: ${({ theme }) => theme.font.sm};
`;

const FundName = styled.span`
  font-size: ${({ theme }) => theme.font.md};
  font-weight: 500;
`;

export default FundListItem;