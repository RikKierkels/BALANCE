import React from "react";
import styled from "styled-components";

type InputProps = React.ComponentPropsWithoutRef<"input">;
type Props = React.PropsWithChildren<{ error?: string } & InputProps>;

const Input = React.forwardRef<HTMLInputElement, Props>(({ children, className, error, ...props }, ref) => (
  <StyledLabel className={className}>
    <span>{children}</span>
    <StyledInput ref={ref} aria-invalid={!!error ? "true" : "false"} {...props} />
    {!!error && <Error role="alert">{error}</Error>}
  </StyledLabel>
));

const StyledLabel = styled.label`
  display: block;

  > * {
    width: 100%;
  }

  > * + * {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.input.border};
`;

const Error = styled.span`
  color: ${({ theme }) => theme.colors.input.error};
  font-size: ${({ theme }) => theme.font.xs};
`;

export default Input;