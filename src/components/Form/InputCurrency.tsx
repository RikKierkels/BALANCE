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
`;

const Currency = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.fund.background};
`;

const Input = styled.input`
  border-left: 1px solid ${({ theme }) => theme.colors.fund.border};
  flex: 1 1 auto;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: inherit;
`;

export default InputCurrency;