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

export const useCurrencyFormatter = (options?: CurrencyFormatterOptions) => makeNumberFormatter(withCurrency(options));
export const usePercentageFormatter = (options?: PercentageFormatterOptions) =>
  makeNumberFormatter(withPercentage(options));