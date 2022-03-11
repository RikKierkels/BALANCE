import styled from "styled-components";
import BaseButton from "./BaseButton";

const SecondaryButton = styled(BaseButton)`
  border-color: ${({ theme }) => theme.colors.button.secondary};
  background-color: ${({ theme }) => theme.colors.button.secondary};
  color: ${({ theme }) => theme.colors.button.secondaryOffset};
`;

export default SecondaryButton;