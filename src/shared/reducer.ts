import { v4 as uuid } from "uuid";
import { Fund, FundCreateOrUpdate, FundPrices, Portfolio } from "./portfolio";
import { balance, updateTotal, updateWeights } from "./portfolio-balancer";
import { pipe } from "./util";

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

type State = { portfolio: Portfolio; amount?: number };
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
      return { ...state, amount, portfolio: balance(state.portfolio, amount) };
    case "fundCreated":
      return {
        ...state,
        portfolio: updatePortfolio({
          ...state.portfolio,
          funds: [...state.portfolio.funds, createFund(action.payload.fund)],
        }),
      };
    case "fundUpdated":
      const { fund: updatedFund } = action.payload;
      const id = updatedFund.id;
      return {
        ...state,
        portfolio: updatePortfolio({
          ...state.portfolio,
          funds: state.portfolio.funds.map((fund) => (fund.id === id ? updateFund(id, updatedFund) : fund)),
        }),
      };
    case "fundPricesUpdated":
      const prices = action.payload.prices;
      return {
        ...state,
        portfolio: updatePortfolio({
          ...state.portfolio,
          funds: state.portfolio.funds.map((fund) => (prices[fund.id] ? updateFundPrice(fund, prices[fund.id]) : fund)),
        }),
      };
    case "fundDeleted":
      return {
        ...state,
        portfolio: updatePortfolio({
          ...state.portfolio,
          funds: state.portfolio.funds.filter((fund) => fund.id !== action.payload.id),
        }),
      };
  }
};