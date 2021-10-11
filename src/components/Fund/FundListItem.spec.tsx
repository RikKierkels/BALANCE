import { render, screen } from "../../shared/utils-test";
import { Fund } from "../../shared/portfolio";
import FundListItem from "./FundListItem";

const makeFund = (): Fund => ({
  id: "HSBC MSCI World",
  quantity: 10,
  price: 10,
  total: 100,
  weight: { actual: 0.25, target: 0.5 },
});

test("renders the funds identifier", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("HSBC MSCI World");
  expect(name).toBeInTheDocument();
});

test("renders the funds quantity and price", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const quantityTimesPrice = screen.getByText("10 x € 10,00");
  expect(quantityTimesPrice).toBeInTheDocument();
});

test("renders the funds total price", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const total = screen.getByText(`€ 100,00`);
  expect(total).toBeInTheDocument();
});

test("renders the funds weights", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const weights = screen.getByText("25,00% / 50,00%");
  expect(weights).toBeInTheDocument();
});