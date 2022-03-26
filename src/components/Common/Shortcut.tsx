import styled from "styled-components";

const Shortcut = styled.div<{ isLight?: boolean }>`
  background-color: ${({ isLight, theme }) =>
    isLight ? theme.colors.shortcut.secondary : theme.colors.shortcut.primary};
  padding-left: ${({ theme }) => theme.spacing.xs};
  padding-right: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.shortcut};
`;

export default Shortcut;