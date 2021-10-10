import React, { FC, FunctionComponent } from "react";
import { useCurrencyFormatter } from "../../shared/use-formatter";

type Props = {
  total: number;
};

const FundTotal: FC<Props> = ({ total }) => {
  const currencyFormatter = useCurrencyFormatter();
  return <span>{currencyFormatter.format(total)}</span>;
};

export default FundTotal;