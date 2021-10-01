type NumberFormatOptions = {
  style?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const DEFAULT_LOCALE = "nl-NL";
const DEFAULT_CURRENCY = "EUR";
const DEFAULT_NUMBER_FORMATTER_OPTIONS: NumberFormatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const withCurrency = (options: NumberFormatOptions): NumberFormatOptions => ({
  ...options,
  style: "currency",
  currency: DEFAULT_CURRENCY,
});

const withPercentage = (options: NumberFormatOptions): NumberFormatOptions => ({
  ...options,
  style: "percent",
});

const makeNumberFormatter = (options: NumberFormatOptions) => new Intl.NumberFormat(DEFAULT_LOCALE, options);

export const NUMBER_FORMATTER = makeNumberFormatter(DEFAULT_NUMBER_FORMATTER_OPTIONS);
export const CURRENCY_FORMATTER = makeNumberFormatter(withCurrency(DEFAULT_NUMBER_FORMATTER_OPTIONS));
export const PERCENTAGE_FORMATTER = makeNumberFormatter(withPercentage(DEFAULT_NUMBER_FORMATTER_OPTIONS));