import React from "react";
import styled from "styled-components";
import { ReactComponent as WarningIcon } from "../../assets/warning.svg";

type InputProps = React.ComponentPropsWithoutRef<"input">;
type Props = React.PropsWithChildren<{ error?: string } & InputProps>;

const Input = React.forwardRef<HTMLInputElement, Props>(({ children, className, error, ...props }, ref) => (
  <StyledLabel className={className}>
    <span>{children}</span>
    <StyledInput ref={ref} aria-invalid={!!error ? "true" : "false"} {...props} />
    {!!error && (
      <Error>
        <ErrorIcon />
        <ErrorMessage role="alert">{error}</ErrorMessage>
      </Error>
    )}
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

const Error = styled.div`
  display: inline-flex;
  align-items: center;

  > *:first-child {
    margin-inline-end: 0.5em;
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.input.error};
  font-size: ${({ theme }) => theme.font.sm};
`;

const ErrorIcon = styled(WarningIcon)`
  height: 0.75em;
  width: 0.75em;
  fill: ${({ theme }) => theme.colors.input.error};
`;

export default Input;