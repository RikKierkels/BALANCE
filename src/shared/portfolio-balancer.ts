import { trampoline, ThunkOrValue } from "trampoline-ts";
import { reducedCompare, diff, isEmpty, pipe } from "./util";
import { Fund, Portfolio } from "./portfolio";

const weightGap = ({ weight }: Fund) => diff(weight.target, weight.actual);
const weightGapComparer = (a: Fund, b: Fund) => weightGap(a) < weightGap(b);
const fundWithLargestWeightGap = reducedCompare(weightGapComparer);

const isAffordable =
  (amount: number) =>
  ({ price }: Fund) =>
    price <= amount;

const updateTotal = ({ funds }: Portfolio): Portfolio => ({
  funds,
  total: funds.reduce((sum, { total }) => sum + total, 0),
});

const updateWeight = (total: number) => (fund: Fund) => ({
  ...fund,
  weight: { ...fund.weight, actual: fund.total / total },
});

const updateWeights = ({ funds, total }: Portfolio): Portfolio => ({
  funds: funds.map(updateWeight(total)),
  total,
});

const increaseQuantity =
  (by: number) =>
  (fund: Fund): Fund => ({
    ...fund,
    quantity: fund.quantity + by,
    total: fund.total + by * fund.price,
  });
const increaseQuantityByOne = increaseQuantity(1);

const increaseQuantityOf =
  ({ name }: Fund) =>
  ({ funds, total }: Portfolio): Portfolio => ({
    funds: funds.map((fund) => (fund.name === name ? increaseQuantityByOne(fund) : fund)),
    total,
  });

const balance = trampoline((portfolio: Portfolio, amount: number): ThunkOrValue<Portfolio> => {
  const affordableFunds = portfolio.funds.filter(isAffordable(amount));
  if (isEmpty(affordableFunds)) return portfolio;

  const fundToBuy = fundWithLargestWeightGap(affordableFunds);
  const balancePortfolio = pipe(increaseQuantityOf(fundToBuy), updateTotal, updateWeights);

  return balance.cont(balancePortfolio(portfolio), amount - fundToBuy.price);
});

export { balance, updateWeights, updateTotal };