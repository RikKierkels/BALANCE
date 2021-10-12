import styled from "styled-components";

const Button = styled.button`
  border: 0;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

export const PrimaryButton = styled(Button)`
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.colors.actions.primary};
  color: ${({ theme }) => theme.colors.actions.primaryOffset};
  font-size: ${({ theme }) => theme.font.lg};
  transition: 0.3s ${({ theme }) => theme.animations.easeOutCubic};

  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.actions.primary};
    background-color: ${({ theme }) => theme.colors.actions.primaryOffset};
    color: ${({ theme }) => theme.colors.actions.primary};
  }
`;

export const IconButton = styled(Button)`
  display: flex;
  width: fit-content;
  padding: 0;
  background-color: transparent;
`;