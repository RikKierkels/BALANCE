import { Fund, Portfolio } from "./portfolio";
import { diff, compareKeepOne, repeat, mapIf } from "../common";

const weightGap = ({ weight }: Fund) => diff(weight.target, weight.actual);
const weightGapComparer = (a: Fund, b: Fund) => weightGap(a) < weightGap(b);
const fundWithLargestWeightGap = compareKeepOne(weightGapComparer);
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
    const fundToIncrease = fundWithLargestWeightGap(affordableFunds);
    if (!fundToIncrease) return { funds, total };

    const portfolio: Portfolio = {
      funds: funds.map((fund) => (fund === fundToIncrease ? increaseQuantityByOne(fund) : fund)),
      total: total + fundToIncrease.price,
    };

    return _balance(amount - fundToIncrease.price)(updateWeights(portfolio));
  };

const balance = (portfolio: Portfolio, amount: number, times: number) => repeat(times)(_balance(amount))(portfolio);

export { balance };