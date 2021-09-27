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

function repeat<T>(times: number): (f: (arg: T) => T) => (arg: T) => T {
    return (f) => (arg) => times === 0 ?
        arg :
        repeat<T>(--times)(f)(f(arg));
};

const difference = (a: number,b: number) => a - b;
const differenceBetweenWeights = ({weight}: Fund) => difference(weight.actual, weight.target);
const byDifferenceInWeights = (a: Fund, b: Fund) => differenceBetweenWeights(a) - differenceBetweenWeights(b);

const _balance = (amount: number) => ({funds, total}: Portfolio): Portfolio => {
    const fundsToBalance = funds.sort(byDifferenceInWeights).filter(fund => fund.price <= amount);
    if (fundsToBalance.length == 0) return {funds, total};
    const fundToBalance = fundsToBalance[0];

    total += fundToBalance.price;
    const index = funds.indexOf(fundToBalance);
    funds[index] = ({...fundToBalance, quantity: fundToBalance.quantity + 1});
    funds = funds.map(fund => ({...fund, weight: {...fund.weight, actual: (fund.quantity * fund.price) / total}}))

    return _balance(amount - fundToBalance.price)({funds, total});
};

// TODO: Get rid of the explicit Portfolio type
const balance = (portfolio: Portfolio, amount: number, times: number) =>
    repeat<Portfolio>(times)(_balance(amount))(portfolio);

export {
    balance
}