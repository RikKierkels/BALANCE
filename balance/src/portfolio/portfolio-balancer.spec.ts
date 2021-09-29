import { balance } from "./portfolio-balancer";
import { Portfolio } from "./portfolio";

const portfolio = (): Portfolio => ({
  funds: [
    { name: "World", quantity: 10, price: 10, weight: { actual: 0.25, target: 0.5 } },
    { name: "EM", quantity: 5, price: 20, weight: { actual: 0.25, target: 0.25 } },
    { name: "S&P500", quantity: 5, price: 40, weight: { actual: 0.5, target: 0.25 } },
  ],
  total: 400,
});

test("given a portfolio and an amount to spend, balances the portfolio once", () => {
  const expectedPortfolio: Portfolio = {
    funds: [
      { name: "World", quantity: 28, price: 10, weight: { actual: 0.4666666666666667, target: 0.5 } },
      { name: "EM", quantity: 6, price: 20, weight: { actual: 0.2, target: 0.25 } },
      { name: "S&P500", quantity: 5, price: 40, weight: { actual: 0.3333333333333333, target: 0.25 } },
    ],
    total: 600,
  };

  const actualPortfolio = balance(portfolio(), 200, 1);

  expect(actualPortfolio).toEqual(expectedPortfolio);
});

test("given a portfolio and an amount to spend, balances the portfolio multiple times", () => {
  const expectedPortfolio: Portfolio = {
    funds: [
      { name: "World", quantity: 120, price: 10, weight: { actual: 0.5, target: 0.5 } },
      { name: "EM", quantity: 30, price: 20, weight: { actual: 0.25, target: 0.25 } },
      { name: "S&P500", quantity: 15, price: 40, weight: { actual: 0.25, target: 0.25 } },
    ],
    total: 2400,
  };

  let actualPortfolio = balance(portfolio(), 200, 10);

  expect(actualPortfolio).toEqual(expectedPortfolio);
});