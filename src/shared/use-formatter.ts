interface NumberFormatPart {
  type: string;
  value: string;
}
type FormatterOptions = {
  locale?: string;
  style?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};
type CurrencyFormatterOptions = Omit<FormatterOptions, "style">;
type PercentageFormatterOptions = Omit<FormatterOptions, "style" | "currency">;

const DEFAULT_LOCALE = "nl-NL";
const DEFAULT_CURRENCY = "EUR";
const DEFAULT_OPTIONS: FormatterOptions = {
  locale: DEFAULT_LOCALE,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const withCurrency = ({ currency, ...options }: FormatterOptions = DEFAULT_OPTIONS): FormatterOptions => ({
  ...options,
  style: "currency",
  currency: currency || DEFAULT_CURRENCY,
});

const withPercentage = (options: FormatterOptions = DEFAULT_OPTIONS): FormatterOptions => ({
  ...options,
  style: "percent",
});

const makeNumberFormatter = ({ locale, ...options }: FormatterOptions) => new Intl.NumberFormat(locale, options);
const toCurrencySymbol = (parts: NumberFormatPart[]) => parts.find((part) => part.type === "currency")?.value;

// Only exposing .format as .formatToParts breaks when compiled with Babel.
// Issue similar to: https://github.com/formatjs/date-time-format-timezone/issues/17
export const useCurrencyFormatter = (options?: CurrencyFormatterOptions) => {
  const formatter = makeNumberFormatter(withCurrency(options));

  return {
    format: formatter.format,
    symbol: toCurrencySymbol(formatter.formatToParts(0)),
  };
};

export const usePercentageFormatter = (options?: PercentageFormatterOptions) => ({
  format: makeNumberFormatter(withPercentage(options)).format,
});