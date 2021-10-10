import styled, { css } from "styled-components";
import { Fund } from "../../shared/portfolio";
import { row } from "../../design/shared";
import FundTotal from "../FundTotal/FundTotal";
import FundWeight from "../FundWeight/FundWeight";
import FundQuantityPrice from "../FundQuantityPrice/FundQuantityPrice";

const FundRow = styled.li`
  ${row};
  background-color: ${({ theme }) => theme.colors.fundRow.background};
  font-size: ${({ theme }) => theme.font.sizes.sm};
`;

const FundId = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.md};
  font-weight: 500;
`;

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

export default FundListItem;