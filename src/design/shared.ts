import { css } from "styled-components";

export const row = css`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;