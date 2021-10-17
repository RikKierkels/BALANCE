import { balance } from "./portfolio-balancer";
import { Portfolio } from "./portfolio";

const createPortolfio = (): Portfolio => ({
  funds: [
    {
      id: "bd34eb98-fc84-4487-b847-50012ac50e02",
      name: "World",
      quantity: 10,
      price: 10,
      total: 100,
      weight: { actual: 0.25, target: 0.5 },
    },
    {
      id: "902c0974-7a6c-4f5e-8124-afcce9300fcf",
      name: "EM",
      quantity: 5,
      price: 20,
      total: 100,
      weight: { actual: 0.25, target: 0.25 },
    },
    {
      id: "4a526269-ecaa-49d3-9fd0-8025205dc67b",
      name: "S&P500",
      quantity: 5,
      price: 40,
      total: 200,
      weight: { actual: 0.5, target: 0.25 },
    },
  ],
  total: 400,
});

const createEmptyPortfolio = (): Portfolio => ({
  funds: [],
  total: 0,
});

test("given an empty portfolio, doesn't balance the portfolio", () => {
  const expectedPortfolio = createEmptyPortfolio();

  const actualPortfolio = balance(expectedPortfolio, 200);

  expect(actualPortfolio).toEqual(expectedPortfolio);
});

test("given a portfolio and an amount to spend, balances the portfolio once", () => {
  const expectedPortfolio: Portfolio = {
    funds: [
      {
        id: "bd34eb98-fc84-4487-b847-50012ac50e02",
        name: "World",
        quantity: 28,
        price: 10,
        total: 280,
        weight: { actual: 0.4666666666666667, target: 0.5 },
      },
      {
        id: "902c0974-7a6c-4f5e-8124-afcce9300fcf",
        name: "EM",
        quantity: 6,
        price: 20,
        total: 120,
        weight: { actual: 0.2, target: 0.25 },
      },
      {
        id: "4a526269-ecaa-49d3-9fd0-8025205dc67b",
        name: "S&P500",
        quantity: 5,
        price: 40,
        total: 200,
        weight: { actual: 0.3333333333333333, target: 0.25 },
      },
    ],
    total: 600,
  };

  const actualPortfolio = balance(createPortolfio(), 200);

  expect(actualPortfolio).toEqual(expectedPortfolio);
});