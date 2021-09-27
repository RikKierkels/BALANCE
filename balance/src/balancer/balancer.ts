export type ETF = {
    name: string;
    quantity: number;
    price: number;
    targetPercentage: number;
};

export type BalancedETF = {
    name: string;
    quantity: number;
    percentage: number;
};

const balance = (etfs: ETF[], amount: number): BalancedETF[] => {
    return [];
};

export {
    balance
}