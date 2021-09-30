import { render, screen } from "@testing-library/react";
import { Fund } from "../../shared/portfolio";
import FundListItem from "./FundListItem";

const makeFund = (): Fund => ({ id: "World", quantity: 10, price: 10, weight: { actual: 0.25, target: 0.5 } });

test("has the funds identifier", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText(fund.id);
  expect(name).toBeInTheDocument();
});

test("has the quantity ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText(fund.quantity);
  expect(name).toBeInTheDocument();
});

test("has the price ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText(fund.price);
  expect(name).toBeInTheDocument();
});

test("has the actual weight ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText(fund.weight.actual);
  expect(name).toBeInTheDocument();
});

test("has the target weight ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText(fund.weight.target);
  expect(name).toBeInTheDocument();
});