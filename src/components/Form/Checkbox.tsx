import React from "react";
import styled from "styled-components";

type Props = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & { label?: string };

const Checkbox = React.forwardRef<HTMLInputElement, Props>(({ label, className, ...props }, ref) => (
  <Label className={className}>
    <Input type="checkbox" ref={ref} {...props} />
    {label && <span>{label}</span>}
  </Label>
));

export default Checkbox;

const Label = styled.label`
  display: flex;

  * + * {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  margin: 0;
  border: 0.15em solid ${({ theme }) => theme.colors.input.border};
  font: inherit;
  background-color: #fff;
  appearance: none;

  &:before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    transform: scale(0);
    transition: 100ms ${({ theme }) => theme.animations.easeOutCubic};
    box-shadow: inset 1rem 1rem ${({ theme }) => theme.colors.button.primary};
  }

  &:checked::before {
    transform: scale(1);
  }
`;