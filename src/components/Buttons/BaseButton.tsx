import React, { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;
type Props = PropsWithChildren<{ left?: ReactNode; right?: ReactNode } & ButtonProps>;

const BaseButton = React.forwardRef<HTMLButtonElement, Props>(({ children, left, right, ...props }, ref) => (
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
  border: 2px solid transparent;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.font.md};
  transition: 0.3s ${({ theme }) => theme.animations.easeOutCubic};
  border-radius: ${({ theme }) => theme.radius.button};

  svg {
    width: 0.75em;
    height: 0.75em;
    fill: white;
  }
`;

const Left = styled.div`
  margin-inline-end: 0.5em;
`;

const Right = styled.div`
  margin-inline-start: 0.5em;
`;