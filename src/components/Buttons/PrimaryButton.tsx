import styled from "styled-components";
import { button } from "../../design/shared";

const PrimaryButton = styled.button`
  ${({ theme }) => button(theme.colors.button.primary, theme.colors.button.primaryOffset)};
`;

export default PrimaryButton;