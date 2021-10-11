import { Fund, Portfolio } from "./portfolio";
import { compareToKeepOne, diff, isEmpty, pipe, repeat } from "./util";

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

const updateWeights = ({ funds, total }: Portfolio): Portfolio => ({
  funds: funds.map(updateWeight(total)),
  total,
});

const increaseQuantity =
  (by: number) =>
  (fund: Fund): Fund => ({ ...fund, quantity: fund.quantity + by, total: fund.total + by * fund.price });
const increaseQuantityByOne = increaseQuantity(1);

const increaseQuantityOf =
  ({ id, price }: Fund) =>
  ({ funds, total }: Portfolio): Portfolio => ({
    funds: funds.map((fund) => (fund.id === id ? increaseQuantityByOne(fund) : fund)),
    total: total + price,
  });

const _balance =
  (amount: number) =>
  (portfolio: Portfolio): Portfolio => {
    const affordableFunds = portfolio.funds.filter(isAffordable(amount));
    if (isEmpty(affordableFunds)) return portfolio;

    const fundToBuy = fundWithLargestWeightGap(affordableFunds);
    const balancePortfolio = pipe(increaseQuantityOf(fundToBuy), updateWeights);

    return _balance(amount - fundToBuy.price)(balancePortfolio(portfolio));
  };

const balance = (portfolio: Portfolio, amount: number, times: number = 1) => repeat(times)(_balance(amount))(portfolio);

export { balance };