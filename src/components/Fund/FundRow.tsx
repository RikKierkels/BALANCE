import styled from "styled-components";
import ActionRow, { Props as ActionRowProps } from "../Row/ActionRow";
import { Fund, FundIncrement as FundIncrementType } from "../../shared/portfolio";
import React from "react";
import { useCurrencyFormatter, useNumberFormatter, usePercentageFormatter } from "../../hooks/use-formatter";
import Increment from "./Increment";

type Props = {
  fund: Fund;
  increment?: FundIncrementType;
} & ActionRowProps;

const FundRow = ({
  fund: {
    name,
    quantity,
    price,
    total,
    weight: { actual, target },
  },
  increment,
  ...props
}: Props) => {
  const number = useNumberFormatter();
  const currency = useCurrencyFormatter();
  const percentage = usePercentageFormatter();

  return (
    <Row forwardedAs="li" {...props}>
      <span>{name}</span>
      <span>
        {quantity} x {currency.format(price)}
        <Increment value={increment?.quantity} formatter={number.formatWithSign} />
      </span>
      <span>
        {currency.format(total)}
        <Increment value={increment?.total} formatter={currency.formatWithSign} />
      </span>
      <span>
        {percentage.format(actual)} / {percentage.format(target)}
        <Increment value={increment?.weight} formatter={percentage.formatWithSign} />
      </span>
    </Row>
  );
};

export default FundRow;

const Row = styled(ActionRow)`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.fund.positive : theme.colors.fund.background};

  &:hover {
    background-color: ${({ theme }) => theme.colors.fund.positive};
  }
`;