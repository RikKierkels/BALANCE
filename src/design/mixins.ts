import { css } from "styled-components";

export const row = (columns: string) => css`
  display: grid;
  grid-template-columns: ${columns};
  align-items: center;
  min-height: 5rem;
  padding: ${({ theme }) => theme.spacing.xlg};
`;