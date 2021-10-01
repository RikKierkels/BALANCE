import { render, screen } from "@testing-library/react";
import { Fund } from "../../shared/portfolio";
import FundListItem from "./FundListItem";

const makeFund = (): Fund => ({ id: "World", quantity: 10, price: 10, weight: { actual: 0.25, target: 0.5 } });

test("has the funds identifier", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("World");
  expect(name).toBeInTheDocument();
});

test("has the quantity ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("10");
  expect(name).toBeInTheDocument();
});

test("has the price ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText(`€ 10,00`);
  expect(name).toBeInTheDocument();
});

test("has the actual weight ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("25,00%");
  expect(name).toBeInTheDocument();
});

test("has the target weight ", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("50,00%");
  expect(name).toBeInTheDocument();
});