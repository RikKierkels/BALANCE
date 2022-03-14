import React, { PropsWithChildren } from "react";
import Row from "./Row";
import styled from "styled-components";

const NonSelectableRow = ({ children, ...props }: PropsWithChildren<{}>) => (
  <Row {...props}>
    <Children>{children}</Children>
  </Row>
);

const Children = styled.div`
  grid-column: 2;
`;

export default NonSelectableRow;