import styled from "styled-components";
import { row } from "../../design/mixins";

const PortfolioHeader = styled.div`
  ${row("2.5fr 2fr")};
  background-color: ${({ theme }) => theme.colors.header.background};
`;

export default PortfolioHeader;