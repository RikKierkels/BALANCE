import styled from "styled-components";
import { Fund } from "../../shared/portfolio";
import FundTotal from "../FundTotal/FundTotal";
import FundWeight from "../FundWeight/FundWeight";
import FundQuantityPrice from "../FundQuantityPrice/FundQuantityPrice";

const Row = styled.li`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 80px 80px;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.fundRow.background};
`;

type Props = {
  fund: Fund;
};

const FundListItem = ({ fund: { id, quantity, price, total, weight } }: Props) => (
  <Row>
    <span>{id}</span>
    <FundQuantityPrice quantity={quantity} price={price} />
    <FundTotal total={total} />
    <FundWeight weight={weight} />
    <div>E</div>
    <div>D</div>
  </Row>
);

export default FundListItem;