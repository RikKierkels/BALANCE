import styled from "styled-components";
import ActionRow, { Props as ActionRowProps } from "../Row/ActionRow";
import { Fund, FundIncrement as FundIncrementType } from "../../shared/portfolio";
import React from "react";
import { useCurrencyFormatter, usePercentageFormatter } from "../../hooks/use-formatter";
import FundIncrement from "./FundIncrement";

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
  const currency = useCurrencyFormatter();
  const percentage = usePercentageFormatter();

  return (
    <Row forwardedAs="li" {...props}>
      <span>{name}</span>
      <span>
        {quantity} x {currency.format(price)}
        <FundIncrement value={increment?.quantity} />
      </span>
      <span>
        {currency.format(total)}
        <FundIncrement value={increment?.total} formatter={currency.format} />
      </span>
      <span>
        {percentage.format(actual)} / {percentage.format(target)}
        <FundIncrement value={increment?.weight} formatter={percentage.format} />
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