import styled from "styled-components";
import Form from "../Form/Form";

export type BalanceAmount = { amount: number };

const BalanceForm = styled(Form)`
  display: flex;

  > * {
    width: 10rem;
  }

  > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
` as typeof Form;

export default BalanceForm;