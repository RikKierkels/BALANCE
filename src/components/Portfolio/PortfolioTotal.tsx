import { useCurrencyFormatter } from "../../hooks/use-formatter";

type Props = {
  total: number;
  className?: string;
};

const PortfolioTotal = ({ className, total }: Props) => {
  const { format } = useCurrencyFormatter();

  return (
    <span data-testid="portfolio-total" className={className}>
      {format(total)}
    </span>
  );
};

export default PortfolioTotal;