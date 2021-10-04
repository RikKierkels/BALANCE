import { FC } from "react";
import { Fund } from "../../shared/portfolio";
import { useCurrencyFormatter, usePercentageFormatter } from "../../shared/useFormatter";

type Props = {
  fund: Fund;
};

const FundListItem: FC<Props> = ({ fund }) => {
  const currencyFormatter = useCurrencyFormatter();
  const percentageFormatter = usePercentageFormatter();

  return (
    <li>
      <div>{fund.id}</div>
      <div>{fund.quantity}</div>
      <div>{currencyFormatter.format(fund.price)}</div>
      <div>{percentageFormatter.format(fund.weight.actual)}</div>
      <div>{percentageFormatter.format(fund.weight.target)}</div>
    </li>
  );
};

export default FundListItem;