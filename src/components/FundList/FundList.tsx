import styled from "styled-components";

const FundList = styled.ul`
  > *:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.background};
  }
`;

export default FundList;