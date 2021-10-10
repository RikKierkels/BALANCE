import { FC } from "react";
import styled from "styled-components";

const List = styled.ul`
  width: 1020px;

  > *:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.background};
  }
`;

const FundList: FC = ({ children }) => <List>{children}</List>;

export default FundList;