import { css } from "styled-components";

export const row = css`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 0.25fr;
  align-items: center;
  min-height: 5rem;
  padding: ${({ theme }) => theme.spacing.lg};
`;