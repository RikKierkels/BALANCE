import React from "react";
import styled from "styled-components";
import { ReactComponent as UpdateIcon } from "../../assets/pencil.svg";
import { Fund } from "../../shared/portfolio";
import { row } from "../../design/shared";
import IconButton from "../Buttons/IconButton";
import FundTotal from "./FundTotal";
import FundWeight from "./FundWeight";
import FundQuantityPrice from "./FundQuantityPrice";

type Props = {
  fund: Fund;
  onUpdateClick: () => void;
};

const FundListItem = ({ fund: { name, quantity, price, total, weight }, onUpdateClick }: Props) => (
  <FundRow>
    <FundName>{name}</FundName>
    <FundQuantityPrice quantity={quantity} price={price} />
    <FundTotal total={total} />
    <FundWeight weight={weight} />
    <IconButton onClick={onUpdateClick}>
      <UpdateIcon />
    </IconButton>
  </FundRow>
);

const FundRow = styled.li`
  ${row};
  background-color: ${({ theme }) => theme.colors.fund.background};
  font-size: ${({ theme }) => theme.font.sm};
`;

const FundName = styled.span`
  font-size: ${({ theme }) => theme.font.md};
  font-weight: 500;
`;

export default FundListItem;