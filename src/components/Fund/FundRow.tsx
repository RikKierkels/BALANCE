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
        {percentage.format(actual)} / {percentage.format(target)}
        <Increment value={increment?.weight} formatter={percentage.formatToPartsWithSign} />
      </span>
      <span>
        {quantity}
        <Increment value={increment?.quantity} formatter={number.formatToPartsWithSign} />
      </span>
      <span>{currency.format(price)}</span>
      <span>
        {currency.format(total)}
        <Increment value={increment?.total} formatter={currency.formatToPartsWithSign} />
      </span>
    </Row>
  );
};

export default FundRow;

const Row = styled(ActionRow)`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.fund.selected : theme.colors.fund.background};

  &:hover {
    background-color: ${({ theme }) => theme.colors.fund.selected};
  }
`;