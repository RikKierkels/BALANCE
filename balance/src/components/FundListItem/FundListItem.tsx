import { FC } from "react";
import { Fund } from "../../shared/portfolio";

const percentage = (factor: number) => factor * 100;
const currency = (amount: number) =>
  amount.toLocaleString("nl-NL", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

type Props = {
  fund: Fund;
};

const FundListItem: FC<Props> = ({ fund }) => (
  <li>
    <div>{fund.id}</div>
    <div>{fund.quantity}</div>
    <div>€{currency(fund.price)}</div>
    <div>{percentage(fund.weight.actual)}%</div>
    <div>{percentage(fund.weight.target)}%</div>
  </li>
);

export default FundListItem;