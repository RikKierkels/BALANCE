import styled from "styled-components";

const PortfolioHeader = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 3.75fr 2fr;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.header.background};
  padding-right: ${({ theme }) => theme.spacing.xlg};

  > *:first-child {
    padding: ${({ theme }) => theme.spacing.xlg};
  }

  > *:nth-child(2) {
    text-align: end;
  }
`;

export default PortfolioHeader;