import { FC } from "react";
import { Fund } from "../../shared/portfolio";
import { useCurrencyFormatter, usePercentageFormatter } from "../../shared/use-formatter";
import styled from "styled-components";

const Row = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 80px 80px;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.fundRow.background};
`;

type Props = {
  fund: Fund;
};

const FundListItem: FC<Props> = ({ fund }) => {
  const currencyFormatter = useCurrencyFormatter();
  const percentageFormatter = usePercentageFormatter();

  return (
    <Row>
      <span>{fund.id}</span>
      <span>
        {fund.quantity} x {currencyFormatter.format(fund.price)}
      </span>
      <span>{currencyFormatter.format(fund.quantity * fund.price)}</span>
      <span>
        {percentageFormatter.format(fund.weight.actual)} / {percentageFormatter.format(fund.weight.target)}
      </span>
      <div>E</div>
      <div>D</div>
    </Row>
  );
};

export default FundListItem;