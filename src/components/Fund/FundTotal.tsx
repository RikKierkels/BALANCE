import React from "react";
import { useCurrencyFormatter } from "../../hooks/use-formatter";

type Props = {
  total: number;
};

const FundTotal = ({ total }: Props) => {
  const { format } = useCurrencyFormatter();

  return <span>{format(total)}</span>;
};

export default FundTotal;