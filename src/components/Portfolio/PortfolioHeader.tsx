import styled from "styled-components";
import { row } from "../../design/mixins";

const PortfolioHeader = styled.div`
  ${row("0.25fr 3.5fr 2fr")};
  background-color: ${({ theme }) => theme.colors.header.background};

  > *:nth-child(2) {
    text-align: end;
  }
`;

export default PortfolioHeader;