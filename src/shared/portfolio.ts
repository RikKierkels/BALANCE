export type Portfolio = {
  funds: Fund[];
  total: number;
};

export type Fund = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  weight: FundWeight;
};

export type FundWeight = {
  actual: number;
  target: number;
};

export type FundCreateOrUpdate = Pick<Fund, "id" | "name" | "quantity" | "price"> & {
  weight: Fund["weight"]["target"];
};

export type FundPrices = Record<string, number>;