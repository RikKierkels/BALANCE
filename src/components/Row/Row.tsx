import styled from "styled-components";

const Row = styled.div`
  display: grid;
  grid-template-columns: 5rem auto;
  min-height: 5rem;

  > * {
    align-self: stretch;
    background-color: inherit;
  }

  > *:last-child {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    grid-column-gap: ${({ theme }) => theme.spacing.xlg};
    align-items: center;
    width: 100%;
    padding-right: ${({ theme }) => theme.spacing.xlg};
    text-align: start;
    font-size: ${({ theme }) => theme.font.sm};
  }
`;

export default Row;