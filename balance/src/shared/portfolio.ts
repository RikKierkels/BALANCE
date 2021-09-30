export type Portfolio = {
  funds: Fund[];
  total: number;
};

export type Fund = {
  id: string;
  quantity: number;
  price: number;
  weight: FundWeight;
};

type FundWeight = {
  actual: number;
  target: number;
};