import styled from "styled-components";
import { useCurrencyFormatter, usePercentageFormatter } from "../../shared/use-formatter";
import { Fund } from "../../shared/portfolio";
import FundTotal from "../FundTotal/FundTotal";
import FundWeight from "../FundWeight/FundWeight";

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

const FundListItem = ({ fund: { id, quantity, price, total, weight } }: Props) => {
  const currencyFormatter = useCurrencyFormatter();

  return (
    <Row>
      <span>{id}</span>
      <span>
        {quantity} x {currencyFormatter.format(price)}
      </span>
      <FundTotal total={total} />
      <FundWeight weight={weight} />
      <div>E</div>
      <div>D</div>
    </Row>
  );
};

export default FundListItem;