import styled from "styled-components";

const FundList = styled.ul`
  > *:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.fund.border};
  }
`;

export default FundList;