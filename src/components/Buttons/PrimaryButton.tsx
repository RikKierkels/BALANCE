import styled from "styled-components";

const PrimaryButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.colors.button.primary};
  color: ${({ theme }) => theme.colors.button.primaryOffset};
  font-size: ${({ theme }) => theme.font.lg};
  transition: 0.3s ${({ theme }) => theme.animations.easeOutCubic};

  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.button.primary};
    background-color: ${({ theme }) => theme.colors.button.primaryOffset};
    color: ${({ theme }) => theme.colors.button.primary};
  }
`;

export default PrimaryButton;