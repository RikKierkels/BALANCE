import {balance, Fund, FundWeight, Portfolio} from './balancer';

test("given a portfolio and an amount to spend, balances the portfolio",  () => {
    const portfolioToBalance: Portfolio = {
        funds: [
            {name: 'World', quantity: 10, price: 10, weight: {actual: 0.25, target: 0.5}},
            {name: 'EM', quantity: 5, price: 20, weight: {actual: 0.25, target: 0.25}},
            {name: 'S&P500', quantity: 5, price: 40, weight: {actual: 0.5, target: 0.25}}
        ],
        total: 400
    };
    const expectedBalancedPortfolio: Portfolio = {
        funds: [
            {name: 'World', quantity: 30, price: 10, weight: {actual: 0.5, target: 0.5}},
            {name: 'EM', quantity: 5, price: 20, weight: {actual: 0.166, target: 0.25}},
            {name: 'S&P500', quantity: 5, price: 40, weight: {actual: 0.333, target: 0.25}}
        ],
        total: 600
    };

    const actualBalancedPortfolio = balance(portfolioToBalance, 200);

    expect(actualBalancedPortfolio).toEqual(expectedBalancedPortfolio);
});