import { FC } from "react";
import { Fund } from "../../shared/portfolio";
import { CURRENCY_FORMATTER, NUMBER_FORMATTER, PERCENTAGE_FORMATTER } from "../../shared/formatter";

const percentage = (factor: number) => factor * 100;

type Props = {
  fund: Fund;
};

const FundListItem: FC<Props> = ({ fund }) => (
  <li>
    <div>{fund.id}</div>
    <div>{fund.quantity}</div>
    <div>{CURRENCY_FORMATTER.format(fund.price)}</div>
    <div>{PERCENTAGE_FORMATTER.format(fund.weight.actual)}</div>
    <div>{PERCENTAGE_FORMATTER.format(fund.weight.target)}</div>
  </li>
);

export default FundListItem;