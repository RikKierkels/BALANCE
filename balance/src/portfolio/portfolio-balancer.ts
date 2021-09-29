import { Fund, Portfolio } from "./portfolio";
import { compareToKeepOne, diff, isEmpty, repeat } from "../common";

const weightGap = ({ weight }: Fund) => diff(weight.target, weight.actual);
const weightGapComparer = (a: Fund, b: Fund) => weightGap(a) < weightGap(b);
const fundWithLargestWeightGap = compareToKeepOne(weightGapComparer);
const isAffordable =
  (amount: number) =>
  ({ price }: Fund) =>
    price <= amount;
const updateWeight = (total: number) => (fund: Fund) => ({
  ...fund,
  weight: { ...fund.weight, actual: (fund.quantity * fund.price) / total },
});
const updateWeights = ({ funds, total }: Portfolio): Portfolio => ({ funds: funds.map(updateWeight(total)), total });
const increaseQuantity =
  (by: number) =>
  (fund: Fund): Fund => ({ ...fund, quantity: fund.quantity + by });
const increaseQuantityByOne = increaseQuantity(1);

const _balance =
  (amount: number) =>
  ({ funds, total }: Portfolio): Portfolio => {
    const affordableFunds = funds.filter(isAffordable(amount));
    if (isEmpty(affordableFunds)) return { funds, total };

    const { id, price } = fundWithLargestWeightGap(affordableFunds);
    const portfolio: Portfolio = {
      funds: funds.map((fund) => (fund.id === id ? increaseQuantityByOne(fund) : fund)),
      total: total + price,
    };

    return _balance(amount - price)(updateWeights(portfolio));
  };

const balance = (portfolio: Portfolio, amount: number, times: number) => repeat(times)(_balance(amount))(portfolio);

export { balance };