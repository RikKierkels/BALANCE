import styled from "styled-components";
import Form from "../Form/Form";

export type BalanceAmount = { amount: number };

const PortfolioBalanceForm = styled(Form)`
  display: flex;

  > * {
    width: 10rem;
  }

  > * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
` as typeof Form;

export default PortfolioBalanceForm;