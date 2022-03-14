import styled from "styled-components";

const FundRows = styled.ul`
  > * + * {
    border-top: 2px solid ${({ theme }) => theme.colors.fund.border};
  }
`;

export default FundRows;