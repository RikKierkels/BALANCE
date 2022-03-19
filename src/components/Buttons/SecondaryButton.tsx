import styled from "styled-components";
import BaseButton from "./BaseButton";

const SecondaryButton = styled(BaseButton)`
  border-color: ${({ theme }) => theme.colors.button.secondary.border};
  background-color: ${({ theme }) => theme.colors.button.secondary.background};
  color: ${({ theme }) => theme.colors.button.secondary.text};

  svg {
    fill: ${({ theme }) => theme.colors.button.secondary.text};
  }
`;

export default SecondaryButton;