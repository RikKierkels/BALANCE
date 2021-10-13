import styled from "styled-components";
import { Fund } from "../../shared/portfolio";
import { row } from "../../design/shared";
import FundTotal from "./FundTotal";
import FundWeight from "./FundWeight";
import FundQuantityPrice from "./FundQuantityPrice";

type Props = {
  fund: Fund;
};

const FundListItem = ({ fund: { id, quantity, price, total, weight } }: Props) => (
  <FundRow>
    <FundId>{id}</FundId>
    <FundQuantityPrice quantity={quantity} price={price} />
    <FundTotal total={total} />
    <FundWeight weight={weight} />
  </FundRow>
);

const FundRow = styled.li`
  ${row};
  background-color: ${({ theme }) => theme.colors.fund.background};
  font-size: ${({ theme }) => theme.font.sm};
`;

const FundId = styled.span`
  font-size: ${({ theme }) => theme.font.md};
  font-weight: 500;
`;

export default FundListItem;