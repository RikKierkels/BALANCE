import styled from "styled-components";
import { row } from "../../design/shared";

const PortfolioHeader = styled.div`
  ${row};
  background-color: ${({ theme }) => theme.colors.header.background};
  grid-template-columns: 2.5fr 2fr;
`;

export default PortfolioHeader;