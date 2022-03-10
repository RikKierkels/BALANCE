import styled from "styled-components";
import { button } from "../../design/shared";

const SecondaryButton = styled.button`
  ${({ theme }) => button(theme.colors.button.secondary, theme.colors.button.secondaryOffset)};
`;

export default SecondaryButton;