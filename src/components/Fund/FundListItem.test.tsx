import { render, screen } from "../../shared/utils-test";
import { Fund } from "../../shared/portfolio";
import FundListItem from "./FundListItem";

const makeFund = (): Fund => ({
  name: "HSBC MSCI World",
  quantity: 10,
  price: 10,
  total: 100,
  weight: { actual: 0.25, target: 0.5 },
});

test("renders the funds identifier", () => {
  render(<FundListItem fund={makeFund()} />);

  expect(screen.getByText("HSBC MSCI World")).toBeInTheDocument();
});

test("renders the funds quantity and price", () => {
  render(<FundListItem fund={makeFund()} />);

  expect(screen.getByText("10 x € 10,00")).toBeInTheDocument();
});

test("renders the funds total price", () => {
  render(<FundListItem fund={makeFund()} />);

  expect(screen.getByText(`€ 100,00`)).toBeInTheDocument();
});

test("renders the funds weights", () => {
  render(<FundListItem fund={makeFund()} />);

  expect(screen.getByText("25,00% / 50,00%")).toBeInTheDocument();
});