import {Fund, Portfolio} from "./portfolio";

const repeat = (times: number) => <T>(func: (arg: T) => T) => (arg: T): T => times === 0 ?
    arg :
    repeat(--times)(func)(func(arg));
const difference = (a: number, b: number) => a - b;
const differenceInWeights = ({weight}: Fund) => difference(weight.actual, weight.target);
const byDifferenceInWeights = (a: Fund, b: Fund) => differenceInWeights(a) - differenceInWeights(b);

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
    repeat(times)(_balance(amount))(portfolio);

export {
    balance
}