import { FC } from "react";
import { Fund } from "../../shared/portfolio";

type Props = {
  fund: Fund;
};

const FundListItem: FC<Props> = ({ fund }) => {
  return <li></li>;
};

export default FundListItem;