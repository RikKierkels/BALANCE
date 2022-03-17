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
  signDisplay?: "always";
};
type CurrencyFormatterOptions = Omit<FormatterOptions, "style">;
type PercentageFormatterOptions = Omit<FormatterOptions, "style" | "currency">;
type NumberFormatterOptions = PercentageFormatterOptions;

const DEFAULT_LOCALE = "nl-NL";
const DEFAULT_CURRENCY = "EUR";
const DEFAULT_OPTIONS: FormatterOptions = {
  locale: DEFAULT_LOCALE,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const withCurrency = ({ currency, ...options }: FormatterOptions = {}): FormatterOptions => ({
  ...DEFAULT_OPTIONS,
  ...options,
  style: "currency",
  currency: currency || DEFAULT_CURRENCY,
});

const withPercentage = (options: FormatterOptions = {}): FormatterOptions => ({
  ...DEFAULT_OPTIONS,
  ...options,
  style: "percent",
});

const withNumber = (options: FormatterOptions = {}): FormatterOptions => ({
  ...DEFAULT_OPTIONS,
  ...options,
  minimumFractionDigits: 0,
});

const withSignAlways = (options: FormatterOptions = {}): FormatterOptions => ({ ...options, signDisplay: "always" });

const createNumberFormatter = ({ locale, ...options }: FormatterOptions) => new Intl.NumberFormat(locale, options);
const toCurrencySymbol = (parts: NumberFormatPart[]) => parts.find((part) => part.type === "currency")?.value;

export const useCurrencyFormatter = (options?: CurrencyFormatterOptions) => {
  options = withCurrency(options);
  const formatter = createNumberFormatter(options);
  const formatterWithSign = createNumberFormatter(withSignAlways(options));

  return {
    format: formatter.format,
    formatWithSign: formatterWithSign.format,
    symbol: toCurrencySymbol(formatter.formatToParts(0)),
  };
};

export const usePercentageFormatter = (options?: PercentageFormatterOptions) => {
  options = withPercentage(options);
  const formatter = createNumberFormatter(options);
  const formatterWithSign = createNumberFormatter(withSignAlways(options));

  return {
    format: formatter.format,
    formatWithSign: formatterWithSign.format,
  };
};

export const useNumberFormatter = (options?: NumberFormatterOptions) => {
  options = withNumber(options);
  const formatter = createNumberFormatter(options);
  const formatterWithSign = createNumberFormatter(withSignAlways(options));

  return {
    format: formatter.format,
    formatWithSign: formatterWithSign.format,
  };
};