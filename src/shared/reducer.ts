import { v4 as uuid } from "uuid";
import { Fund, FundCreateOrUpdate, Portfolio } from "./portfolio";
import { balance, updateTotal, updateWeights } from "./portfolio-balancer";
import { pipe } from "./util";

const createOrUpdateFund = (id: string, { name, quantity, price, weight }: FundCreateOrUpdate): Fund => ({
  id,
  name: name,
  quantity,
  price,
  total: quantity * price,
  weight: { target: weight, actual: 0 },
});
const createFund = (fund: FundCreateOrUpdate) => createOrUpdateFund(uuid(), fund);
const updateFund = createOrUpdateFund;
const updatePortfolio = pipe(updateTotal, updateWeights);

type State = { portfolio: Portfolio; amount: number | null };
type Action =
  | { type: "amountUpdated"; payload: { amount: number | null } }
  | { type: "portfolioBalanced" }
  | { type: "fundCreated"; payload: { fund: FundCreateOrUpdate } }
  | { type: "fundUpdated"; payload: { id: string; fund: FundCreateOrUpdate } };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "amountUpdated":
      return { ...state, amount: action.payload.amount };
    case "portfolioBalanced":
      return state.amount ? { ...state, portfolio: balance(state.portfolio, state.amount) } : state;
    case "fundCreated":
      return {
        ...state,
        portfolio: updatePortfolio({
          ...state.portfolio,
          funds: [...state.portfolio.funds, createFund(action.payload.fund)],
        }),
      };
    case "fundUpdated":
      const { fund: updatedFund, id } = action.payload;
      return {
        ...state,
        portfolio: updatePortfolio({
          ...state.portfolio,
          funds: state.portfolio.funds.map((fund) => (fund.id === id ? updateFund(id, updatedFund) : fund)),
        }),
      };
  }
};