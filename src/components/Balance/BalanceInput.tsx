import { ChangeEvent } from "react";
import styled from "styled-components";
import { useCurrencyFormatter } from "../../shared/use-formatter";

type Props = {
  amount: number | null;
  onChange: (amount: Props["amount"]) => void;
};

const BalanceInput = ({ amount, onChange }: Props) => {
  const { symbol } = useCurrencyFormatter();
  const handleChange = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) =>
    onChange(valueAsNumber || null);

  return (
    <InputContainer>
      <Currency>{symbol}</Currency>
      <Input type="number" min={0} required={true} value={amount ?? ""} onChange={handleChange} />
    </InputContainer>
  );
};

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