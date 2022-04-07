type FormatterOptions = Intl.NumberFormatOptions & { locale?: string };
type UseCurrencyFormatterOptions = Omit<FormatterOptions, "style">;
type UsePercentageFormatterOptions = Omit<FormatterOptions, "style" | "currency">;
type UseNumberFormatterOptions = UsePercentageFormatterOptions;
type UseFormatterOptions = UseCurrencyFormatterOptions | UsePercentageFormatterOptions | UseNumberFormatterOptions;

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
const toCurrencySymbol = (parts: Intl.NumberFormatPart[]) => parts.find((part) => part.type === "currency")?.value;

const useFormatter = (options: UseFormatterOptions) => {
  const formatter = createNumberFormatter(options);
  const formatterWithSign = createNumberFormatter(withSignAlways(options));

  return {
    format: formatter.format,
    formatWithSign: formatterWithSign.format,
    // This context for formatToParts breaks if not returned as a wrapping function.
    formatToParts: (n: number) => formatter.formatToParts(n),
    formatToPartsWithSign: (n: number) => formatterWithSign.formatToParts(n),
  };
};

export const useNumberFormatter = (options?: UseNumberFormatterOptions) => useFormatter(withNumber(options));
export const usePercentageFormatter = (options?: UsePercentageFormatterOptions) =>
  useFormatter(withPercentage(options));
export const useCurrencyFormatter = (options?: UseCurrencyFormatterOptions) => {
  const formatter = useFormatter(withCurrency(options));
  return { ...formatter, symbol: toCurrencySymbol(formatter.formatToParts(0)) };
};