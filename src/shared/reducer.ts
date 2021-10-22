import { v4 as uuid } from "uuid";
import { pipe, zip } from "./util";
import { Fund, FundCreateOrUpdate, FundIncrement, FundPrices, Portfolio, PortfolioIncrement } from "./portfolio";
import { balance, updateTotal, updateWeights } from "./portfolio-balancer";

const toPortfolioIncrement = (before: Portfolio, after: Portfolio): PortfolioIncrement => ({
  total: after.total - before.total,
  funds: zip(before.funds, after.funds).map(toFundIncrement),
});

const toFundIncrement = ([before, after]: [Fund, Fund]): FundIncrement => ({
  id: after.id,
  quantity: after.quantity - before.quantity,
  total: after.total - before.total,
  weight: after.weight.actual - before.weight.actual,
});

const updatePortfolio = pipe(updateTotal, updateWeights);
const createOrUpdateFund = (id: string, { name, quantity, price, weight }: FundCreateOrUpdate): Fund => ({
  id,
  name,
  quantity,
  price,
  total: quantity * price,
  weight: { target: weight, actual: 0 },
});
const createFund = (fund: FundCreateOrUpdate) => createOrUpdateFund(uuid(), fund);
const updateFund = createOrUpdateFund;
const updateFundPrice = (fund: Fund, price: number) => ({
  ...fund,
  price,
  total: fund.quantity * price,
});

type State = { amount?: number; portfolio: Portfolio; increment: PortfolioIncrement | null };
type Action =
  | { type: "portfolioBalanced"; payload: { amount: number } }
  | { type: "fundCreated"; payload: { fund: FundCreateOrUpdate } }
  | { type: "fundUpdated"; payload: { fund: FundCreateOrUpdate } }
  | { type: "fundPricesUpdated"; payload: { prices: FundPrices } }
  | { type: "fundDeleted"; payload: { id: string } };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "portfolioBalanced":
      const { amount } = action.payload;
      const portfolio = balance(state.portfolio, amount);
      return { amount, portfolio, increment: toPortfolioIncrement(state.portfolio, portfolio) };
    case "fundCreated":
      return {
        amount: state.amount,
        portfolio: updatePortfolio({
          total: state.portfolio.total,
          funds: [...state.portfolio.funds, createFund(action.payload.fund)],
        }),
        increment: null,
      };
    case "fundUpdated":
      const { fund: updatedFund } = action.payload;
      const id = updatedFund.id;
      return {
        amount: state.amount,
        portfolio: updatePortfolio({
          total: state.portfolio.total,
          funds: state.portfolio.funds.map((fund) => (fund.id === id ? updateFund(id, updatedFund) : fund)),
        }),
        increment: null,
      };
    case "fundPricesUpdated":
      const prices = action.payload.prices;
      return {
        amount: state.amount,
        portfolio: updatePortfolio({
          total: state.portfolio.total,
          funds: state.portfolio.funds.map((fund) => (prices[fund.id] ? updateFundPrice(fund, prices[fund.id]) : fund)),
        }),
        increment: null,
      };
    case "fundDeleted":
      return {
        amount: state.amount,
        portfolio: updatePortfolio({
          total: state.portfolio.total,
          funds: state.portfolio.funds.filter((fund) => fund.id !== action.payload.id),
        }),
        increment: null,
      };
  }
};