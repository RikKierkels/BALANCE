import styled from "styled-components";

const FundList = styled.ul`
  width: 1020px;

  > *:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.background};
  }
`;

export default FundList;