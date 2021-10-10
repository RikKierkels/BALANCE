import styled from "styled-components";
import { Fund } from "../../shared/portfolio";
import FundTotal from "../FundTotal/FundTotal";
import FundWeight from "../FundWeight/FundWeight";
import FundQuantityPrice from "../FundQuantityPrice/FundQuantityPrice";

const Row = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
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
  <Row>
    <FundId>{id}</FundId>
    <FundQuantityPrice quantity={quantity} price={price} />
    <FundTotal total={total} />
    <FundWeight weight={weight} />
  </Row>
);

export default FundListItem;