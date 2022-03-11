import React, { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

type BaseButtonProps = PropsWithChildren<
  React.ComponentPropsWithoutRef<"button"> & { left?: ReactNode; right?: ReactNode }
>;

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(({ children, left, right, ...props }, ref) => (
  <Button ref={ref} {...props}>
    {left && <Left>{left}</Left>}
    {children}
    {right && <Right>{right}</Right>}
  </Button>
));

export default BaseButton;

const Button = styled.button`
  display: inline-flex;
  align-items: baseline;
  border-width: 2px;
  border-style: solid;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.font.md};
  transition: 0.3s ${({ theme }) => theme.animations.easeOutCubic};

  svg {
    width: 0.65em;
    height: 0.65em;

    // TODO: Change SVG's so this is not needed
    path:last-child {
      fill: white;
    }
  }
`;

const Left = styled.div`
  margin-inline-end: 0.5em;
`;

const Right = styled.div`
  margin-inline-start: 0.5em;
`;