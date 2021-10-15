import React from "react";
import { FundWeight as FundWeightType } from "../../shared/portfolio";
import { usePercentageFormatter } from "../../hooks/use-formatter";

type Props = {
  weight: FundWeightType;
};

const FundWeight = ({ weight: { actual, target } }: Props) => {
  const { format } = usePercentageFormatter();

  return (
    <span>
      {format(actual)} / {format(target)}
    </span>
  );
};

export default FundWeight;