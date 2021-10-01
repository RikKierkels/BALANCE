import { NUMBER_FORMATTER, CURRENCY_FORMATTER, PERCENTAGE_FORMATTER } from "./formatter";

test.each([
  [10.123, "10,12"],
  [10, "10,00"],
])("formats the number %i to %s", (number, expectedNumber) => {
  const actualNumber = NUMBER_FORMATTER.format(number);

  expect(actualNumber).toEqual(expectedNumber);
});

test.each([
  [15.138, "€ 15,14"],
  [15, `€ 15,00`],
])("formats a currency", (currency, expectedCurrency) => {
  const actualCurrency = CURRENCY_FORMATTER.format(currency);

  expect(actualCurrency).toEqual(expectedCurrency);
});

test.each([
  [0.89156, "89,16%"],
  [0.5, "50,00%"],
])("formats a percentage", (pecentage, expectedPercentage) => {
  const actualPercentage = PERCENTAGE_FORMATTER.format(pecentage);

  expect(actualPercentage).toEqual(expectedPercentage);
});