import { Fund } from "./portfolio";

export const createFund = (fund: Partial<Fund> = {}): Fund => ({
  id: "bd34eb98-fc84-4487-b847-50012ac50e02",
  name: "HSBC World",
  quantity: 10,
  price: 10,
  total: 100,
  weight: { actual: 1.0, target: 1.0 },
  ...fund,
});