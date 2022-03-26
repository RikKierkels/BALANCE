import React from "react";
import { v4 as uuid } from "uuid";
import { Fund, FundCreateOrUpdate, FundIncrement, FundPrices, Portfolio, PortfolioIncrement } from "./shared/portfolio";
import { pipe, zip } from "./shared/util";
import { balance, updateTotal, updateWeights } from "./shared/portfolio-balancer";
import useLocalStorageReducer from "./hooks/use-local-storage-reducer";

const toPortfolioIncrement = (before: Portfolio, after: Portfolio): PortfolioIncrement => ({
  total: after.total - before.total,
  funds: zip(before.funds, after.funds).reduce(
    (funds, [before, after]) => ({ ...funds, [before.id]: toFundIncrement(before, after) }),
    {},
  ),
});

const toFundIncrement = (before: Fund, after: Fund): FundIncrement => ({
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

type State = { selectedFundIds: string[]; amount?: number; portfolio: Portfolio; increment: PortfolioIncrement | null };
type Action =
  | { type: "portfolioBalanced"; payload: { amount: number } }
  | { type: "fundCreated"; payload: { fund: FundCreateOrUpdate } }
  | { type: "fundUpdated"; payload: { fund: FundCreateOrUpdate } }
  | { type: "fundPricesUpdated"; payload: { prices: FundPrices } }
  | { type: "fundsDeleted"; payload: { ids: string[] } }
  | { type: "fundSelected"; payload: { id: string } }
  | { type: "fundDeselected"; payload: { id: string } }
  | { type: "allFundsSelected" }
  | { type: "allFundsDeselected" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "portfolioBalanced":
      const { amount } = action.payload;
      const portfolio = balance(state.portfolio, amount);
      return {
        ...state,
        amount,
        portfolio,
        increment: toPortfolioIncrement(state.portfolio, portfolio),
      };
    case "fundCreated":
      return {
        ...state,
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
        ...state,
        portfolio: updatePortfolio({
          total: state.portfolio.total,
          funds: state.portfolio.funds.map((fund) => (fund.id === id ? updateFund(id, updatedFund) : fund)),
        }),
        increment: null,
      };
    case "fundPricesUpdated":
      const prices = action.payload.prices;
      return {
        ...state,
        portfolio: updatePortfolio({
          total: state.portfolio.total,
          funds: state.portfolio.funds.map((fund) => (prices[fund.id] ? updateFundPrice(fund, prices[fund.id]) : fund)),
        }),
        increment: null,
      };
    case "fundsDeleted":
      return {
        ...state,
        portfolio: updatePortfolio({
          total: state.portfolio.total,
          funds: state.portfolio.funds.filter(({ id }) => !action.payload.ids.includes(id)),
        }),
        increment: null,
        selectedFundIds: [],
      };
    case "fundSelected":
      return { ...state, selectedFundIds: [...state.selectedFundIds, action.payload.id] };
    case "fundDeselected":
      return { ...state, selectedFundIds: state.selectedFundIds.filter((fund) => fund !== action.payload.id) };
    case "allFundsSelected":
      return { ...state, selectedFundIds: state.portfolio.funds.map(({ id }) => id) };
    case "allFundsDeselected":
      return { ...state, selectedFundIds: [] };
  }
};

type AppStateContext = [State, React.Dispatch<Action>];

const Context = React.createContext<AppStateContext | undefined>(undefined);

export const useAppState = () => {
  const context = React.useContext(Context);
  if (!context) throw new Error("useAppState must be used within a AppStateProvider.");

  return context;
};

type Props = React.PropsWithChildren<{ initialState: State; storageKey?: string }>;

const AppStateProvider = ({ children, initialState, storageKey = "state" }: Props) => {
  const [state, dispatch] = useLocalStorageReducer(reducer, initialState, storageKey);
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export default AppStateProvider;