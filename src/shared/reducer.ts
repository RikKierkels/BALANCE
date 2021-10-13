import { Portfolio } from "./portfolio";
import { balance, updateTotal, updateWeights } from "./portfolio-balancer";
import { PartialFund } from "../components/Fund/FundForm";
import { pipe } from "./util";

const updatePortfolio = pipe(updateTotal, updateWeights);
const normaliseWeight = (weight: number) => (weight > 1 ? weight / 100 : weight);

type State = { portfolio: Portfolio; amount: number | null };
type Action =
  | { type: "amountChanged"; payload: { amount: number | null } }
  | { type: "balanced" }
  | { type: "fundAdded"; payload: { fund: PartialFund } };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "amountChanged":
      return { ...state, amount: action.payload.amount };
    case "balanced":
      return state.amount ? { ...state, portfolio: balance(state.portfolio, state.amount) } : state;
    case "fundAdded":
      const { id, quantity, price, weight } = action.payload.fund;
      return {
        ...state,
        portfolio: updatePortfolio({
          ...state.portfolio,
          funds: [
            ...state.portfolio.funds,
            { id, quantity, price, total: quantity * price, weight: { target: normaliseWeight(weight), actual: 0 } },
          ],
        }),
      };
  }
};