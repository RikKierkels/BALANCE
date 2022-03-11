import styled from "styled-components";

const FundList = styled.ul`
  > * + * {
    border-top: 2px solid ${({ theme }) => theme.colors.fund.border};
  }
`;

export default FundList;