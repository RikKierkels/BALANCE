export type Fund = {
    name: string;
    quantity: number;
    price: number;
    weight: FundWeight;
};

export type FundWeight = {
    actual: number;
    target: number;
};

export type Portfolio = {
    funds: Fund[];
    total: number;
};

const balance = (portfolio: Portfolio, amount: number): Portfolio => {
    return {} as Portfolio;
};

export {
    balance
}