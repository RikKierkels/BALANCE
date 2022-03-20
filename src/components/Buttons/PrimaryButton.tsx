import styled from "styled-components";
import BaseButton from "./BaseButton";
import { outlineWithElevation } from "../../design/mixin";

const PrimaryButton = styled(BaseButton)`
  border-color: ${({ theme }) => theme.colors.button.primary.border};
  background-color: ${({ theme }) => theme.colors.button.primary.background};
  color: ${({ theme }) => theme.colors.button.primary.text};
  ${({ theme }) => outlineWithElevation(theme.colors.button.primary.outline)}
`;

export default PrimaryButton;