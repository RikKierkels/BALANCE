import { renderHook } from "@testing-library/react-hooks";
import { useCurrencyFormatter, useNumberFormatter, usePercentageFormatter } from "./use-formatter";

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

test.each([
  [15.138, "€ +15,14"],
  [-15, `€ -15,00`],
])("formats a currency with a sign", (currency, expectedCurrency) => {
  const {
    result: { current },
  } = renderHook(() => useCurrencyFormatter());

  const actualCurrency = current.formatWithSign(currency);

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
])("formats a percentage", (percentage, expectedPercentage) => {
  const {
    result: { current },
  } = renderHook(() => usePercentageFormatter());

  const actualPercentage = current.format(percentage);

  expect(actualPercentage).toEqual(expectedPercentage);
});

test.each([
  [0.89156, "+89,16%"],
  [-0.5, "-50,00%"],
])("formats a percentage with a sign", (percentage, expectedPercentage) => {
  const {
    result: { current },
  } = renderHook(() => usePercentageFormatter());

  const actualPercentage = current.formatWithSign(percentage);

  expect(actualPercentage).toEqual(expectedPercentage);
});

test.each([
  [3, "3"],
  [3.8, "3,8"],
  [3.25, "3,25"],
  [3.251, "3,25"],
])("formats a number", (number, expectedNumber) => {
  const {
    result: { current },
  } = renderHook(() => useNumberFormatter());

  const actualNumber = current.format(number);

  expect(actualNumber).toEqual(expectedNumber);
});

test.each([
  [3, "+3"],
  [-3.8, "-3,8"],
])("formats a number with a sign", (number, expectedNumber) => {
  const {
    result: { current },
  } = renderHook(() => useNumberFormatter());

  const actualNumber = current.formatWithSign(number);

  expect(actualNumber).toEqual(expectedNumber);
});