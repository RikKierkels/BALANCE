import { useCurrencyFormatter, usePercentageFormatter } from "./use-formatter";
import { renderHook } from "@testing-library/react-hooks";

test.each([
  [15.138, "€ 15,14"],
  [15, `€ 15,00`],
])("formats a currency", (currency, expectedCurrency) => {
  const {
    result: { current },
  } = renderHook(() => useCurrencyFormatter());

  const actualCurrency = current.format(currency);

  expect(actualCurrency).toEqual(expectedCurrency);
});

test("has the currency symbol", () => {
  const {
    result: { current },
  } = renderHook(() => useCurrencyFormatter());

  const symbol = current.symbol;

  expect(symbol).toEqual("€");
});

test.each([
  [0.89156, "89,16%"],
  [0.5, "50,00%"],
])("formats a percentage", (pecentage, expectedPercentage) => {
  const {
    result: { current },
  } = renderHook(() => usePercentageFormatter());

  const actualPercentage = current.format(pecentage);

  expect(actualPercentage).toEqual(expectedPercentage);
});