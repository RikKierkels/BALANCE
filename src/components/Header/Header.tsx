import styled from "styled-components";
import { row } from "../../design/shared";

const Header = styled.div`
  background-color: ${({ theme }) => theme.colors.header.background};
  ${row}
`;

export default Header;