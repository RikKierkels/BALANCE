import { Portfolio } from "./portfolio";
import { balance } from "./portfolio-balancer";

type State = { portfolio: Portfolio; amount: number | null };
type Action = { type: "amountChanged"; payload: { amount: number | null } } | { type: "balanced" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "amountChanged":
      return { ...state, amount: action.payload.amount };
    case "balanced":
      return state.amount ? { ...state, portfolio: balance(state.portfolio, state.amount) } : state;
  }
};