import { useCurrencyFormatter } from "../../hooks/use-formatter";
import Increment from "../Fund/Increment";

type Props = {
  className?: string;
  total: number;
  increment?: number;
};

const PortfolioTotal = ({ className, total, increment }: Props) => {
  const currency = useCurrencyFormatter();

  return (
    <span data-testid="portfolio-total" className={className}>
      {currency.format(total)}
      <Increment value={increment} formatter={currency.formatWithSign} />
    </span>
  );
};

export default PortfolioTotal;