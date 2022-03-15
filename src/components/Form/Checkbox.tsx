import React from "react";
import styled from "styled-components";

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type">;
type Props = React.PropsWithChildren<InputProps>;

const Checkbox = React.forwardRef<HTMLInputElement, Props>(({ children, className, ...props }, ref) => (
  <Label className={className}>
    <Input type="checkbox" ref={ref} {...props} />
    {children && <span>{children}</span>}
  </Label>
));

export default Checkbox;

const Label = styled.label`
  display: flex;

  * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }

  &:hover,
  > *:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1em;
  height: 1em;
  margin: 0;
  border: 0.15em solid ${({ theme }) => theme.colors.input.border};
  font: inherit;
  background-color: #fff;
  appearance: none;

  &:before {
    content: "";
    width: 0.5em;
    height: 0.5em;
    transform: scale(0);
    transition: 100ms ${({ theme }) => theme.animations.easeOutCubic};
    box-shadow: inset 1em 1em ${({ theme }) => theme.colors.button.primary};
  }

  &:checked::before {
    transform: scale(1);
  }
`;