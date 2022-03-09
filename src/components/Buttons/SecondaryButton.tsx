import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";

const SecondaryButton = styled(PrimaryButton)`
  background-color: ${({ theme }) => theme.colors.button.secondary};
  color: ${({ theme }) => theme.colors.button.secondaryOffset};

  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.button.secondary};
    background-color: ${({ theme }) => theme.colors.button.secondaryOffset};
    color: ${({ theme }) => theme.colors.button.secondary};
  }
`;

export default SecondaryButton;