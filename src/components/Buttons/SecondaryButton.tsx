import styled from "styled-components";
import BaseButton from "./BaseButton";
import { outlineWithElevation } from "../../design/mixin";

const SecondaryButton = styled(BaseButton)`
  border-color: ${({ theme }) => theme.colors.button.secondary.border};
  background-color: ${({ theme }) => theme.colors.button.secondary.background};
  color: ${({ theme }) => theme.colors.button.secondary.text};
  ${({ theme }) => outlineWithElevation(theme.colors.button.secondary.outline)}

  svg {
    fill: ${({ theme }) => theme.colors.button.secondary.text};
  }
`;

export default SecondaryButton;