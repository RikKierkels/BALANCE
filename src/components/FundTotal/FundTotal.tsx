import React, { FC } from "react";
import { useCurrencyFormatter } from "../../shared/use-formatter";

type Props = {
  total: number;
};

const FundTotal = ({ total }: Props) => {
  const currencyFormatter = useCurrencyFormatter();
  return <span>{currencyFormatter.format(total)}</span>;
};

export default FundTotal;