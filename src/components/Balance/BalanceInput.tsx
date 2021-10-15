import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { useCurrencyFormatter } from "../../hooks/use-formatter";

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "value" | "onChange">;
type Props = {
  amount: number | null;
  onChange: (amount: Props["amount"]) => void;
} & InputProps;

const BalanceInput = React.forwardRef<HTMLInputElement, Props>(({ amount, onChange, ...props }, ref) => {
  const { symbol } = useCurrencyFormatter();
  const handleChange = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) =>
    onChange(valueAsNumber || null);

  return (
    <InputContainer>
      <Currency>{symbol}</Currency>
      <Input
        aria-label="amount"
        type="number"
        min={0}
        value={amount ?? ""}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
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

export default BalanceInput;