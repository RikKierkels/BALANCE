import { render, screen } from "@testing-library/react";
import { Fund } from "../../shared/portfolio";
import FundListItem from "./FundListItem";

const makeFund = (): Fund => ({ id: "World", quantity: 10, price: 10, weight: { actual: 0.25, target: 0.5 } });

test("renders the funds identifier", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("World");
  expect(name).toBeInTheDocument();
});

test("renders the funds quantity", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("10");
  expect(name).toBeInTheDocument();
});

test("renders the funds price", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText(`€ 10,00`);
  expect(name).toBeInTheDocument();
});

test("renders the funds actual weight as a percentage", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("25,00%");
  expect(name).toBeInTheDocument();
});

test("renders the funds target weight as a percentage", () => {
  const fund = makeFund();

  render(<FundListItem fund={fund} />);

  const name = screen.getByText("50,00%");
  expect(name).toBeInTheDocument();
});