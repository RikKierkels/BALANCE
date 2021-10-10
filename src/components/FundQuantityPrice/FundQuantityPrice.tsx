import { useCurrencyFormatter } from "../../shared/use-formatter";

type Props = {
  quantity: number;
  price: number;
};

const FundQuantityPrice = ({ quantity, price }: Props) => {
  const { format } = useCurrencyFormatter();

  return (
    <span>
      {quantity} x {format(price)}
    </span>
  );
};

export default FundQuantityPrice;