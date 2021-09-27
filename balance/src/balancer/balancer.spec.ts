import {balance, BalancedETF, ETF} from './balancer';

test("given a collection of ETF's and an amount to spend, balances the ETF's",  () => {
    const etfs: ETF[] = [
        {name: 'World', quantity: 10, price: 10, targetPercentage: 50},
        {name: 'EM', quantity: 5, price: 20, targetPercentage: 25},
        {name: 'S&P500', quantity: 5, price: 40, targetPercentage: 25},
    ];
    const expectedBalancedEtfs: BalancedETF[] = [
        {name: 'World', quantity: 30, percentage: 50},
        {name: 'EM', quantity: 5, percentage: 16.66},
        {name: 'S&P500', quantity: 5, percentage: 33.33},
    ];

    const actualBalancedEtfs = balance(etfs, 200);

    expect(actualBalancedEtfs).toEqual(expectedBalancedEtfs);
});