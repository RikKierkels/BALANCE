import React from "react";
import styled from "styled-components";

type Props = { value?: number; formatter?: (n: number) => string };

const Increment = ({ value, formatter = (n) => `${n}` }: Props) =>
  value ? <StyledIncrement isNegative={value < 0}>{formatter(value)}</StyledIncrement> : null;

export default Increment;

const StyledIncrement = styled.div<{ isNegative: boolean }>`
  color: ${({ isNegative, theme }) => (isNegative ? theme.colors.fund.negative : theme.colors.fund.positive)};
`;