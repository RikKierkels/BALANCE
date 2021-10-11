import styled from "styled-components";

const BalanceForm = styled.form`
  display: flex;

  > * {
    width: 10rem;
  }

  > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

export default BalanceForm;