import styled from "styled-components";
import BaseButton from "./BaseButton";

const PrimaryButton = styled(BaseButton)`
  border-color: ${({ theme }) => theme.colors.button.primary};
  background-color: ${({ theme }) => theme.colors.button.primary};
  color: ${({ theme }) => theme.colors.button.primaryOffset};
`;

export default PrimaryButton;