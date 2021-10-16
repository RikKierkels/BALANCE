import { useCurrencyFormatter } from "../../hooks/use-formatter";

type Props = {
  total: number;
};

const PortfolioTotal = ({ total }: Props) => {
  const { format } = useCurrencyFormatter();

  return <span data-testid="portfolio-total">{format(total)}</span>;
};

export default PortfolioTotal;