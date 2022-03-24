import React from "react";
import styled from "styled-components";

const hasAllZeroParts = (parts: Intl.NumberFormatPart[]) =>
  parts
    .filter((part) => part.type === "integer" || part.type === "fraction")
    .every((part) => [...part.value].every((value) => value === "0"));

const toNonZeroStringFromParts = (parts: Intl.NumberFormatPart[]) =>
  !parts.length || hasAllZeroParts(parts) ? "" : parts.reduce((string, part) => string + part.value, "");

type Props = { value?: number; formatter: (n: number) => Intl.NumberFormatPart[] };

const Increment = ({ value, formatter }: Props) => {
  const increment = value && toNonZeroStringFromParts(formatter(value));
  return increment ? <StyledIncrement isNegative={value < 0}>{increment}</StyledIncrement> : null;
};

export default Increment;

const StyledIncrement = styled.div<{ isNegative: boolean }>`
  color: ${({ isNegative, theme }) => (isNegative ? theme.colors.increment.negative : theme.colors.increment.positive)};
`;