import styled from "styled-components";

const Button = styled.button`
  border: 0;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
`;

export const PrimaryButton = styled(Button)`
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.colors.actions.primary};
  color: white;
  font-size: ${({ theme }) => theme.font.sizes.lg};
  transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:focus,
  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors.actions.primary};
    border: 2px solid ${({ theme }) => theme.colors.actions.primary};
  }
`;