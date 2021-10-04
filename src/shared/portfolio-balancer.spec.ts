import { balance } from "./portfolio-balancer";
import { Portfolio } from "./portfolio";

const makePortfolio = (): Portfolio => ({
  funds: [
    { id: "World", quantity: 10, price: 10, weight: { actual: 0.25, target: 0.5 } },
    { id: "EM", quantity: 5, price: 20, weight: { actual: 0.25, target: 0.25 } },
    { id: "S&P500", quantity: 5, price: 40, weight: { actual: 0.5, target: 0.25 } },
  ],
  total: 400,
});

const makeEmptyPortfolio = (): Portfolio => ({
  funds: [],
  total: 0,
});

test("given an empty portfolio, doesn't balance the portfolio", () => {
  const expectedPortfolio = makeEmptyPortfolio();

  const actualPortfolio = balance(expectedPortfolio, 200, 1);

  expect(actualPortfolio).toEqual(expectedPortfolio);
});

test("given a portfolio and an amount to spend, balances the portfolio once", () => {
  const expectedPortfolio: Portfolio = {
    funds: [
      { id: "World", quantity: 28, price: 10, weight: { actual: 0.4666666666666667, target: 0.5 } },
      { id: "EM", quantity: 6, price: 20, weight: { actual: 0.2, target: 0.25 } },
      { id: "S&P500", quantity: 5, price: 40, weight: { actual: 0.3333333333333333, target: 0.25 } },
    ],
    total: 600,
  };

  const actualPortfolio = balance(makePortfolio(), 200, 1);

  expect(actualPortfolio).toEqual(expectedPortfolio);
});

test("given a portfolio and an amount to spend, balances the portfolio multiple times", () => {
  const expectedPortfolio: Portfolio = {
    funds: [
      { id: "World", quantity: 120, price: 10, weight: { actual: 0.5, target: 0.5 } },
      { id: "EM", quantity: 30, price: 20, weight: { actual: 0.25, target: 0.25 } },
      { id: "S&P500", quantity: 15, price: 40, weight: { actual: 0.25, target: 0.25 } },
    ],
    total: 2400,
  };

  let actualPortfolio = balance(makePortfolio(), 200, 10);

  expect(actualPortfolio).toEqual(expectedPortfolio);
});