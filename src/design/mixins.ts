import { css } from "styled-components";

export const button = (color: string, colorOffset: string) => css`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid transparent;
  background-color: ${color};
  color: ${colorOffset};
  font-size: ${({ theme }) => theme.font.lg};
  transition: 0.3s ${({ theme }) => theme.animations.easeOutCubic};

  &:focus,
  &:hover {
    border: 2px solid ${color};
    background-color: ${colorOffset};
    color: ${color};
  }
`;

export const row = (columns: string) => css`
  display: grid;
  grid-template-columns: ${columns};
  align-items: center;
  min-height: 5rem;
  padding: ${({ theme }) => theme.spacing.lg};
`;