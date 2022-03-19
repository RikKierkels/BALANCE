import React from "react";
import styled from "styled-components";
import { useCurrencyFormatter } from "../../hooks/use-formatter";

type Props = React.ComponentPropsWithoutRef<"input">;

const InputCurrency = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { symbol } = useCurrencyFormatter();

  return (
    <InputContainer>
      <Currency>{symbol}</Currency>
      <Input ref={ref} {...props} />
    </InputContainer>
  );
});

const InputContainer = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.font.lg};

  * {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: inherit;
  }
`;

const Currency = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: ${({ theme }) => theme.radius.input};
  border-bottom-left-radius: ${({ theme }) => theme.radius.input};
  background-color: ${({ theme }) => theme.colors.input.background};
`;

const Input = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  // TODO: Add Themeing.
  border-left: 1px solid ${({ theme }) => theme.colors.fund.border};
  border-top-right-radius: ${({ theme }) => theme.radius.input};
  border-bottom-right-radius: ${({ theme }) => theme.radius.input};
  background-color: ${({ theme }) => theme.colors.input.background};
`;

export default InputCurrency;