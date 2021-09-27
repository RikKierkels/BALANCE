export type Portfolio = {
    funds: Fund[];
    total: number;
};

type Fund = {
    name: string;
    quantity: number;
    price: number;
    weight: FundWeight;
};

type FundWeight = {
    actual: number;
    target: number;
};

const indexOfMinimum = (xs: number[]) => xs.reduce((min, current, i, xs) => (current < xs[min] ? i : min), 0);
const difference = (a: number,b: number) => a - b;
const differenceBetweenWeights = ({weight}: Fund) => difference(weight.actual, weight.target);
const byDifferenceInWeights = (a: Fund, b: Fund) => differenceBetweenWeights(a) - differenceBetweenWeights(b);

const balance = (portfolio: Portfolio, amount: number): Portfolio => {
    let prices = portfolio.funds.map(({price}) => price);
    let targets = portfolio.funds.map(({weight}) => weight.target);
    let stocks = portfolio.funds.map(({quantity}) => quantity);

    let funds = portfolio.funds;
    let total = portfolio.total;

    while(true) {
        const fundsToBalance = funds.sort(byDifferenceInWeights).filter(fund => fund.price <= amount);
        if (fundsToBalance.length == 0) break;
        const fundToBalance = fundsToBalance[0];

        total += fundToBalance.price;
        amount -= fundToBalance.price;
        const index = funds.indexOf(fundToBalance);
        funds[index] = ({...fundToBalance, quantity: fundToBalance.quantity + 1});
        funds = funds.map(fund => ({...fund, weight: {...fund.weight, actual: (fund.quantity * fund.price) / total}}))
    }

    return {funds, total};
};

export {
    balance
}