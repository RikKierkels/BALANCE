import React from "react";
import styled from "styled-components";

type Props = { value?: number; formatter?: (n: number) => string };

const FundIncrement = ({ value, formatter = (n) => `${n}` }: Props) => {
  if (!value) return null;

  const isNegative = value < 0;

  return (
    <Increment isNegative={isNegative}>
      {isNegative ? "" : "+"}
      {formatter(value)}
    </Increment>
  );
};

export default FundIncrement;

const Increment = styled.div<{ isNegative: boolean }>`
  color: ${({ isNegative, theme }) => (isNegative ? theme.colors.fund.negative : theme.colors.fund.positive)};
`;