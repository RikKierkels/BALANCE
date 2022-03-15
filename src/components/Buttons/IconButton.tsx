import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;
type Props = PropsWithChildren<{ isLight?: boolean } & ButtonProps>;

const IconButton = React.forwardRef<HTMLButtonElement, Props>(({ children, isLight = false, ...props }, ref) => (
  <Button isLight={isLight} ref={ref} {...props}>
    <IconWrapper>{children}</IconWrapper>
  </Button>
));

const Button = styled.button<Pick<Props, "isLight">>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  transition: 0.3s ${({ theme }) => theme.animations.easeOutCubic};

  &:focus,
  &:hover {
    background-color: ${({ isLight, theme }) =>
      isLight ? theme.colors.button.iconLightHover : theme.colors.button.iconDarkHover};
  }
`;

const IconWrapper = styled.div`
  width: 1.25rem;
  height: 1.25rem;
`;

export default IconButton;