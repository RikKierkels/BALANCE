import React, { PropsWithChildren } from "react";
import Row from "./Row";
import styled from "styled-components";

type Props = PropsWithChildren<{}>;

const StaticRow = ({ children, ...props }: Props) => (
  <Row {...props}>
    <Children>{children}</Children>
  </Row>
);

const Children = styled.div`
  grid-column: 2;
`;

export default StaticRow;