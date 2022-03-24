import React from "react";
import styled from "styled-components";
import { outlineWithElevation } from "../../design/mixin";

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
  border-radius: ${({ theme }) => theme.radius.checkbox};
  font: inherit;
  background-color: ${({ theme }) => theme.colors.checkbox.background};
  appearance: none;
  ${({ theme }) => outlineWithElevation(theme.colors.checkbox.outline)}

  &:before {
    content: "";
    width: 0.625em;
    height: 0.625em;
    transform: scale(0);
    transition: 100ms ${({ theme }) => theme.animations.easeOutCubic};
    box-shadow: inset 1em 1em ${({ theme }) => theme.colors.checkbox.checked};
    border-radius: calc(${({ theme }) => theme.radius.checkbox} - 1px);
  }

  &:checked::before {
    transform: scale(1);
  }
`;